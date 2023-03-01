package io.dondany.fc.flashcard;

import io.dondany.fc.PagedResponseEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.hateoas.server.mvc.BasicLinkBuilder;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("projects/{projectId}/collections/{collectionId}/flash-cards")
@RequiredArgsConstructor
public class FlashCardController {

    private final FlashCardService flashCardService;
    private final FlashCardMapper flashCardMapper;

    @GetMapping(params = {"page", "size"})
    public PagedResponseEntity<FlashCardModel> getFlashCardsByCollection(@PathVariable Long projectId,
                                                                         @PathVariable Long collectionId,
                                                                         @RequestParam(value = "page", defaultValue = "0", required = false) Integer page,
                                                                         @RequestParam(value = "size", defaultValue = "10", required = false) Integer size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<FlashCardModel> pagedFlashCards = flashCardService.getAllFlashCards(collectionId, pageable).map(flashCardMapper);

        return PagedResponseEntity.from(pagedFlashCards, String.format("%s/projects/%s/collections/%s/flash-cards", baseUri(), projectId, collectionId));
    }

    @GetMapping()
    public List<FlashCardModel> getAllByCollection(@PathVariable Long projectId,
                                                   @PathVariable Long collectionId) {
        return flashCardService.getAllByCollectionId(collectionId)
                .stream()
                .map(flashCardMapper)
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public ResponseEntity<FlashCard> getFlashCard(@PathVariable Long projectId,
                                                  @PathVariable Long collectionId,
                                                  @PathVariable Long id) {
        return flashCardService.getFlashCard(collectionId, id)
                .map(fc -> new ResponseEntity<>(fc, HttpStatus.OK))
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }

    @PostMapping()
    public FlashCard addFlashCard(@PathVariable Long projectId,
                                       @PathVariable Long collectionId,
                                       @RequestBody FlashCard flashCard) {
        return flashCardService.addFlashCard(projectId, collectionId, flashCard);
    }

    @PutMapping("/{id}")
    public FlashCard updateFlashCard(@PathVariable Long projectId,
                                          @PathVariable Long collectionId,
                                          @PathVariable Long id,
                                          @RequestBody FlashCard flashCard) {
        return flashCardService.updateFlashCard(projectId, collectionId, id, flashCard);
    }

    @DeleteMapping("/{id}")
    public void deleteFlashCard(@PathVariable Long id) {
        flashCardService.deleteFlashCard(id);
    }

    private String baseUri() {
        return BasicLinkBuilder.linkToCurrentMapping().toString();
    }
}
