package io.dondany.fc.flashcard;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PagedResourcesAssembler;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.PagedModel;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("projects/{projectId}/collections/{collectionId}/flash-cards")
@RequiredArgsConstructor
public class FlashCardController {

    private final FlashCardService flashCardService;
    private final FlashCardModelAssembler flashCardModelAssembler;
    private final PagedResourcesAssembler<FlashCard> pagedResourcesAssembler;

    @GetMapping(params = {"page", "size"})
    public PagedModel<FlashCardModel> getFlashCards(@PathVariable Long projectId,
                                                    @PathVariable Long collectionId,
                                                    @RequestParam(value="page", defaultValue = "0", required = false) Integer page,
                                                    @RequestParam(value="size", defaultValue = "10", required = false) Integer size ) {
        Pageable pageable = PageRequest.of(page, size);
        Page<FlashCard>  flashCards = flashCardService.getAllFlashCards(collectionId, pageable);
        return pagedResourcesAssembler.toModel(flashCards, flashCardModelAssembler);
    }

    @GetMapping()
    public CollectionModel<FlashCardModel> getAll(@PathVariable Long projectId,
                                                  @PathVariable Long collectionId) {
        return flashCardModelAssembler.toCollectionModel(flashCardService.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<FlashCardModel> getFlashCard(@PathVariable Long projectId,
                                                       @PathVariable Long collectionId,
                                                       @PathVariable Long id) {
        return flashCardService.getFlashCard(collectionId, id)
                .map(fc -> new ResponseEntity<>(flashCardModelAssembler.toModel(fc), HttpStatus.OK))
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }

    @PostMapping()
    public FlashCardModel addFlashCard(@PathVariable Long projectId,
                                       @PathVariable Long collectionId,
                                       @RequestBody FlashCard flashCard) {
        return flashCardModelAssembler.toModel(flashCardService.addFlashCard(collectionId, flashCard));
    }

    @DeleteMapping("/{id}")
    public void deleteFlashCard(@PathVariable Long projectId, @PathVariable Long id) {
        flashCardService.deleteFlashCard(id);
    }
}
