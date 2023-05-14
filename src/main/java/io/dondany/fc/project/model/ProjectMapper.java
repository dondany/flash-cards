package io.dondany.fc.project.model;

import io.dondany.fc.project.Project;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface ProjectMapper {

    ProjectMapper INSTANCE = Mappers.getMapper(ProjectMapper.class);

    CreateProjectDto mapProjectToCreateProjectDto(Project source);
    Project mapCreateProjectDtoToProject(CreateProjectDto source);

    ProjectDto mapProjectToProjectDto(Project source);
    Project mapProjectDtoToProject(ProjectDto source);

    UpdateProjectDto mapProjectToUpdateProjectDto(Project source);
    Project mapUpdateProjectDtoToProject(UpdateProjectDto source);
}
