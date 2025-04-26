package com.skillsynclab.backend.controller;

import com.skillsynclab.backend.model.Recipe;
import com.skillsynclab.backend.service.RecipeService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/recipes")
public class RecipeController {

    private static final Logger logger = LoggerFactory.getLogger(RecipeController.class);

    @Autowired
    private RecipeService recipeService;

    @PostMapping
    public ResponseEntity<?> createRecipe(@RequestBody Recipe recipe) {
        try {
            logger.debug("Received request to create recipe: {}", recipe);
            Recipe savedRecipe = recipeService.createRecipe(recipe);
            logger.info("Created recipe with ID: {}", savedRecipe.getId());
            return ResponseEntity.ok(savedRecipe);
        } catch (IllegalArgumentException e) {
            logger.error("Validation error creating recipe: {}", e.getMessage(), e);
            return ResponseEntity.status(400).body("Validation error: " + e.getMessage());
        } catch (Exception e) {
            logger.error("Error creating recipe: {}", e.getMessage(), e);
            throw e; // Let GlobalExceptionHandler handle it
        }
    }

    @GetMapping
    public ResponseEntity<List<Recipe>> getAllRecipes() {
        try {
            logger.debug("Received request to fetch all recipes");
            List<Recipe> recipes = recipeService.getAllRecipes();
            logger.info("Fetched {} recipes", recipes.size());
            return ResponseEntity.ok(recipes);
        } catch (Exception e) {
            logger.error("Error fetching recipes: {}", e.getMessage(), e);
            throw e; // Let GlobalExceptionHandler handle it
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getRecipeById(@PathVariable String id) {
        try {
            logger.debug("Received request to fetch recipe with ID: {}", id);
            Optional<Recipe> recipe = recipeService.getRecipeById(id);
            if (recipe.isPresent()) {
                logger.info("Fetched recipe with ID: {}", id);
                return ResponseEntity.ok(recipe.get());
            } else {
                logger.warn("Recipe with ID {} not found", id);
                return ResponseEntity.status(404).body("Recipe not found");
            }
        } catch (IllegalArgumentException e) {
            logger.error("Invalid recipe ID {}: {}", id, e.getMessage(), e);
            return ResponseEntity.status(400).body("Invalid recipe ID: " + e.getMessage());
        } catch (Exception e) {
            logger.error("Error fetching recipe ID {}: {}", id, e.getMessage(), e);
            throw e; // Let GlobalExceptionHandler handle it
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateRecipe(@PathVariable String id, @RequestBody Recipe recipe) {
        try {
            logger.debug("Received request to update recipe with ID: {}", id);
            Recipe updatedRecipe = recipeService.updateRecipe(id, recipe);
            if (updatedRecipe != null) {
                logger.info("Updated recipe with ID: {}", id);
                return ResponseEntity.ok(updatedRecipe);
            } else {
                logger.warn("Recipe with ID {} not found for update", id);
                return ResponseEntity.status(404).body("Recipe not found");
            }
        } catch (IllegalArgumentException e) {
            logger.error("Validation error updating recipe ID {}: {}", id, e.getMessage(), e);
            return ResponseEntity.status(400).body("Validation error: " + e.getMessage());
        } catch (Exception e) {
            logger.error("Error updating recipe ID {}: {}", id, e.getMessage(), e);
            throw e; // Let GlobalExceptionHandler handle it
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteRecipe(@PathVariable String id) {
        try {
            logger.debug("Received request to delete recipe with ID: {}", id);
            recipeService.deleteRecipe(id);
            logger.info("Deleted recipe with ID: {}", id);
            return ResponseEntity.ok().build();
        } catch (IllegalArgumentException e) {
            logger.error("Invalid recipe ID {}: {}", id, e.getMessage(), e);
            return ResponseEntity.status(400).body("Invalid recipe ID: " + e.getMessage());
        } catch (Exception e) {
            logger.error("Error deleting recipe ID {}: {}", id, e.getMessage(), e);
            throw e; // Let GlobalExceptionHandler handle it
        }
    }
}