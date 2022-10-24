package io.dondany.flashcards;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class FlashCardController {

    private final FlashCardService flashCardService;

    @GetMapping("/flash-cards")
    List<FlashCard> getFlashCards() {
        return flashCardService.getAllFlashCards();
    }
}
