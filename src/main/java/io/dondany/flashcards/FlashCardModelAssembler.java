package io.dondany.flashcards;

import org.springframework.hateoas.server.mvc.RepresentationModelAssemblerSupport;
import org.springframework.stereotype.Component;

@Component
public class FlashCardModelAssembler extends RepresentationModelAssemblerSupport<FlashCard, FlashCardModel> {

    public FlashCardModelAssembler() {
        super(FlashCardController.class, FlashCardModel.class);
    }

    @Override
    public FlashCardModel toModel(FlashCard entity) {
        return FlashCardModel.builder()
                .id(entity.getId())
                .front(entity.getFront())
                .back(entity.getBack())
                .build();
    }

}
