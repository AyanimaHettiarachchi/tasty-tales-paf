package com.skillsynclab.backend.repository;

import com.skillsynclab.backend.model.Discussion;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface DiscussionRepository extends MongoRepository<Discussion, String> {
}