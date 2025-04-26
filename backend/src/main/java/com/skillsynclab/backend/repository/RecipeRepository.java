// DOCUMENT filename="RecipeRepository.java"
package com.skillsynclab.backend.repository;

import com.skillsynclab.backend.model.Recipe;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface RecipeRepository extends MongoRepository<Recipe, String> {
}