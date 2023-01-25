package io.dondany.flashcards.collection;

import io.dondany.flashcards.FlashCard;
import io.dondany.flashcards.FlashCardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CollectionService {
    private final CollectionRepository collectionRepository;
    private final FlashCardRepository flashCardRepository;

    List<CollectionDto> getAllCollections() {
        return collectionRepository.findAllCollections();
    }

    public CollectionDto getOneById(Long id) {
        return collectionRepository.findOne(id);
    }

    public Page<FlashCard> getAllFlashCards(Long id, Pageable pageable) {
        return flashCardRepository.findByCollectionId(id, pageable);
    }

    public Optional<FlashCard> getFlashCard(Long collectionId, Long flashCardId) {
        return flashCardRepository.findById(flashCardId);
    }
}
