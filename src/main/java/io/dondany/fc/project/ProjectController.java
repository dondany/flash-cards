package io.dondany.fc.project;

import io.dondany.fc.project.model.CreateProjectDto;
import io.dondany.fc.project.model.ProjectDto;
import io.dondany.fc.project.model.ProjectMapper;
import io.dondany.fc.project.model.UpdateProjectDto;
import io.dondany.fc.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/projects")
@RequiredArgsConstructor
public class ProjectController {
    private final ProjectService projectService;

    @GetMapping
    public List<ProjectDto> getProjects(@AuthenticationPrincipal User user) {
        return projectService.getAllProjects(user)
                .stream()
                .map(ProjectMapper.INSTANCE::mapProjectToProjectDto)
                .toList();
    }

    @GetMapping("/{id}")
    public ProjectDto getProject(@PathVariable Long id, @AuthenticationPrincipal User user) {
        return ProjectMapper.INSTANCE.mapProjectToProjectDto(projectService.getProject(id, user));
    }

    @PostMapping()
    public ProjectDto addProject(@RequestBody CreateProjectDto createProjectDto, @AuthenticationPrincipal User user) {
        Project project = ProjectMapper.INSTANCE.mapCreateProjectDtoToProject(createProjectDto);
        return ProjectMapper.INSTANCE.mapProjectToProjectDto(projectService.addProject(project, user));
    }

    @PatchMapping("/{id}")
    public ProjectDto updateProject(@RequestBody UpdateProjectDto updateProjectDto,
                                    @PathVariable("id") Long id,
                                    @AuthenticationPrincipal User user) {
        Project project = ProjectMapper.INSTANCE.mapUpdateProjectDtoToProject(updateProjectDto);
        return ProjectMapper.INSTANCE.mapProjectToProjectDto(projectService.updateProjectGeneralInfo(project, id, user));
    }

    @DeleteMapping("/{id}")
    public void deleteProject(@PathVariable Long id, @AuthenticationPrincipal User user) {
        projectService.deleteProject(id, user);
    }
}
