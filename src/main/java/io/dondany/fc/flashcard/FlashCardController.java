package io.dondany.fc.flashcard;

import io.dondany.fc.PagedResponseEntity;
import io.dondany.fc.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.hateoas.server.mvc.BasicLinkBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/projects/{projectId}/collections/{collectionId}/flash-cards")
@RequiredArgsConstructor
public class FlashCardController {

    private final FlashCardService flashCardService;
    private final FlashCardMapper flashCardMapper;

    @GetMapping(params = {"page", "size"})
    public PagedResponseEntity<FlashCardModel> getFlashCardsByCollection(@PathVariable Long projectId,
                                                                         @PathVariable Long collectionId,
                                                                         @RequestParam(value = "page", defaultValue = "0", required = false) Integer page,
                                                                         @RequestParam(value = "size", defaultValue = "10", required = false) Integer size,
                                                                         @AuthenticationPrincipal User user) {
        Pageable pageable = PageRequest.of(page, size);
        Page<FlashCardModel> pagedFlashCards = flashCardService.getAllFlashCards(projectId, collectionId, pageable, user).map(flashCardMapper);

        return PagedResponseEntity.from(pagedFlashCards, String.format("%s/projects/%s/collections/%s/flash-cards", baseUri(), projectId, collectionId));
    }

    @GetMapping()
    public List<FlashCardModel> getAllByCollection(@PathVariable Long projectId,
                                                   @PathVariable Long collectionId) {
        return flashCardService.getAllByCollectionId(collectionId)
                .stream()
                .map(flashCardMapper)
                .toList();
    }

    @GetMapping("/{id}")
    public ResponseEntity<FlashCardModel> getFlashCard(@PathVariable Long projectId,
                                                  @PathVariable Long collectionId,
                                                  @PathVariable Long id,
                                                  @AuthenticationPrincipal User user) {
        return ResponseEntity.ok(flashCardMapper.apply(flashCardService.getFlashCard(projectId, collectionId, id, user)));
    }

    @PostMapping()
    public ResponseEntity<FlashCardModel> addFlashCard(@PathVariable Long projectId,
                                                       @PathVariable Long collectionId,
                                                       @RequestBody FlashCard flashCard,
                                                       @AuthenticationPrincipal User user) {
        FlashCard created = flashCardService.addFlashCard(projectId, collectionId, flashCard, user);
        return ResponseEntity.ok(flashCardMapper.apply(created));
    }

    @PutMapping("/{id}")
    public ResponseEntity<FlashCardModel> updateFlashCard(@PathVariable Long projectId,
                                                          @PathVariable Long collectionId,
                                                          @PathVariable Long id,
                                                          @RequestBody FlashCard flashCard,
                                                          @AuthenticationPrincipal User user) {
        FlashCard updated = flashCardService.updateFlashCard(projectId, collectionId, id, flashCard, user);
        return ResponseEntity.ok(flashCardMapper.apply(updated));
    }

    @DeleteMapping("/{id}")
    public void deleteFlashCard(@PathVariable Long projectId,
                                @PathVariable Long id,
                                @AuthenticationPrincipal User user) {
        flashCardService.deleteFlashCard(projectId, id, user);
    }

    private String baseUri() {
        return BasicLinkBuilder.linkToCurrentMapping().toString();
    }
}
