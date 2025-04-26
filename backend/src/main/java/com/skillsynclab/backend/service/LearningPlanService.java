package com.skillsynclab.backend.service;

import com.skillsynclab.backend.model.LearningPlan;
import com.skillsynclab.backend.repository.LearningPlanRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class LearningPlanService {
    private final LearningPlanRepository learningPlanRepository;

    public LearningPlanService(LearningPlanRepository learningPlanRepository) {
        this.learningPlanRepository = learningPlanRepository;
    }

    public LearningPlan createLearningPlan(LearningPlan learningPlan) {
        learningPlan.setCreatedAt(LocalDateTime.now());
        learningPlan.setUpdatedAt(LocalDateTime.now());
        return learningPlanRepository.save(learningPlan);
    }

    public List<LearningPlan> getAllLearningPlans() {
        return learningPlanRepository.findAll();
    }

    public Optional<LearningPlan> getLearningPlanById(String id) {
        return learningPlanRepository.findById(id);
    }

    public LearningPlan updateLearningPlan(String id, LearningPlan updatedLearningPlan) {
        Optional<LearningPlan> existing = learningPlanRepository.findById(id);
        if (existing.isPresent()) {
            LearningPlan learningPlan = existing.get();
            learningPlan.setTitle(updatedLearningPlan.getTitle());
            learningPlan.setDescription(updatedLearningPlan.getDescription());
            learningPlan.setImageUrl(updatedLearningPlan.getImageUrl());
            learningPlan.setSteps(updatedLearningPlan.getSteps());
            learningPlan.setCategories(updatedLearningPlan.getCategories());
            learningPlan.setDifficulty(updatedLearningPlan.getDifficulty());
            learningPlan.setEstimatedDuration(updatedLearningPlan.getEstimatedDuration());
            learningPlan.setUpdatedAt(LocalDateTime.now());
            return learningPlanRepository.save(learningPlan);
        }
        throw new RuntimeException("Learning Plan not found");
    }

    public void deleteLearningPlan(String id) {
        learningPlanRepository.deleteById(id);
    }
}