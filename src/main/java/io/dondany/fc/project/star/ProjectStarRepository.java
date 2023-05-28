package io.dondany.fc.project.star;

import io.dondany.fc.project.Project;
import io.dondany.fc.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProjectStarRepository extends JpaRepository<ProjectStar, Long> {
    Optional<ProjectStar> findByProjectIdAndUser(Long projectId, User user);

    @Query("SELECT star.project from ProjectStar star WHERE star.user = :user")
    List<Project> findAllStarredProjectsByUser(@Param("user") User user);

    @Query("SELECT star.user from ProjectStar star WHERE star.project.id = :projectId")
    List<User> findAllStarMakers(@Param("projectId") Long projectId);
}
