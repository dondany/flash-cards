package io.dondany.fc.project;

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
    private final ProjectMapper projectMapper;

    @GetMapping
    public List<ProjectDto> getProjects() {
        return projectService.getAllProjects()
                .stream()
                .map(projectMapper)
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public ProjectDto getProject(@PathVariable Long id) {
        return projectService.getProject(id)
                .map(projectMapper)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }

    @PostMapping()
    public ProjectDto addProject(@RequestBody Project project) {
        return projectMapper.apply(projectService.addProject(project));
    }

    @PatchMapping("/{id}")
    public ProjectDto updateProject(@RequestBody ProjectUpdateDto project,
                                    @PathVariable("id") Long id) {

        return projectMapper.apply(projectService.updateProjectGeneralInfo(project, id));
    }

    @DeleteMapping("/{id}")
    public void deleteProject(@PathVariable Long id) {
        projectService.deleteProject(id);
    }
}
