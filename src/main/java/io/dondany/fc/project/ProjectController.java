package io.dondany.fc.project;

import io.dondany.fc.project.model.CreateProjectDto;
import io.dondany.fc.project.model.ProjectDto;
import io.dondany.fc.project.model.ProjectMapper;
import io.dondany.fc.project.model.UpdateProjectDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/projects")
@RequiredArgsConstructor
public class ProjectController {
    private final ProjectService projectService;

    @GetMapping
    public List<ProjectDto> getProjects() {
        return projectService.getAllProjects()
                .stream()
                .map(ProjectMapper.INSTANCE::mapProjectToProjectDto)
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public ProjectDto getProject(@PathVariable Long id) {
        return projectService.getProject(id)
                .map(ProjectMapper.INSTANCE::mapProjectToProjectDto)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }

    @PostMapping()
    public ProjectDto addProject(@RequestBody CreateProjectDto createProjectDto) {
        Project project = ProjectMapper.INSTANCE.mapCreateProjectDtoToProject(createProjectDto);
        return ProjectMapper.INSTANCE.mapProjectToProjectDto(projectService.addProject(project));
    }

    @PatchMapping("/{id}")
    public ProjectDto updateProject(@RequestBody UpdateProjectDto updateProjectDto,
                                    @PathVariable("id") Long id) {
        Project project = ProjectMapper.INSTANCE.mapUpdateProjectDtoToProject(updateProjectDto);
        return ProjectMapper.INSTANCE.mapProjectToProjectDto(projectService.updateProjectGeneralInfo(project, id));
    }

    @DeleteMapping("/{id}")
    public void deleteProject(@PathVariable Long id) {
        projectService.deleteProject(id);
    }
}
