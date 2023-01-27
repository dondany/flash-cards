package io.dondany.fc.flashcard;

import io.dondany.fc.collection.Collection;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import java.util.Objects;

@Entity
@Data
public class FlashCard {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;
    private String front;
    private String back;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "collectionId")
    private Collection collection;

    public FlashCard() {}

    public FlashCard(String front, String back) {
        this.front = front;
        this.back = back;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof FlashCard)) return false;
        return id != null && id.equals(((FlashCard) o).getId());
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, front, back, collection);
    }

    @Override
    public String toString() {
        return "FlashCard{" +
                "id=" + id +
                ", front='" + front + '\'' +
                ", back='" + back + '\'' +
                ", collection=" + collection.getId() +
                '}';
    }
}
