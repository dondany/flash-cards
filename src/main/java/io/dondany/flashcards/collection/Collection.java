package io.dondany.flashcards.collection;

import io.dondany.flashcards.FlashCard;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
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

    public void addFlashCard(FlashCard flashCard) {
        flashCards.add(flashCard);
        flashCard.setCollection(this);
    }

    public void removeFlashCard(FlashCard flashCard) {
        flashCards.remove(flashCard);
        flashCard.setCollection(null);
    }
}
