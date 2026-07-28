package dev.faruk.blog.orderapi;

import java.time.Instant;

public record Order(
        Long id,
        Long customerId,
        Long productId,
        int quantity,
        String status,
        Instant createdAt
) {
}
