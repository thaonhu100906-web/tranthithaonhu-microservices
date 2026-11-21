package com.example.inventoryservice.service;

import com.example.inventoryservice.entity.Ingredient;
import com.example.inventoryservice.repository.IngredientRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class IngredientService {

    private final IngredientRepository ingredientRepository;

    public IngredientService(IngredientRepository ingredientRepository) {
        this.ingredientRepository = ingredientRepository;
    }

    public List<Ingredient> getAll(String search) {
        if (search != null && !search.isBlank()) {
            return ingredientRepository.findByNameContainingIgnoreCase(search);
        }
        return ingredientRepository.findAll();
    }

    public Optional<Ingredient> getById(Long id) {
        return ingredientRepository.findById(id);
    }

    public Ingredient create(Ingredient ingredient) {
        ingredient.setLastUpdated(LocalDateTime.now());
        return ingredientRepository.save(ingredient);
    }

    public Optional<Ingredient> update(Long id, Ingredient details) {
        return ingredientRepository.findById(id).map(ingredient -> {
            ingredient.setName(details.getName());
            ingredient.setUnit(details.getUnit());
            ingredient.setQuantity(details.getQuantity());
            ingredient.setMinThreshold(details.getMinThreshold());
            ingredient.setPricePerUnit(details.getPricePerUnit());
            ingredient.setSupplier(details.getSupplier());
            ingredient.setLastUpdated(LocalDateTime.now());
            return ingredientRepository.save(ingredient);
        });
    }

    public Optional<Ingredient> updateStock(Long id, Double deltaQuantity) {
        return ingredientRepository.findById(id).map(ingredient -> {
            double newQty = ingredient.getQuantity() + deltaQuantity;
            ingredient.setQuantity(Math.max(0, newQty));
            ingredient.setLastUpdated(LocalDateTime.now());
            return ingredientRepository.save(ingredient);
        });
    }

    public boolean delete(Long id) {
        if (ingredientRepository.existsById(id)) {
            ingredientRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
