package dev.faruk.blog.mcpserver;

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
