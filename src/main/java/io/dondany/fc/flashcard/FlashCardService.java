package io.dondany.fc.flashcard;

import io.dondany.fc.collection.Collection;
import io.dondany.fc.collection.CollectionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FlashCardService {
    private final FlashCardRepository flashCardRepository;
    private final CollectionRepository collectionRepository;

    public List<FlashCard> getAllByCollectionId(Long collectionId) {
        return flashCardRepository.findAllByCollectionId(collectionId);
    }

    public Page<FlashCard> getAllFlashCards(Long collectionId, Pageable pageable) {
        return flashCardRepository.findByCollectionId(collectionId, pageable);
    }

    public FlashCard getFlashCard(Long collectionId, Long flashCardId) {
        return flashCardRepository.findByIdAndCollectionId(flashCardId, collectionId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }

    public FlashCard addFlashCard(Long projectId, Long collectionId, FlashCard flashCard) {
        Collection collection = collectionRepository.findByIdAndProjectId(collectionId, projectId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        flashCard.setCollection(collection);
        return flashCardRepository.save(flashCard);
    }

    @Transactional
    public FlashCard updateFlashCard(Long id, FlashCard flashCard) {
        FlashCard fc = flashCardRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        fc.setFront(flashCard.getFront());
        fc.setBack(flashCard.getBack());
        return fc;
    }

    public void deleteFlashCard(Long id) {
        flashCardRepository.deleteById(id);
    }

}
