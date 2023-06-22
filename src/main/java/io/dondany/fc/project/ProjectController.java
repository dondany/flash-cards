package io.dondany.fc.project;

import io.dondany.fc.project.model.CreateProjectDto;
import io.dondany.fc.project.model.CreateProjectShareDto;
import io.dondany.fc.project.model.ProjectDto;
import io.dondany.fc.project.model.ProjectMapper;
import io.dondany.fc.project.model.SharedProjectDto;
import io.dondany.fc.project.model.UpdateProjectDto;
import io.dondany.fc.user.User;
import io.dondany.fc.user.model.UserDto;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/projects")
@RequiredArgsConstructor
public class ProjectController {
    private final ProjectService projectService;

    @GetMapping
    public List<ProjectDto> getProjects(@AuthenticationPrincipal User user) {
        return projectService.getAllProjectsByOwner(user)
                .stream()
                .map(ProjectMapper.INSTANCE::mapProjectToProjectDto)
                .toList();
    }

    @GetMapping(params = { "isPublic=true" })
    public List<ProjectDto> getPublicProjects(@RequestParam boolean isPublic) {
        return projectService.getAllPublicProjects()
                .stream()
                .map(ProjectMapper.INSTANCE::mapProjectToProjectDto)
                .toList();
    }

    @GetMapping("/{id}")
    @PreAuthorize("@projectAuthorizationHelper.isProjectOwner(#id, authentication) " +
            "|| @projectAuthorizationHelper.hasAccessToSharedProject(#id, authentication)")
    public ProjectDto getProject(@PathVariable Long id) {
        return projectService.getProject(id);
    }

    @PostMapping()
    public ProjectDto addProject(@RequestBody CreateProjectDto createProjectDto, @AuthenticationPrincipal User user) {
        Project project = ProjectMapper.INSTANCE.mapCreateProjectDtoToProject(createProjectDto);
        return ProjectMapper.INSTANCE.mapProjectToProjectDto(projectService.addProject(project, user));
    }

    @PatchMapping("/{id}")
    @PreAuthorize("@projectAuthorizationHelper.isProjectOwner(#id, authentication)")
    public ProjectDto updateProject(@RequestBody UpdateProjectDto updateProjectDto,
                                    @PathVariable("id") Long id,
                                    @AuthenticationPrincipal User user) {
        Project project = ProjectMapper.INSTANCE.mapUpdateProjectDtoToProject(updateProjectDto);
        return ProjectMapper.INSTANCE.mapProjectToProjectDto(projectService.updateProjectGeneralInfo(project, id, user));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("@projectAuthorizationHelper.isProjectOwner(#id, authentication)")
    public void deleteProject(@PathVariable Long id) {
        projectService.deleteProject(id);
    }

    @PostMapping("/{id}/share")
    @PreAuthorize("@projectAuthorizationHelper.isProjectOwner(#id, authentication)")
    public void shareProject(@PathVariable Long id,
                             @RequestBody CreateProjectShareDto createProjectShareDto) {
        projectService.shareProject(id, createProjectShareDto);
    }

    @DeleteMapping("/{projectId}/share/{id}")
    @PreAuthorize("@projectAuthorizationHelper.isProjectOwner(#projectId, authentication)")
    public void deleteProject(@PathVariable Long projectId,
                              @PathVariable Long id) {
        projectService.deleteShare(projectId, id);
    }

    @GetMapping(params = { "shared" })
    public List<SharedProjectDto> getSharedProjects(@RequestParam("shared") boolean shared,
            @AuthenticationPrincipal User user) {
        return projectService.getSharedProjects(user)
                .stream()
                .map(ProjectMapper.INSTANCE::mapProjectToSharedProjectDto)
                .toList();
    }

    @GetMapping("/{id}/members")
    public List<UserDto> getProjectMembers(@PathVariable long id) {
        return projectService.getProjectMembers(id);
    }

}
