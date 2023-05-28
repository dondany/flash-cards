package io.dondany.fc.project;

import io.dondany.fc.project.share.ProjectShareRepository;
import io.dondany.fc.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

@Component
@RequiredArgsConstructor
public class ProjectAuthorizationHelper {

    private final ProjectRepository projectRepository;
    private final ProjectShareRepository projectShareRepository;

    public boolean isProjectOwner(Long projectId, Authentication authentication) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        return authentication.getName().equals(project.getOwner().getEmail());
    }

    public boolean hasAccessToSharedProject(Long projectId, Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        return projectShareRepository.findByUserIdAndProjectId(user.getId(), projectId)
                .isPresent();
    }

    public boolean isProjectPublic(Long projectId) {
        return projectRepository.existsByIsPublicTrueAndId(projectId);
    }
}
