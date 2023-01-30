package io.dondany.fc.collection;

import io.dondany.fc.flashcard.FlashCardController;
import io.dondany.fc.project.ProjectController;
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
        collectionDto.add(linkTo(methodOn(FlashCardController.class).getFlashCardsByCollection(entity.getProject().getId(), entity.getId(), 0, 12)).withRel("flash-cards-paged"));
        collectionDto.add(linkTo(methodOn(FlashCardController.class).getAllByCollection(entity.getProject().getId(), entity.getId())).withRel("flash-cards"));
        collectionDto.add(linkTo(methodOn(CollectionController.class).getCollections(entity.getProject().getId())).withRel("collections"));
        collectionDto.add(linkTo(methodOn(ProjectController.class).getProject(entity.getProject().getId())).withRel("project"));
        return collectionDto;
    }
}
