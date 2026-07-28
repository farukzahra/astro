package dev.faruk.blog.mcpserver;

import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;

@Component
public class OrderApiClient {

    private final RestClient restClient;

    public OrderApiClient(OrderApiProperties properties) {
        this.restClient = RestClient.builder()
                .baseUrl(properties.baseUrl())
                .build();
    }

    public Order createOrder(long customerId, long productId, int quantity) {
        return restClient.post()
                .uri("/orders")
                .body(new CreateOrderRequest(customerId, productId, quantity))
                .retrieve()
                .body(Order.class);
    }

    public Order findOrder(long id) {
        return restClient.get()
                .uri("/orders/{id}", id)
                .retrieve()
                .body(Order.class);
    }
}
