package io.dondany.fc.collection;

import io.dondany.fc.flashcard.FlashCard;
import io.dondany.fc.project.Project;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
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
