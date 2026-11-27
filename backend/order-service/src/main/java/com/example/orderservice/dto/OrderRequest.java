package com.example.orderservice.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import java.util.List;

public record OrderRequest(
    @NotEmpty(message = "Đơn hàng phải có sản phẩm")
    List<@NotNull(message = "Mục đặt hàng không được để trống") @Valid OrderItemRequest> items
) {}
