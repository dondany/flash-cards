package io.dondany.fc.project.member;

import io.dondany.fc.project.Project;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProjectMemberRepository extends JpaRepository<ProjectMember, Long> {
    List<ProjectMember> findByUserId(Long userId);
    Optional<ProjectMember> findByUserIdAndProjectId(Long userId, Long projectId);

    @EntityGraph(attributePaths = "user")
    List<ProjectMember> findByProject(Project project);
}
