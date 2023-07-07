package io.dondany.fc.practice;

import io.dondany.fc.user.User;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PracticeRepository extends JpaRepository<Practice, Long> {
    @EntityGraph(attributePaths = {"owner", "collections"} )
    List<Practice> findAllByOwner(User user);
}
