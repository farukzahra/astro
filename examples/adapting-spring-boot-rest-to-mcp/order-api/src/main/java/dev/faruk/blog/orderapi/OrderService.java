package dev.faruk.blog.orderapi;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.Instant;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;

@Service
public class OrderService {

    private final AtomicLong idSequence = new AtomicLong(1000);
    private final Map<Long, Order> orders = new ConcurrentHashMap<>();

    public Order create(CreateOrderRequest request) {
        long id = idSequence.incrementAndGet();
        Order order = new Order(
                id,
                request.customerId(),
                request.productId(),
                request.quantity(),
                "CREATED",
                Instant.now()
        );
        orders.put(id, order);
        return order;
    }

    public Order findById(Long id) {
        Order order = orders.get(id);
        if (order == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Order not found: " + id);
        }
        return order;
    }
}
