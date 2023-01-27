package io.dondany.fc.project;

import io.dondany.fc.collection.CollectionController;
import org.springframework.hateoas.server.mvc.RepresentationModelAssemblerSupport;
import org.springframework.stereotype.Component;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

@Component
public class ProjectModelAssembler extends RepresentationModelAssemblerSupport<Project, ProjectDto> {

    public ProjectModelAssembler() {
     super(ProjectController.class, ProjectDto.class);
    }

    @Override
    public ProjectDto toModel(Project entity) {
        ProjectDto projectDto = new ProjectDto();
        projectDto.setId(entity.getId());
        projectDto.setName(entity.getName());
        projectDto.setDescription(entity.getDescription());

        projectDto.add(linkTo(methodOn(ProjectController.class).getProjects()).withRel("projects"));
        projectDto.add(linkTo(methodOn(ProjectController.class).getProject(entity.getId())).withSelfRel());
        projectDto.add(linkTo(methodOn(CollectionController.class).getCollections(entity.getId())).withRel("collections"));
        return projectDto;
    }
}
