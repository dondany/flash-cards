package io.dondany.fc.project;

import io.dondany.fc.project.model.Visibility;
import io.dondany.fc.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {
    List<Project> findAllByOwner(User user);
    List<Project> findAllByVisibility(Visibility visibility);
    boolean existsByIdAndVisibility(Long projectId, Visibility visibility);
}
