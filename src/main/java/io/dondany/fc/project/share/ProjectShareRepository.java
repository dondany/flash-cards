package io.dondany.fc.project.share;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProjectShareRepository extends JpaRepository<ProjectShare, Long> {
    List<ProjectShare> findByUserId(Long userId);
}
