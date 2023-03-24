package io.dondany.fc.collection;

import io.dondany.fc.flashcard.FlashCard;
import io.dondany.fc.project.Project;

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
public class Collection {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;
    private String name;
    private String description;

    @OneToMany(mappedBy = "collection", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<FlashCard> flashCards = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "projectId")
    private Project project;

    public void addFlashCard(FlashCard flashCard) {
        flashCards.add(flashCard);
        flashCard.setCollection(this);
    }

    public void removeFlashCard(FlashCard flashCard) {
        flashCards.remove(flashCard);
        flashCard.setCollection(null);
    }

    @Override
    public String toString() {
        return "Collection{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", flashCards=" + flashCards +
                ", project=" + project +
                '}';
    }
}
