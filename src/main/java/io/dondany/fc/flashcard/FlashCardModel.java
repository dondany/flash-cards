package io.dondany.fc.flashcard;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.hateoas.RepresentationModel;
import org.springframework.hateoas.server.core.Relation;

@Builder
@Getter
@Setter
@Relation(collectionRelation = "flashcards")
@NoArgsConstructor
@AllArgsConstructor
public class FlashCardModel extends RepresentationModel<FlashCardModel> {
    private Long id;
    private String front;
    private String back;
}
