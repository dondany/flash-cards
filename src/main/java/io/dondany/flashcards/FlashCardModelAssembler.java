package io.dondany.flashcards;

import io.dondany.flashcards.collection.CollectionController;
import org.springframework.hateoas.server.mvc.RepresentationModelAssemblerSupport;
import org.springframework.stereotype.Component;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

@Component
public class FlashCardModelAssembler extends RepresentationModelAssemblerSupport<FlashCard, FlashCardModel> {

    public FlashCardModelAssembler() {
        super(CollectionController.class, FlashCardModel.class);
    }

    @Override
    public FlashCardModel toModel(FlashCard entity) {
        FlashCardModel flashCardModel = instantiateModel(entity);
        flashCardModel.setId(entity.getId());
        flashCardModel.setFront(entity.getFront());
        flashCardModel.setBack(entity.getBack());

        flashCardModel.add(linkTo(methodOn(CollectionController.class).getFlashCard(entity.getCollection().getId(), entity.getId())).withSelfRel());
        return flashCardModel;
    }


}
