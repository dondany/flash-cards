package io.dondany.fc.flashcard;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FlashCardRepository extends JpaRepository<FlashCard, Long> {
    Page<FlashCard> findByCollectionId(Long id, Pageable pageable);

    Optional<FlashCard> findByIdAndCollectionId(Long flashCardId, Long collectionId);

    List<FlashCard> findAllByCollectionId(Long collectionId);
}
