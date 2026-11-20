package com.example.productservice;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/products")
public class ProductController {

    private final List<Map<String, Object>> products = new ArrayList<>(List.of(
        Map.of("id", 1, "name", "Mouse", "price", 150000),
        Map.of("id", 2, "name", "Keyboard", "price", 250000),
        Map.of("id", 3, "name", "Monitor", "price", 2500000)
    ));

    @GetMapping
    public List<Map<String, Object>> getProducts() {
        return products;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Map<String, Object>> getProduct(@PathVariable int id) {
        return products.stream()
                .filter(p -> p.get("id").equals(id))
                .findFirst()
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Map<String, Object>> addProduct(@RequestBody Map<String, Object> newProduct) {
        int nextId = products.size() + 1;
        Map<String, Object> product = new LinkedHashMap<>();
        product.put("id", nextId);
        product.put("name", newProduct.get("name"));
        product.put("price", newProduct.get("price"));
        products.add(product);
        return ResponseEntity.status(HttpStatus.CREATED).body(product);
    }
}