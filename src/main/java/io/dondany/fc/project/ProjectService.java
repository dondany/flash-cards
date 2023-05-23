package io.dondany.fc.project;

import io.dondany.fc.project.model.CreateProjectShareDto;
import io.dondany.fc.project.share.ProjectShare;
import io.dondany.fc.project.share.ProjectShareRepository;
import io.dondany.fc.user.User;
import io.dondany.fc.user.UserRepository;
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
    private final ProjectShareRepository projectShareRepository;
    private final UserRepository userRepository;

    public List<Project> getAllProjects(User user) {
        return projectRepository.findByOwner(user);
    }

    public Project getProject(Long id) {
        return projectRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }

    public Project addProject(Project project, User user) {
        project.setOwner(user);
        return projectRepository.save(project);
    }

    public void deleteProject(Long id) {
        projectRepository.deleteById(id);
    }

    @Transactional
    public Project updateProjectGeneralInfo(Project project, Long id, User user) {
        Project toUpdate = projectRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        if (!user.equals(toUpdate.getOwner())) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN);
        }
        toUpdate.setName(project.getName());
        toUpdate.setDescription(project.getDescription());
        return toUpdate;
    }

    public void shareProject(Long projectId, CreateProjectShareDto createProjectShareDto) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        User user = userRepository.findById(createProjectShareDto.getUserId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        ProjectShare projectShare = new ProjectShare();
        projectShare.setProject(project);
        projectShare.setUser(user);
        projectShare.setPermission(createProjectShareDto.getPermission());

        projectShareRepository.save(projectShare);
    }

    public void deleteShare(Long projectId, Long id) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        ProjectShare projectShare = projectShareRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        project.removeShare(projectShare);

        projectRepository.save(project);
    }

    public List<Project> getSharedProjects(User user) {
        return projectShareRepository.findByUserId(user.getId()).stream()
                .map(ProjectShare::getProject)
                .toList();
    }
}
