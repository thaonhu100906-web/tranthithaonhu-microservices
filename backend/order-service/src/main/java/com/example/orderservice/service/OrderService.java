package com.example.orderservice.service;

import com.example.orderservice.client.ProductClient;
import com.example.orderservice.dto.OrderItemRequest;
import com.example.orderservice.dto.OrderRequest;
import com.example.orderservice.dto.OrderResponse;
import com.example.orderservice.dto.ProductResponse;
import com.example.orderservice.entity.Order;
import com.example.orderservice.entity.OrderItem;
import com.example.orderservice.repository.OrderRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final ProductClient productClient;

    public OrderService(OrderRepository orderRepository, ProductClient productClient) {
        this.orderRepository = orderRepository;
        this.productClient = productClient;
    }

    public ProductResponse getProduct(Long productId) {
        return productClient.getById(productId);
    }

    public OrderResponse createOrder(OrderRequest request) {
        BigDecimal totalAmount = BigDecimal.ZERO;
        Order order = new Order();
        order.setOrderCode("ORD-" + System.currentTimeMillis());
        order.setStatus("PENDING");
        order.setCreatedAt(LocalDateTime.now());
        List<OrderItem> orderItems = new ArrayList<>();

        for (OrderItemRequest item : request.items()) {
            // Gọi Product Service để lấy thông tin và giá sản phẩm
            ProductResponse product = productClient.getById(item.productId());

            // Tính thành tiền của từng sản phẩm
            BigDecimal amount = product.price().multiply(BigDecimal.valueOf(item.quantity()));

            // Tính tổng tiền đơn hàng
            totalAmount = totalAmount.add(amount);

            // Tạo OrderItem tương ứng
            OrderItem orderItem = new OrderItem();
            orderItem.setProductId(product.id());
            orderItem.setProductName(product.name());
            orderItem.setQuantity(item.quantity());
            orderItem.setPrice(product.price());
            orderItem.setSubtotal(amount);
            orderItems.add(orderItem);
        }

        order.setItems(orderItems);
        order.setTotalAmount(totalAmount);

        Order saved = orderRepository.save(order);
        return new OrderResponse(saved.getId(), saved.getTotalAmount());
    }

    public List<Order> getAll(String status) {
        if (status != null && !status.isBlank()) {
            return orderRepository.findByStatus(status);
        }
        return orderRepository.findAll();
    }

    public Optional<Order> getById(String id) {
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

    public Optional<Order> updateStatus(String id, String newStatus) {
        return orderRepository.findById(id).map(order -> {
            order.setStatus(newStatus);
            return orderRepository.save(order);
        });
    }

    public Optional<Order> update(String id, Order details) {
        return orderRepository.findById(id).map(order -> {
            if (details.getTableNumber() != null) order.setTableNumber(details.getTableNumber());
            if (details.getOrderType() != null) order.setOrderType(details.getOrderType());
            if (details.getStatus() != null) order.setStatus(details.getStatus());
            if (details.getNote() != null) order.setNote(details.getNote());
            if (details.getItems() != null) order.setItems(details.getItems());
            return orderRepository.save(order);
        });
    }

    public boolean delete(String id) {
        if (orderRepository.existsById(id)) {
            orderRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
