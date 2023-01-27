package io.dondany.fc.flashcard;

import io.dondany.fc.collection.Collection;
import io.dondany.fc.collection.CollectionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class FlashCardService {
    private final FlashCardRepository flashCardRepository;
    private final CollectionRepository collectionRepository;

    public Page<FlashCard> getAllFlashCards(Long id, Pageable pageable) {
        return flashCardRepository.findByCollectionId(id, pageable);
    }

    public Optional<FlashCard> getFlashCard(Long collectionId, Long flashCardId) {
        return flashCardRepository.findById(flashCardId);
    }

    public FlashCard addFlashCard(Long collectionId, FlashCard flashCard) {
        Optional<Collection> collectionOptional = collectionRepository.findById(collectionId);
        if (collectionOptional.isEmpty()) {
            throw new RuntimeException("Collection with id " + collectionId + " not found!");
        }

        Collection collection = collectionOptional.get();
        collection.addFlashCard(flashCard);
        collectionRepository.saveAndFlush(collection);
        return flashCard;
    }

    public void deleteFlashCard(Long id) {
        flashCardRepository.deleteById(id);
    }
}
