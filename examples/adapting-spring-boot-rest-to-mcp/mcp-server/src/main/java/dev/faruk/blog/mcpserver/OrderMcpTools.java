package dev.faruk.blog.mcpserver;

import org.springframework.ai.tool.annotation.Tool;
import org.springframework.ai.tool.annotation.ToolParam;
import org.springframework.stereotype.Component;

@Component
public class OrderMcpTools {

    private final OrderApiClient orderApiClient;

    public OrderMcpTools(OrderApiClient orderApiClient) {
        this.orderApiClient = orderApiClient;
    }

    @Tool(name = "create_order", description = "Create a new customer order")
    public String createOrder(
            @ToolParam(description = "Customer identifier") long customerId,
            @ToolParam(description = "Product identifier") long productId,
            @ToolParam(description = "Quantity to order") int quantity
    ) {
        Order order = orderApiClient.createOrder(customerId, productId, quantity);
        return "Created order %d with status %s for customer %d".formatted(
                order.id(), order.status(), order.customerId());
    }

    @Tool(name = "find_order", description = "Find an order by its identifier")
    public String findOrder(@ToolParam(description = "Order identifier") long orderId) {
        Order order = orderApiClient.findOrder(orderId);
        return "Order %d: customer=%d product=%d quantity=%d status=%s".formatted(
                order.id(), order.customerId(), order.productId(), order.quantity(), order.status());
    }
}
