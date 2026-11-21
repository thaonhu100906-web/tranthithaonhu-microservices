package com.example.orderservice.service;

import com.example.orderservice.entity.Order;
import com.example.orderservice.entity.OrderItem;
import com.example.orderservice.repository.OrderRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class OrderService {

    private final OrderRepository orderRepository;

    public OrderService(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    public List<Order> getAll(String status) {
        if (status != null && !status.isBlank()) {
            return orderRepository.findByStatus(status);
        }
        return orderRepository.findAll();
    }

    public Optional<Order> getById(Long id) {
        return orderRepository.findById(id);
    }

    public Order create(Order order) {
        if (order.getOrderCode() == null || order.getOrderCode().isBlank()) {
            order.setOrderCode("ORD-" + System.currentTimeMillis());
        }
        if (order.getStatus() == null || order.getStatus().isBlank()) {
            order.setStatus("PENDING");
        }
        if (order.getCreatedAt() == null) {
            order.setCreatedAt(LocalDateTime.now());
        }

        BigDecimal total = BigDecimal.ZERO;
        if (order.getItems() != null) {
            for (OrderItem item : order.getItems()) {
                item.setOrder(order);
                if (item.getPrice() != null && item.getQuantity() != null) {
                    BigDecimal sub = item.getPrice().multiply(BigDecimal.valueOf(item.getQuantity()));
                    item.setSubtotal(sub);
                    total = total.add(sub);
                }
            }
        }
        if (order.getTotalAmount() == null) {
            order.setTotalAmount(total);
        }

        return orderRepository.save(order);
    }

    public Optional<Order> updateStatus(Long id, String newStatus) {
        return orderRepository.findById(id).map(order -> {
            order.setStatus(newStatus);
            return orderRepository.save(order);
        });
    }

    public Optional<Order> update(Long id, Order details) {
        return orderRepository.findById(id).map(order -> {
            if (details.getTableNumber() != null) order.setTableNumber(details.getTableNumber());
            if (details.getOrderType() != null) order.setOrderType(details.getOrderType());
            if (details.getStatus() != null) order.setStatus(details.getStatus());
            if (details.getNote() != null) order.setNote(details.getNote());
            return orderRepository.save(order);
        });
    }

    public boolean delete(Long id) {
        if (orderRepository.existsById(id)) {
            orderRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
