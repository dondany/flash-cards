package io.dondany.flashcards;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FlashCardService {
    private final FlashCardRepository repository;

    List<FlashCard> getAllFlashCards() {
        return repository.findAll();
    }

    public FlashCard addFlashCard(FlashCard flashCard) {
        return repository.save(flashCard);
    }
}
