package com.example.orderservice.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.ResourceAccessException;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ResourceAccessException.class)
    public ResponseEntity<?> handleServiceUnavailable(ResourceAccessException ex) {
        return ResponseEntity
            .status(HttpStatus.SERVICE_UNAVAILABLE)
            .body(Map.of(
                "message", "Không thể kết nối đến Service phụ thuộc"
            ));
    }

    @ExceptionHandler(HttpClientErrorException.NotFound.class)
    public ResponseEntity<?> handleRemoteNotFound(HttpClientErrorException.NotFound ex) {
        return ResponseEntity
            .status(HttpStatus.NOT_FOUND)
            .body(Map.of(
                "message", "Không tìm thấy dữ liệu tại Service phụ thuộc"
            ));
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<?> handleValidation(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getFieldErrors().forEach(error ->
            errors.put(error.getField(), error.getDefaultMessage())
        );
        return ResponseEntity
            .badRequest()
            .body(Map.of(
                "message", "Dữ liệu không hợp lệ",
                "errors", errors
            ));
    }
}
