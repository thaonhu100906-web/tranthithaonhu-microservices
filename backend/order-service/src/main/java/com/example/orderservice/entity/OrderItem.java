package com.example.orderservice.entity;

import java.math.BigDecimal;

public class OrderItem {

    private Long productId;
    private String productName;
    private String size;
    private Integer quantity;
    private BigDecimal price;
    private BigDecimal subtotal;
    private String note;

    public OrderItem() {}

    public OrderItem(Long productId, String productName, String size, Integer quantity, BigDecimal price, String note) {
        this.productId = productId;
        this.productName = productName;
        this.size = size;
        this.quantity = quantity;
        this.price = price;
        this.note = note;
        if (price != null && quantity != null) {
            this.subtotal = price.multiply(BigDecimal.valueOf(quantity));
        }
    }

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public String getSize() {
        return size;
    }

    public void setSize(String size) {
        this.size = size;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public BigDecimal getSubtotal() {
        return subtotal;
    }

    public void setSubtotal(BigDecimal subtotal) {
        this.subtotal = subtotal;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }
}
