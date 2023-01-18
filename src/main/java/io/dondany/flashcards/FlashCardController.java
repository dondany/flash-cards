package io.dondany.flashcards;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PagedResourcesAssembler;
import org.springframework.hateoas.PagedModel;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/flash-cards")
@RequiredArgsConstructor
public class FlashCardController {

    private final FlashCardService flashCardService;
    private final FlashCardModelAssembler flashCardModelAssembler;
    private final PagedResourcesAssembler<FlashCard> pagedResourcesAssembler;

    @GetMapping()
    public PagedModel<FlashCardModel> getFlashCards(
            @RequestParam(value="page", defaultValue = "0") int page,
            @RequestParam(value="size", defaultValue = "10") int size ) {
        Pageable pageable = PageRequest.of(page, size);
        Page<FlashCard> flashCards = flashCardService.getAllFlashCards(pageable);

//        if (flashCards.getTotalPages() < page) {
//            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
//        }

//        return ResponseEntity
//                .ok()
//                .contentType(MediaType.HAL)
//                        .body(pagedResourcesAssembler.toModel(flashCards, flashCardModelAssembler));
        return pagedResourcesAssembler.toModel(flashCards, flashCardModelAssembler);

    }

    @PostMapping()
    public FlashCard addFlashCard(@RequestBody FlashCard flashCard) {
        return flashCardService.addFlashCard(flashCard);
    }

    @DeleteMapping("/{id}")
    public void deleteFlashCard(@PathVariable Long id) {
        flashCardService.deleteFlashCard(id);
    }
}
