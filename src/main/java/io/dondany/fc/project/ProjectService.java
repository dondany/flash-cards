package io.dondany.fc.project;

import io.dondany.fc.user.User;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class ProjectService {
    private final ProjectRepository projectRepository;

    public List<Project> getAllProjects(User user) {
        return projectRepository.findByUser(user);
    }

    public Project getProject(Long id, User user) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        if (!user.equals(project.getUser())) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN);
        }
        return project;
    }

    public Project addProject(Project project, User user) {
        project.setUser(user);
        return projectRepository.save(project);
    }

    public void deleteProject(Long id, User user) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        if (!user.equals(project.getUser())) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN);
        }
        projectRepository.deleteById(id);
    }

    @Transactional
    public Project updateProjectGeneralInfo(Project project, Long id, User user) {
        Project toUpdate = projectRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        if (!user.equals(toUpdate.getUser())) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN);
        }
        toUpdate.setName(project.getName());
        toUpdate.setDescription(project.getDescription());
        return toUpdate;
    }
}
