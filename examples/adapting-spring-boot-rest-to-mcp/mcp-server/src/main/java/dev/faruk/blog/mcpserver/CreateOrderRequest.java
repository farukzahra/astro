package dev.faruk.blog.mcpserver;

public record CreateOrderRequest(Long customerId, Long productId, int quantity) {
}
