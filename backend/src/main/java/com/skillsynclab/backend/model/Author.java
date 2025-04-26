package com.skillsynclab.backend.model;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

public class Author {
    private String id;
    private String username;
    private String name;
    private String bio;
    private String profileImageUrl;
    private Integer followers;
    private Integer following;
    private Integer recipes;
    private Integer learningPlans;

    @JsonCreator
    public Author(
            @JsonProperty("id") String id,
            @JsonProperty("username") String username,
            @JsonProperty("name") String name,
            @JsonProperty("bio") String bio,
            @JsonProperty("profileImageUrl") String profileImageUrl,
            @JsonProperty("followers") Integer followers,
            @JsonProperty("following") Integer following,
            @JsonProperty("recipes") Integer recipes,
            @JsonProperty("learningPlans") Integer learningPlans) {
        this.id = id;
        this.username = username;
        this.name = name;
        this.bio = bio;
        this.profileImageUrl = profileImageUrl;
        this.followers = followers;
        this.following = following;
        this.recipes = recipes;
        this.learningPlans = learningPlans;
    }

    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getBio() {
        return bio;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }

    public String getProfileImageUrl() {
        return profileImageUrl;
    }

    public void setProfileImageUrl(String profileImageUrl) {
        this.profileImageUrl = profileImageUrl;
    }

    public Integer getFollowers() {
        return followers;
    }

    public void setFollowers(Integer followers) {
        this.followers = followers;
    }

    public Integer getFollowing() {
        return following;
    }

    public void setFollowing(Integer following) {
        this.following = following;
    }

    public Integer getRecipes() {
        return recipes;
    }

    public void setRecipes(Integer recipes) {
        this.recipes = recipes;
    }

    public Integer getLearningPlans() {
        return learningPlans;
    }

    public void setLearningPlans(Integer learningPlans) {
        this.learningPlans = learningPlans;
    }

    @Override
    public String toString() {
        return "Author{" +
                "id='" + id + '\'' +
                ", username='" + username + '\'' +
                ", name='" + name + '\'' +
                ", bio='" + bio + '\'' +
                ", profileImageUrl='" + profileImageUrl + '\'' +
                ", followers=" + followers +
                ", following=" + following +
                ", recipes=" + recipes +
                ", learningPlans=" + learningPlans +
                '}';
    }
}