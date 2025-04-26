package com.skillsynclab.backend.controller;

import com.skillsynclab.backend.model.Discussion;
import com.skillsynclab.backend.service.DiscussionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/discussions")
@CrossOrigin(origins = "http://localhost:8080")
public class DiscussionController {

    @Autowired
    private DiscussionService discussionService;

    @PostMapping
    public ResponseEntity<Discussion> createDiscussion(@RequestBody Discussion discussion) {
        Discussion created = discussionService.createDiscussion(discussion);
        return ResponseEntity.ok(created);
    }

    @GetMapping
    public ResponseEntity<List<Discussion>> getAllDiscussions() {
        List<Discussion> discussions = discussionService.getAllDiscussions();
        return ResponseEntity.ok(discussions);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Discussion> getDiscussionById(@PathVariable String id) {
        Optional<Discussion> discussion = discussionService.getDiscussionById(id);
        return discussion.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Discussion> updateDiscussion(@PathVariable String id, @RequestBody Discussion discussion) {
        Discussion updated = discussionService.updateDiscussion(id, discussion);
        if (updated != null) {
            return ResponseEntity.ok(updated);
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDiscussion(@PathVariable String id) {
        discussionService.deleteDiscussion(id);
        return ResponseEntity.noContent().build();
    }
}