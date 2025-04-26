package com.skillsynclab.backend.service;

import com.skillsynclab.backend.model.Ingredient;
import com.skillsynclab.backend.model.Recipe;
import com.skillsynclab.backend.model.Step;
import com.skillsynclab.backend.model.Author;
import com.skillsynclab.backend.repository.RecipeRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.data.mongodb.core.MongoTemplate;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class RecipeService {

    private static final Logger logger = LoggerFactory.getLogger(RecipeService.class);

    @Autowired
    private RecipeRepository recipeRepository;

    @Autowired
    private MongoTemplate mongoTemplate;

    public Recipe createRecipe(Recipe recipe) {
        logger.debug("Attempting to create recipe: {}", recipe);
        try {
            // Validation
            if (recipe.getTitle() == null || recipe.getTitle().trim().isEmpty()) {
                logger.error("Recipe title is required");
                throw new IllegalArgumentException("Title is required");
            }
            if (recipe.getDescription() == null || recipe.getDescription().trim().isEmpty()) {
                logger.error("Recipe description is required");
                throw new IllegalArgumentException("Description is required");
            }
            if (recipe.getAuthor() == null || recipe.getAuthor().getId() == null) {
                logger.error("Recipe author with valid ID is required");
                throw new IllegalArgumentException("Author with valid ID is required");
            }

            // Initialize defaults
            recipe.setImageUrls(recipe.getImageUrls() != null ? recipe.getImageUrls() : new ArrayList<>());
            recipe.setIngredients(recipe.getIngredients() != null ? recipe.getIngredients() : new ArrayList<>());
            recipe.setSteps(recipe.getSteps() != null ? recipe.getSteps() : new ArrayList<>());
            recipe.setCategories(recipe.getCategories() != null ? recipe.getCategories() : new ArrayList<>());
            recipe.setTags(recipe.getTags() != null ? recipe.getTags() : new ArrayList<>());
            recipe.setLikes(recipe.getLikes() != null ? recipe.getLikes() : 0);
            recipe.setPreparationTime(recipe.getPreparationTime() != null ? recipe.getPreparationTime() : 0);
            recipe.setCookingTime(recipe.getCookingTime() != null ? recipe.getCookingTime() : 0);
            recipe.setServings(recipe.getServings() != null ? recipe.getServings() : 1);
            recipe.setDifficulty(recipe.getDifficulty() != null ? recipe.getDifficulty() : "Easy");

            // Assign IDs to ingredients and steps if not provided
            for (Ingredient ingredient : recipe.getIngredients()) {
                if (ingredient == null) {
                    logger.warn("Found null ingredient in recipe, skipping");
                    continue;
                }
                if (ingredient.getId() == null) {
                    ingredient.setId(UUID.randomUUID().toString());
                }
            }
            for (Step step : recipe.getSteps()) {
                if (step == null) {
                    logger.warn("Found null step in recipe, skipping");
                    continue;
                }
                if (step.getId() == null) {
                    step.setId(UUID.randomUUID().toString());
                }
            }

            recipe.setCreatedAt(LocalDateTime.now());
            recipe.setUpdatedAt(LocalDateTime.now());

            logger.debug("Saving recipe to MongoDB: {}", recipe);
            Recipe saved = recipeRepository.save(recipe);
            logger.info("Successfully saved recipe with ID: {}", saved.getId());
            return saved;
        } catch (Exception e) {
            logger.error("Failed to save recipe to MongoDB: {}", e.getMessage(), e);
            throw new RuntimeException("Failed to save recipe: " + e.getMessage(), e);
        }
    }

    public List<Recipe> getAllRecipes() {
        logger.debug("Fetching all recipes");
        try {
            List<Recipe> recipes = recipeRepository.findAll();
            for (Recipe recipe : recipes) {
                if (recipe == null) {
                    logger.warn("Found null recipe in database, skipping");
                    continue;
                }
                sanitizeRecipe(recipe);
            }
            return recipes;
        } catch (Exception e) {
            logger.error("Failed to fetch recipes: {}", e.getMessage(), e);
            throw new RuntimeException("Failed to fetch recipes: " + e.getMessage(), e);
        }
    }

    public Optional<Recipe> getRecipeById(String id) {
        logger.debug("Fetching recipe with ID: {}", id);
        try {
            if (id == null || id.trim().isEmpty() || !id.matches("^[0-9a-fA-F]{24}$")) {
                logger.error("Invalid recipe ID format: {}", id);
                throw new IllegalArgumentException("Invalid recipe ID format");
            }
            Optional<Recipe> recipe = recipeRepository.findById(id);
            if (recipe.isPresent()) {
                Recipe r = recipe.get();
                sanitizeRecipe(r);
                logger.info("Successfully fetched and sanitized recipe with ID: {}", id);
                return Optional.of(r);
            }
            logger.info("Recipe with ID {} not found", id);
            return Optional.empty();
        } catch (org.springframework.dao.DataAccessException e) {
            logger.error("Database error fetching recipe ID {}: {}", id, e.getMessage(), e);
            throw new RuntimeException("Database error: " + e.getMessage(), e);
        } catch (Exception e) {
            logger.error("Unexpected error fetching recipe ID {}: {}", id, e.getMessage(), e);
            throw new RuntimeException("Unexpected error fetching recipe: " + e.getMessage(), e);
        }
    }

    public Recipe updateRecipe(String id, Recipe updatedRecipe) {
        logger.debug("Updating recipe with ID: {}", id);
        try {
            if (id == null || id.trim().isEmpty() || !id.matches("^[0-9a-fA-F]{24}$")) {
                logger.error("Invalid recipe ID format: {}", id);
                throw new IllegalArgumentException("Invalid recipe ID format");
            }
            Optional<Recipe> existing = recipeRepository.findById(id);
            if (existing.isPresent()) {
                Recipe recipe = existing.get();
                recipe.setTitle(updatedRecipe.getTitle());
                recipe.setDescription(updatedRecipe.getDescription());
                recipe.setImageUrls(updatedRecipe.getImageUrls() != null ? updatedRecipe.getImageUrls() : new ArrayList<>());
                recipe.setVideoUrl(updatedRecipe.getVideoUrl());
                recipe.setPreparationTime(updatedRecipe.getPreparationTime() != null ? updatedRecipe.getPreparationTime() : 0);
                recipe.setCookingTime(updatedRecipe.getCookingTime() != null ? updatedRecipe.getCookingTime() : 0);
                recipe.setServings(updatedRecipe.getServings() != null ? updatedRecipe.getServings() : 1);
                recipe.setDifficulty(updatedRecipe.getDifficulty() != null ? updatedRecipe.getDifficulty() : "Easy");
                recipe.setIngredients(updatedRecipe.getIngredients() != null ? updatedRecipe.getIngredients() : new ArrayList<>());
                recipe.setSteps(updatedRecipe.getSteps() != null ? updatedRecipe.getSteps() : new ArrayList<>());
                recipe.setCategories(updatedRecipe.getCategories() != null ? updatedRecipe.getCategories() : new ArrayList<>());
                recipe.setTags(updatedRecipe.getTags() != null ? updatedRecipe.getTags() : new ArrayList<>());
                if (updatedRecipe.getAuthor() == null || updatedRecipe.getAuthor().getId() == null) {
                    logger.error("Updated recipe must have a valid author");
                    throw new IllegalArgumentException("Author with valid ID is required");
                }
                recipe.setAuthor(updatedRecipe.getAuthor());
                recipe.setLikes(updatedRecipe.getLikes() != null ? updatedRecipe.getLikes() : 0);

                // Assign IDs to new ingredients and steps
                for (Ingredient ingredient : recipe.getIngredients()) {
                    if (ingredient == null) {
                        logger.warn("Found null ingredient in updated recipe ID {}, skipping", id);
                        continue;
                    }
                    if (ingredient.getId() == null) {
                        ingredient.setId(UUID.randomUUID().toString());
                    }
                }
                for (Step step : recipe.getSteps()) {
                    if (step == null) {
                        logger.warn("Found null step in updated recipe ID {}, skipping", id);
                        continue;
                    }
                    if (step.getId() == null) {
                        step.setId(UUID.randomUUID().toString());
                    }
                }

                recipe.setUpdatedAt(LocalDateTime.now());
                logger.debug("Saving updated recipe: {}", recipe);
                Recipe saved = recipeRepository.save(recipe);
                logger.info("Successfully updated recipe with ID: {}", id);
                return saved;
            }
            logger.warn("Recipe ID {} not found", id);
            return null;
        } catch (Exception e) {
            logger.error("Failed to update recipe ID {}: {}", id, e.getMessage(), e);
            throw new RuntimeException("Failed to update recipe: " + e.getMessage(), e);
        }
    }

    public void deleteRecipe(String id) {
        logger.debug("Deleting recipe with ID: {}", id);
        try {
            if (id == null || id.trim().isEmpty() || !id.matches("^[0-9a-fA-F]{24}$")) {
                logger.error("Invalid recipe ID format: {}", id);
                throw new IllegalArgumentException("Invalid recipe ID format");
            }
            Optional<Recipe> recipe = recipeRepository.findById(id);
            if (!recipe.isPresent()) {
                logger.warn("Recipe with ID {} not found for deletion", id);
                throw new IllegalArgumentException("Recipe not found");
            }
            recipeRepository.deleteById(id);
            logger.info("Deleted recipe with ID: {}", id);
        } catch (Exception e) {
            logger.error("Failed to delete recipe ID {}: {}", id, e.getMessage(), e);
            throw new RuntimeException("Failed to delete recipe: " + e.getMessage(), e);
        }
    }

    private void sanitizeRecipe(Recipe recipe) {
        logger.debug("Sanitizing recipe ID: {}", recipe.getId());
        try {
            if (recipe.getId() == null) {
                logger.warn("Recipe has null ID, setting temporary ID for logging");
                recipe.setId("temp-" + UUID.randomUUID().toString());
            }
            if (recipe.getTitle() == null || recipe.getTitle().trim().isEmpty()) {
                logger.warn("Recipe ID {} has invalid title, setting default", recipe.getId());
                recipe.setTitle("Untitled Recipe");
            }
            if (recipe.getDescription() == null) {
                recipe.setDescription("");
            }
            if (recipe.getAuthor() == null) {
                logger.warn("Recipe ID {} has null author, setting default author", recipe.getId());
                recipe.setAuthor(new Author("unknown", "unknown", "Unknown User", "", "", 
                        0, 0, 0, 0));
            } else {
                Author author = recipe.getAuthor();
                if (author.getId() == null) {
                    logger.warn("Author for recipe ID {} has null ID, setting default", recipe.getId());
                    author.setId("unknown");
                }
                if (author.getUsername() == null) author.setUsername("unknown");
                if (author.getName() == null) author.setName("Unknown User");
                if (author.getBio() == null) author.setBio("");
                if (author.getProfileImageUrl() == null) author.setProfileImageUrl("");
                if (author.getFollowers() == null) author.setFollowers(0);
                if (author.getFollowing() == null) author.setFollowing(0);
                if (author.getRecipes() == null) author.setRecipes(0);
                if (author.getLearningPlans() == null) author.setLearningPlans(0);
            }
            if (recipe.getImageUrls() == null) {
                recipe.setImageUrls(new ArrayList<>());
            }
            if (recipe.getIngredients() == null) {
                recipe.setIngredients(new ArrayList<>());
            } else {
                List<Ingredient> sanitizedIngredients = new ArrayList<>();
                for (Ingredient ingredient : recipe.getIngredients()) {
                    if (ingredient == null) {
                        logger.warn("Found null ingredient in recipe ID {}, skipping", recipe.getId());
                        continue;
                    }
                    if (ingredient.getId() == null) {
                        ingredient.setId(UUID.randomUUID().toString());
                    }
                    if (ingredient.getName() == null) {
                        ingredient.setName("Unknown Ingredient");
                    }
                    if (ingredient.getQuantity() == null) {
                        ingredient.setQuantity("0");
                    }
                    if (ingredient.getUnit() == null) {
                        ingredient.setUnit("");
                    }
                    sanitizedIngredients.add(ingredient);
                }
                recipe.setIngredients(sanitizedIngredients);
            }
            if (recipe.getSteps() == null) {
                recipe.setSteps(new ArrayList<>());
            } else {
                List<Step> sanitizedSteps = new ArrayList<>();
                for (Step step : recipe.getSteps()) {
                    if (step == null) {
                        logger.warn("Found null step in recipe ID {}, skipping", recipe.getId());
                        continue;
                    }
                    if (step.getId() == null) {
                        step.setId(UUID.randomUUID().toString());
                    }
                    if (step.getOrder() == null) {
                        step.setOrder(0);
                    }
                    if (step.getInstruction() == null) {
                        step.setInstruction("");
                    }
                    if (step.getImageUrl() == null) {
                        step.setImageUrl("");
                    }
                    sanitizedSteps.add(step);
                }
                recipe.setSteps(sanitizedSteps);
            }
            if (recipe.getCategories() == null) {
                recipe.setCategories(new ArrayList<>());
            }
            if (recipe.getTags() == null) {
                recipe.setTags(new ArrayList<>());
            }
            if (recipe.getLikes() == null) {
                recipe.setLikes(0);
            }
            if (recipe.getPreparationTime() == null) {
                recipe.setPreparationTime(0);
            }
            if (recipe.getCookingTime() == null) {
                recipe.setCookingTime(0);
            }
            if (recipe.getServings() == null) {
                recipe.setServings(1);
            }
            if (recipe.getDifficulty() == null) {
                recipe.setDifficulty("Easy");
            }
            if (recipe.getCreatedAt() == null) {
                recipe.setCreatedAt(LocalDateTime.now());
            }
            if (recipe.getUpdatedAt() == null) {
                recipe.setUpdatedAt(LocalDateTime.now());
            }
        } catch (Exception e) {
            logger.error("Error sanitizing recipe ID {}: {}", recipe.getId(), e.getMessage(), e);
            throw new RuntimeException("Failed to sanitize recipe: " + e.getMessage(), e);
        }
    }
}