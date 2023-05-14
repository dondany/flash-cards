package io.dondany.fc.project;

import io.dondany.fc.collection.Collection;

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
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;
    private String name;
    private String description;

    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Collection> collections = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name="user_id")
    private User user;

    public void addCollection(Collection collection) {
        collections.add(collection);
        collection.setProject(this);
    }

    public void removeCollection(Collection collection) {
        collections.remove(collection);
        collection.setProject(null);
    }
}
