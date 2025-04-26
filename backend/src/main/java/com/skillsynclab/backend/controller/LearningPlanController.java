package com.skillsynclab.backend.controller;

import com.skillsynclab.backend.model.LearningPlan;
import com.skillsynclab.backend.service.LearningPlanService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/learning-plans")
public class LearningPlanController {
    private final LearningPlanService learningPlanService;

    public LearningPlanController(LearningPlanService learningPlanService) {
        this.learningPlanService = learningPlanService;
    }

    @PostMapping
    public LearningPlan createLearningPlan(@RequestBody LearningPlan learningPlan) {
        return learningPlanService.createLearningPlan(learningPlan);
    }

    @GetMapping
    public List<LearningPlan> getAllLearningPlans() {
        return learningPlanService.getAllLearningPlans();
    }

    @GetMapping("/{id}")
    public ResponseEntity<LearningPlan> getLearningPlanById(@PathVariable String id) {
        return learningPlanService.getLearningPlanById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public LearningPlan updateLearningPlan(@PathVariable String id, @RequestBody LearningPlan learningPlan) {
        return learningPlanService.updateLearningPlan(id, learningPlan);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLearningPlan(@PathVariable String id) {
        learningPlanService.deleteLearningPlan(id);
        return ResponseEntity.noContent().build();
    }
}