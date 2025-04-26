package com.skillsynclab.backend.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Document(collection = "learning_plans")
public class LearningPlan {
    @Id
    private String id;
    private String title;
    private String description;
    private String imageUrl;
    private Author author;
    private List<LearningStep> steps;
    private List<String> categories;
    private String difficulty;
    private String estimatedDuration;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}