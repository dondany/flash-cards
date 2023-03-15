package io.dondany.fc.flashcard;

import io.dondany.fc.collection.Collection;
import io.dondany.fc.collection.CollectionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class FlashCardService {
    private final FlashCardRepository flashCardRepository;
    private final CollectionRepository collectionRepository;

    public List<FlashCard> getAllByCollectionId(Long collectionId) {
        return flashCardRepository.findAllByCollectionId(collectionId);
    }

    public Page<FlashCard> getAllFlashCards(Long id, Pageable pageable) {
        return flashCardRepository.findByCollectionId(id, pageable);
    }

    public Optional<FlashCard> getFlashCard(Long collectionId, Long flashCardId) {
        return flashCardRepository.findByIdAndCollectionId(flashCardId, collectionId);
    }

    public FlashCard addFlashCard(Long projectId, Long collectionId, FlashCard flashCard) {
        Optional<Collection> collectionOptional = collectionRepository.findByIdAndProjectId(collectionId, projectId);
        if (collectionOptional.isEmpty()) {
            throw new RuntimeException("Collection with id " + collectionId + " and projectId" + projectId + " not found!");
        }

        Collection collection = collectionOptional.get();
        flashCard.setCollection(collection);
        return flashCardRepository.save(flashCard);
    }

    @Transactional
    public FlashCard updateFlashCard(Long projectId, Long collectionId, Long id, FlashCard flashCard) {
        FlashCard fc = flashCardRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("FlashCard with id " + id + " not found"));

        fc.setFront(flashCard.getFront());
        fc.setBack(flashCard.getBack());

        return fc;
    }

    public void deleteFlashCard(Long id) {
        flashCardRepository.deleteById(id);
    }

}
