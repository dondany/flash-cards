package io.dondany.fc.project.share;

import io.dondany.fc.project.Project;
import io.dondany.fc.user.User;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProjectShareRepository extends JpaRepository<ProjectShare, Long> {
    List<ProjectShare> findByUserId(Long userId);
    Optional<ProjectShare> findByUserIdAndProjectId(Long userId, Long projectId);

    @EntityGraph(attributePaths = "user")
    List<ProjectShare> findByProject(Project project);
}
