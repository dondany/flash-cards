package io.dondany.fc.project;

import io.dondany.fc.collection.Collection;

import io.dondany.fc.project.share.ProjectShare;
import io.dondany.fc.user.User;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;

import java.util.ArrayList;
import java.util.List;

@Entity
public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;
    private String name;
    private String description;

    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Collection> collections = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name="owner_id")
    private User owner;

    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ProjectShare> shares;


    public void addCollection(Collection collection) {
        collections.add(collection);
        collection.setProject(this);
    }

    public void removeCollection(Collection collection) {
        collections.remove(collection);
        collection.setProject(null);
    }

    public void addShare(ProjectShare share) {
        shares.add(share);
        share.setProject(this);
    }

    public void removeShare(ProjectShare share) {
        shares.remove(share);
        share.setProject(null);
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<Collection> getCollections() {
        return collections;
    }

    public void setCollections(List<Collection> collections) {
        this.collections = collections;
    }

    public User getOwner() {
        return owner;
    }

    public void setOwner(User user) {
        this.owner = user;
    }

    public List<ProjectShare> getShares() {
        return shares;
    }

    public void setShares(List<ProjectShare> shares) {
        this.shares = shares;
    }
}
