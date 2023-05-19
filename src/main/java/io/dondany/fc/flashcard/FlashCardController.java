package io.dondany.fc.flashcard;

import io.dondany.fc.PagedResponseEntity;
import io.dondany.fc.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.hateoas.server.mvc.BasicLinkBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
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
    @PreAuthorize("@projectOwnerExpression.isProjectOwner(#projectId, authentication)")
    public PagedResponseEntity<FlashCardModel> getFlashCardsByCollection(@PathVariable Long projectId,
                                                                         @PathVariable Long collectionId,
                                                                         @RequestParam(value = "page", defaultValue = "0", required = false) Integer page,
                                                                         @RequestParam(value = "size", defaultValue = "10", required = false) Integer size,
                                                                         @AuthenticationPrincipal User user) {
        Pageable pageable = PageRequest.of(page, size);
        Page<FlashCardModel> pagedFlashCards = flashCardService.getAllFlashCards(collectionId, pageable)
                .map(flashCardMapper);

        return PagedResponseEntity.from(pagedFlashCards, String.format("%s/projects/%s/collections/%s/flash-cards", baseUri(), projectId, collectionId));
    }

    @GetMapping()
    @PreAuthorize("@projectOwnerExpression.isProjectOwner(#projectId, authentication)")
    public List<FlashCardModel> getAllByCollection(@PathVariable Long projectId,
                                                   @PathVariable Long collectionId) {
        return flashCardService.getAllByCollectionId(collectionId)
                .stream()
                .map(flashCardMapper)
                .toList();
    }

    @GetMapping("/{id}")
    @PreAuthorize("@projectOwnerExpression.isProjectOwner(#projectId, authentication)")
    public ResponseEntity<FlashCardModel> getFlashCard(@PathVariable Long projectId,
                                                  @PathVariable Long collectionId,
                                                  @PathVariable Long id,
                                                  @AuthenticationPrincipal User user) {
        return ResponseEntity.ok(flashCardMapper.apply(flashCardService.getFlashCard(collectionId, id)));
    }

    @PostMapping()
    @PreAuthorize("@projectOwnerExpression.isProjectOwner(#projectId, authentication)")
    public ResponseEntity<FlashCardModel> addFlashCard(@PathVariable Long projectId,
                                                       @PathVariable Long collectionId,
                                                       @RequestBody FlashCard flashCard,
                                                       @AuthenticationPrincipal User user) {
        FlashCard created = flashCardService.addFlashCard(projectId, collectionId, flashCard);
        return ResponseEntity.ok(flashCardMapper.apply(created));
    }

    @PutMapping("/{id}")
    @PreAuthorize("@projectOwnerExpression.isProjectOwner(#projectId, authentication)")
    public ResponseEntity<FlashCardModel> updateFlashCard(@PathVariable Long projectId,
                                                          @PathVariable Long collectionId,
                                                          @PathVariable Long id,
                                                          @RequestBody FlashCard flashCard,
                                                          @AuthenticationPrincipal User user) {
        FlashCard updated = flashCardService.updateFlashCard(id, flashCard);
        return ResponseEntity.ok(flashCardMapper.apply(updated));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("@projectOwnerExpression.isProjectOwner(#projectId, authentication)")
    public void deleteFlashCard(@PathVariable Long projectId,
                                @PathVariable Long id,
                                @AuthenticationPrincipal User user) {
        flashCardService.deleteFlashCard(id);
    }

    private String baseUri() {
        return BasicLinkBuilder.linkToCurrentMapping().toString();
    }
}
