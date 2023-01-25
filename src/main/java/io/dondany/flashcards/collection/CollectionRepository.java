package io.dondany.flashcards.collection;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CollectionRepository extends JpaRepository<Collection, Long> {

    @Query("SELECT new io.dondany.flashcards.collection.CollectionDto(c.id, c.name, c.description, COUNT(fc)) FROM Collection c LEFT JOIN c.flashCards fc GROUP BY c.id")
    List<CollectionDto> findAllCollections();

    @Query("SELECT new io.dondany.flashcards.collection.CollectionDto(c.id, c.name, c.description, COUNT(fc)) FROM Collection c LEFT JOIN c.flashCards fc where c.id = :id GROUP BY c.id")
    CollectionDto findOne(@Param("id") Long id);

}
