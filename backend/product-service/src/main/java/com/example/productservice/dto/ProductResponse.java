package com.example.productservice.dto;

import java.math.BigDecimal;

public record ProductResponse(
    Long id,
    String name,
    BigDecimal price,
    String description,
    String imageUrl,
    String status,
    Long categoryId,
    String categoryName
) {}
