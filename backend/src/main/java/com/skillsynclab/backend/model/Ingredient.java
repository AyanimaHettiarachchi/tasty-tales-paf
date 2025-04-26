package com.skillsynclab.backend.model;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

public class Ingredient {
    private String id;
    private String name;
    private String quantity;
    private String unit;

    @JsonCreator
    public Ingredient(
            @JsonProperty("id") String id,
            @JsonProperty("name") String name,
            @JsonProperty("quantity") String quantity,
            @JsonProperty("unit") String unit) {
        this.id = id;
        this.name = name;
        this.quantity = quantity;
        this.unit = unit;
    }

    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getQuantity() {
        return quantity;
    }

    public void setQuantity(String quantity) {
        this.quantity = quantity;
    }

    public String getUnit() {
        return unit;
    }

    public void setUnit(String unit) {
        this.unit = unit;
    }

    @Override
    public String toString() {
        return "Ingredient{" +
                "id='" + id + '\'' +
                ", name='" + name + '\'' +
                ", quantity='" + quantity + '\'' +
                ", unit='" + unit + '\'' +
                '}';
    }
}