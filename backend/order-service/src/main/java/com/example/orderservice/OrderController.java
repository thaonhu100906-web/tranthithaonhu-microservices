package com.example.orderservice;

import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestClient;
import org.springframework.web.client.RestClientResponseException;
import java.util.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/orders")
public class OrderController {

    private final RestClient restClient = RestClient.builder()
            .baseUrl("http://localhost:8081")
            .build();

    private final List<Map<String, Object>> orders = List.of(
        Map.of("id", 101, "productId", 1, "quantity", 2),
        Map.of("id", 102, "productId", 2, "quantity", 1)
    );

    @GetMapping
    public List<Map<String, Object>> getOrders() {
        return orders;
    }

    @GetMapping("/product/{id}")
    public ResponseEntity<String> getProduct(@PathVariable int id) {
        try {
            String product = restClient.get()
                    .uri("/api/products/{id}", id)
                    .retrieve()
                    .body(String.class);
            return ResponseEntity.ok(product);
        } catch (RestClientResponseException e) {
            return ResponseEntity.status(e.getStatusCode()).build();
        }
    }

    @GetMapping("/{id}/detail")
    public ResponseEntity<Map<String, Object>> getOrderDetail(@PathVariable int id) {
        Optional<Map<String, Object>> orderOpt = orders.stream()
                .filter(o -> o.get("id").equals(id))
                .findFirst();

        if (orderOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Map<String, Object> order = orderOpt.get();
        int productId = (int) order.get("productId");
        int quantity = (int) order.get("quantity");

        try {
            Map<String, Object> product = restClient.get()
                    .uri("/api/products/{id}", productId)
                    .retrieve()
                    .body(new ParameterizedTypeReference<>() {});

            int price = ((Number) product.get("price")).intValue();

            Map<String, Object> result = new LinkedHashMap<>();
            result.put("orderId", order.get("id"));
            result.put("quantity", quantity);
            result.put("product", product);
            result.put("totalPrice", price * quantity);

            return ResponseEntity.ok(result);
        } catch (RestClientResponseException e) {
            return ResponseEntity.status(e.getStatusCode()).build();
        }
    }
}