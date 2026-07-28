package dev.faruk.blog.orderapi;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public record CreateOrderRequest(
        @NotNull Long customerId,
        @NotNull Long productId,
        @Min(1) int quantity
) {
}
