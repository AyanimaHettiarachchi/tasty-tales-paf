package com.skillsynclab.backend.service;

import com.skillsynclab.backend.model.Discussion;
import com.skillsynclab.backend.repository.DiscussionRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class DiscussionService {

    private static final Logger logger = LoggerFactory.getLogger(DiscussionService.class);

    @Autowired
    private DiscussionRepository discussionRepository;

    public Discussion createDiscussion(Discussion discussion) {
        logger.debug("Creating discussion: {}", discussion);
        try {
            if (discussion.getTitle() == null || discussion.getTitle().isEmpty()) {
                throw new IllegalArgumentException("Title is required");
            }
            if (discussion.getContent() == null || discussion.getContent().isEmpty()) {
                throw new IllegalArgumentException("Content is required");
            }
            if (discussion.getAuthor() == null) {
                throw new IllegalArgumentException("Author is required");
            }

            if (discussion.getImages() == null) discussion.setImages(new ArrayList<>());
            if (discussion.getTags() == null) discussion.setTags(new ArrayList<>());
            if (discussion.getComments() == null) discussion.setComments(new ArrayList<>());
            if (discussion.getLikes() == null) discussion.setLikes(0);

            discussion.setCreatedAt(LocalDateTime.now());
            discussion.setUpdatedAt(LocalDateTime.now());
            Discussion saved = discussionRepository.save(discussion);
            logger.info("Saved discussion with ID: {}", saved.getId());
            return saved;
        } catch (Exception e) {
            logger.error("Failed to create discussion", e);
            throw new RuntimeException("Failed to save discussion to MongoDB: " + e.getMessage(), e);
        }
    }

    public List<Discussion> getAllDiscussions() {
        return discussionRepository.findAll();
    }

    public Optional<Discussion> getDiscussionById(String id) {
        return discussionRepository.findById(id);
    }

    public Discussion updateDiscussion(String id, Discussion updatedDiscussion) {
        Optional<Discussion> existing = discussionRepository.findById(id);
        if (existing.isPresent()) {
            Discussion discussion = existing.get();
            discussion.setTitle(updatedDiscussion.getTitle());
            discussion.setContent(updatedDiscussion.getContent());
            discussion.setImages(updatedDiscussion.getImages() != null ? updatedDiscussion.getImages() : new ArrayList<>());
            discussion.setTags(updatedDiscussion.getTags() != null ? updatedDiscussion.getTags() : new ArrayList<>());
            discussion.setComments(updatedDiscussion.getComments() != null ? updatedDiscussion.getComments() : new ArrayList<>());
            discussion.setLikes(updatedDiscussion.getLikes() != null ? updatedDiscussion.getLikes() : 0);
            discussion.setUpdatedAt(LocalDateTime.now());
            return discussionRepository.save(discussion);
        }
        return null;
    }

    public void deleteDiscussion(String id) {
        discussionRepository.deleteById(id);
    }
}