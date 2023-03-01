package io.dondany.fc.project;

import org.springframework.stereotype.Component;

import java.util.function.Function;

@Component
public class ProjectMapper implements Function<Project, ProjectDto> {

    @Override
    public ProjectDto apply(Project project) {
        return ProjectDto.builder()
                .id(project.getId())
                .name(project.getName())
                .description(project.getName())
                .build();
    }
}
