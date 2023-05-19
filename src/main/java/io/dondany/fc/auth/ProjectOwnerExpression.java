package io.dondany.fc.auth;

import io.dondany.fc.project.Project;
import io.dondany.fc.project.ProjectRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

@Component
@RequiredArgsConstructor
public class ProjectOwnerExpression {

    private final ProjectRepository projectRepository;

    public boolean isProjectOwner(Long projectId, Authentication authentication) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        return authentication.getName().equals(project.getUser().getEmail());
    }
}
