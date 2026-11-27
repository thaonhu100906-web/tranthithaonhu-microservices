package com.example.orderservice.dto;

import java.math.BigDecimal;

public record OrderResponse(
    String id,
    BigDecimal totalAmount
) {}
