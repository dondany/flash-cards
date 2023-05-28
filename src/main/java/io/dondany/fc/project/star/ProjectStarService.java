package io.dondany.fc.project.star;

import io.dondany.fc.notification.NotificationService;
import io.dondany.fc.project.Project;
import io.dondany.fc.project.ProjectRepository;
import io.dondany.fc.project.model.ProjectDto;
import io.dondany.fc.project.model.ProjectMapper;
import io.dondany.fc.user.User;
import io.dondany.fc.user.model.UserDto;
import io.dondany.fc.user.model.UserMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

import static org.springframework.http.HttpStatus.NOT_FOUND;

@Service
@RequiredArgsConstructor
public class ProjectStarService {

    private final ProjectStarRepository projectStarRepository;
    private final ProjectRepository projectRepository;
    private final NotificationService notificationService;

    public List<ProjectDto> getStarredProjects(User user) {
        return projectStarRepository.findAllStarredProjectsByUser(user)
                .stream()
                .map(ProjectMapper.INSTANCE::mapProjectToProjectDto)
                .toList();
    }

    @Transactional
    public void starProject(Long projectId, User user) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new ResponseStatusException(NOT_FOUND));

        ProjectStar projectStar = new ProjectStar();
        projectStar.setProject(project);
        projectStar.setUser(user);

        projectStarRepository.save(projectStar);
        createStarNotification(project, user);
    }

    public void unstarProject(Long projectId, User user) {
        ProjectStar projectStar = projectStarRepository.findByProjectIdAndUser(projectId, user)
                .orElseThrow(() -> new ResponseStatusException(NOT_FOUND));
        projectStarRepository.delete(projectStar);
    }

    private void createStarNotification(Project project, User recipient) {
        String senderName = project.getOwner().getFirstname();
        notificationService.createNotification(
                recipient,
                String.format("User %s starred your project %s!", senderName, project.getName())
        );
    }

    public List<UserDto> getStarmakers(Long projectId) {
        return projectStarRepository.findAllStarMakers(projectId)
                .stream()
                .map(UserMapper.INSTANCE::map)
                .toList();
    }
}
