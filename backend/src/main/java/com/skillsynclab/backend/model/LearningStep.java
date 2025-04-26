package com.skillsynclab.backend.model;

import lombok.Data;
import org.springframework.data.annotation.Id;

import java.util.List;

@Data
public class LearningStep {
    @Id
    private String id;
    private int order;
    private String title;
    private String description;
    private List<Resource> resources;
    private boolean completed;
}