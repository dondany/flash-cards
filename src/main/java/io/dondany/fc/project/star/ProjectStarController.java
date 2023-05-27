package io.dondany.fc.project.star;

import io.dondany.fc.project.model.ProjectDto;
import io.dondany.fc.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/star")
@RequiredArgsConstructor
public class ProjectStarController {

    private final ProjectStarService projectStarService;

    @GetMapping
    public List<ProjectDto> getStarredProjects(@AuthenticationPrincipal User user) {
        return projectStarService.getStarredProjects(user);
    }

    @PostMapping("/{projectId}")
    public void starProject(@PathVariable Long projectId, @AuthenticationPrincipal User user){
        projectStarService.starProject(projectId, user);
    }

    @DeleteMapping("/{projectId}")
    public void unstarProject(@PathVariable Long projectId, @AuthenticationPrincipal User user) {
        projectStarService.unstarProject(projectId, user);
    }

}
