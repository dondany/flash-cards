package io.dondany.flashcards;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class FlashCardService {
    private final FlashCardRepository repository;

    Page<FlashCard> getAllFlashCards(Pageable pageable) {
        return repository.findAll(pageable);
    }

    public FlashCard addFlashCard(FlashCard flashCard) {
        return repository.save(flashCard);
    }

    public void deleteFlashCard(Long id) {
        repository.deleteById(id);
    }
}
