package io.dondany.fc.flashcard;

import io.dondany.fc.collection.Collection;
import io.dondany.fc.collection.CollectionRepository;
import io.dondany.fc.project.Project;
import io.dondany.fc.project.ProjectRepository;
import io.dondany.fc.user.User;
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
    private final ProjectRepository projectRepository;

    public List<FlashCard> getAllByCollectionId(Long collectionId) {
        return flashCardRepository.findAllByCollectionId(collectionId);
    }

    public Page<FlashCard> getAllFlashCards(Long projectId, Long id, Pageable pageable, User user) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        if (!user.equals(project.getUser())) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN);
        }
        return flashCardRepository.findByCollectionId(id, pageable);
    }

    public FlashCard getFlashCard(Long projectId, Long collectionId, Long flashCardId, User user) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        if (!user.equals(project.getUser())) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN);
        }
        return flashCardRepository.findByIdAndCollectionId(flashCardId, collectionId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }

    public FlashCard addFlashCard(Long projectId, Long collectionId, FlashCard flashCard, User user) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        if (!user.equals(project.getUser())) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN);
        }
        Collection collection = collectionRepository.findByIdAndProjectId(collectionId, projectId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        flashCard.setCollection(collection);
        return flashCardRepository.save(flashCard);
    }

    @Transactional
    public FlashCard updateFlashCard(Long projectId, Long collectionId, Long id, FlashCard flashCard, User user) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        if (!user.equals(project.getUser())) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN);
        }
        FlashCard fc = flashCardRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        fc.setFront(flashCard.getFront());
        fc.setBack(flashCard.getBack());
        return fc;
    }

    public void deleteFlashCard(Long projectId, Long id, User user) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        if (!user.equals(project.getUser())) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN);
        }
        flashCardRepository.deleteById(id);
    }

}
