package com.skillsynclab.backend.model;

import lombok.Data;
import org.springframework.data.annotation.Id;

@Data
public class Resource {
    @Id
    private String id;
    private String title;
    private String type;
    private String url;
}