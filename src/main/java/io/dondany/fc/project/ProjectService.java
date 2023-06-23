package io.dondany.fc.project;

import io.dondany.fc.notification.NotificationService;
import io.dondany.fc.notification.model.NotificationTypes;
import io.dondany.fc.project.model.CreateProjectMemberDto;
import io.dondany.fc.project.model.ProjectDto;
import io.dondany.fc.project.model.ProjectMapper;
import io.dondany.fc.project.model.ProjectMemberDto;
import io.dondany.fc.project.model.Visibility;
import io.dondany.fc.project.member.ProjectMember;
import io.dondany.fc.project.member.ProjectMemberRepository;
import io.dondany.fc.user.User;
import io.dondany.fc.user.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@AllArgsConstructor
public class ProjectService {
    private final ProjectRepository projectRepository;
    private final ProjectMemberRepository projectMemberRepository;
    private final UserRepository userRepository;

    private final NotificationService notificationService;

    public List<ProjectDto> getAllProjectsByOwner(User user) {
        return projectRepository.findAllByOwner(user)
                .stream()
                .map(ProjectMapper.INSTANCE::mapProjectToProjectDto)
                .toList();
    }

    public List<Project> getAllPublicProjects() {
        return projectRepository.findAllByVisibility(Visibility.PUBLIC);
    }

    public ProjectDto getProject(Long id) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        ProjectDto projectDto = ProjectMapper.INSTANCE.mapProjectToProjectDto(project);
        return projectDto;
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
        toUpdate.setVisibility(project.getVisibility());
        return toUpdate;
    }

    @Transactional
    public void addProjectMember(Long projectId, CreateProjectMemberDto createProjectMemberDto) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        User user = userRepository.findById(createProjectMemberDto.getUserId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        ProjectMember projectMember = new ProjectMember();
        projectMember.setProject(project);
        projectMember.setUser(user);
        projectMember.setPermission(createProjectMemberDto.getPermission());

        projectMemberRepository.save(projectMember);
        createMemberNotification(project, user);
    }

    public void deleteProjectMember(Long projectId, Long id) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        ProjectMember projectMember = projectMemberRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        project.removeMember(projectMember);
        projectRepository.save(project);
    }

    public List<Project> getSharedProjects(User user) {
        return projectMemberRepository.findByUserId(user.getId()).stream()
                .map(ProjectMember::getProject)
                .toList();
    }

    private void createMemberNotification(Project project, User user) {
        String senderName = project.getOwner().getFirstname();
        notificationService.createNotification(
                user,
                String.format("User %s added You as a member to the project %s!", senderName, project.getName()),
                NotificationTypes.STANDARD
        );
    }
}
