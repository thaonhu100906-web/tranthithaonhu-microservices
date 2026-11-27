package com.example.orderservice.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public record OrderItemRequest(
    @NotNull(message = "Mã sản phẩm không được để trống")
    @Positive(message = "Mã sản phẩm phải lớn hơn 0")
    Long productId,

    @NotNull(message = "Số lượng không được để trống")
    @Min(value = 1, message = "Số lượng phải lớn hơn 0")
    Integer quantity
) {}
