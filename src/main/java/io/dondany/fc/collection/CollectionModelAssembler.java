package io.dondany.fc.collection;

import io.dondany.fc.flashcard.FlashCardController;
import org.springframework.hateoas.server.mvc.RepresentationModelAssemblerSupport;
import org.springframework.stereotype.Component;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

@Component
public class CollectionModelAssembler extends RepresentationModelAssemblerSupport<CollectionDto, CollectionDto> {

    public CollectionModelAssembler() {
        super(CollectionController.class, CollectionDto.class);
    }

    @Override
    public CollectionDto toModel(CollectionDto entity) {
        CollectionDto collectionDto = new CollectionDto();
        collectionDto.setId(entity.getId());
        collectionDto.setName(entity.getName());
        collectionDto.setDescription(entity.getDescription());
        collectionDto.setNumberOfFlashCards(entity.getNumberOfFlashCards());
        collectionDto.setProject(entity.getProject());

        collectionDto.add(linkTo(methodOn(CollectionController.class).getCollection(entity.getProject().getId(), entity.getId())).withSelfRel());
        collectionDto.add(linkTo(methodOn(FlashCardController.class).getFlashCards(entity.getProject().getId(), entity.getId(), 0, 12)).withRel("flash-cards-paged"));
        collectionDto.add(linkTo(methodOn(FlashCardController.class).getAll(entity.getProject().getId(), entity.getId())).withRel("flash-cards"));
        collectionDto.add(linkTo(methodOn(CollectionController.class).getCollections(entity.getProject().getId())).withRel("collections"));
        return collectionDto;
    }
}
