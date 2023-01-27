package io.dondany.fc.collection;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CollectionRepository extends JpaRepository<Collection, Long> {

//    @Query("SELECT new io.dondany.fc.collection.CollectionDto(c.id, c.name, c.description, COUNT(fc)) FROM Collection c LEFT JOIN c.flashCards fc GROUP BY c.id")
//    List<CollectionDto> findAllCollections();

    @Query("SELECT new io.dondany.fc.collection.CollectionDto(c.id, c.name, c.description, COUNT(fc), c.project) " +
            "FROM Collection c " +
            "LEFT JOIN c.flashCards fc " +
            "LEFT JOIN c.project " +
            "where c.project.id = :projectId " +
            "GROUP BY c.id")
    List<CollectionDto> findAllCollectionsByProjectId(@Param("projectId") Long projectId);

    @Query("SELECT new io.dondany.fc.collection.CollectionDto(c.id, c.name, c.description, COUNT(fc), c.project) " +
            "FROM Collection c " +
            "LEFT JOIN c.flashCards fc " +
            "LEFT JOIN c.project " +
            "where c.id = :id " +
            "AND c.project.id = :projectId " +
            "GROUP BY c.id")
    CollectionDto findOne(@Param("projectId") Long projectId, @Param("id") Long id);

}
