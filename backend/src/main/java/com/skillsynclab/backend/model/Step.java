package com.skillsynclab.backend.model;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

public class Step {
    private String id;
    private Integer order;
    private String instruction;
    private String imageUrl;

    @JsonCreator
    public Step(
            @JsonProperty("id") String id,
            @JsonProperty("order") Integer order,
            @JsonProperty("instruction") String instruction,
            @JsonProperty("imageUrl") String imageUrl) {
        this.id = id;
        this.order = order;
        this.instruction = instruction;
        this.imageUrl = imageUrl;
    }

    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Integer getOrder() {
        return order;
    }

    public void setOrder(Integer order) {
        this.order = order;
    }

    public String getInstruction() {
        return instruction;
    }

    public void setInstruction(String instruction) {
        this.instruction = instruction;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    @Override
    public String toString() {
        return "Step{" +
                "id='" + id + '\'' +
                ", order=" + order +
                ", instruction='" + instruction + '\'' +
                ", imageUrl='" + imageUrl + '\'' +
                '}';
    }
}