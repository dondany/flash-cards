package io.dondany.flashcards.collection;

import io.dondany.flashcards.FlashCard;
import io.dondany.flashcards.FlashCardModel;
import io.dondany.flashcards.FlashCardModelAssembler;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PagedResourcesAssembler;
import org.springframework.hateoas.PagedModel;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/collections")
@RequiredArgsConstructor
public class CollectionController {
    private final CollectionService collectionService;
    private final FlashCardModelAssembler flashCardModelAssembler;
    private final PagedResourcesAssembler<FlashCard> pagedResourcesAssembler;

    @GetMapping()
    public List<CollectionDto> getCollections() {
        return collectionService.getAllCollections();
    }

    @GetMapping("/{id}")
    public CollectionDto getCollection(@PathVariable Long id) {
        return collectionService.getOneById(id);
    }

    @GetMapping("/{id}/flash-cards")
    public PagedModel<FlashCardModel> getFlashCards(@PathVariable Long id,
                                                    @RequestParam(value="page", defaultValue = "0") int page,
                                                    @RequestParam(value="size", defaultValue = "10") int size ) {
        Pageable pageable = PageRequest.of(page, size);
        Page<FlashCard>  flashCards= collectionService.getAllFlashCards(id, pageable);
        return pagedResourcesAssembler.toModel(flashCards, flashCardModelAssembler);
    }

    @GetMapping("/{id}/flash-cards/{fcId}")
    public ResponseEntity<FlashCardModel> getFlashCard(@PathVariable Long id,
                                                       @PathVariable Long fcId) {
        return collectionService.getFlashCard(id, fcId)
                .map(fc -> new ResponseEntity<>(flashCardModelAssembler.toModel(fc), HttpStatus.OK))
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }
}
