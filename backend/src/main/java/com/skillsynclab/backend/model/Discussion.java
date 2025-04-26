package com.skillsynclab.backend.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@Document(collection = "discussions")
public class Discussion {
    @Id
    private String id;
    private String title;
    private String content;
    private List<String> images;
    private List<String> tags;
    private Author author;
    private Integer likes;
    private List<Comment> comments;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public void setImages(List<String> images) {
        this.images = images != null ? images : new ArrayList<>();
    }

    public void setTags(List<String> tags) {
        this.tags = tags != null ? tags : new ArrayList<>();
    }

    public void setComments(List<Comment> comments) {
        this.comments = comments != null ? comments : new ArrayList<>();
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}