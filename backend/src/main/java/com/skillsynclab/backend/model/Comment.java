package com.skillsynclab.backend.model;

import lombok.Data;
import org.springframework.data.annotation.Id;

import java.time.LocalDateTime;

@Data
public class Comment {
    @Id
    private String id;
    private String content;
    private Author author;
    private LocalDateTime createdAt;
}