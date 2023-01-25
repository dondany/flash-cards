package io.dondany.flashcards.collection;

import io.dondany.flashcards.FlashCardModel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.springframework.hateoas.RepresentationModel;

@Getter
@Setter
@Builder
@AllArgsConstructor
public class CollectionDto extends RepresentationModel<FlashCardModel> {
    private Long id;
    private String name;
    private String description;
    private Long numberOfFlashCards;


}
