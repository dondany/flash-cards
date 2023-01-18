package io.dondany.flashcards;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.springframework.hateoas.RepresentationModel;

@Builder
@Getter
@Setter
public class FlashCardModel extends RepresentationModel<FlashCardModel> {
    private Long id;
    private String front;
    private String back;
}
