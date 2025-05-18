package com.skillsynclab.backend.controller;

import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skillsynclab.backend.model.Recipe;
import com.skillsynclab.backend.service.RecipeService;

// This class is a Spring Boot REST controller for managing recipes.
// It provides endpoints to create, read, update, and delete recipes.
@RestController
@RequestMapping("/api/recipes") // Base URL for all endpoints in this controller
public class RecipeController {

    // Logger for logging messages
    // It uses SLF4J for logging, which is a simple facade for various logging frameworks.
    private static final Logger logger = LoggerFactory.getLogger(RecipeController.class);

    @Autowired
    private RecipeService recipeService;

    // Create a new recipe
    // Endpoint: POST /api/recipes
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

    // Fetch all recipes
    // Endpoint: GET /api/recipes
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

    // Fetch a recipe by ID 
    // Endpoint: GET /api/recipes/{id}
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

    // Update a recipe by ID
    // Endpoint: PUT /api/recipes/{id}
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

    // Delete a recipe by ID 
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