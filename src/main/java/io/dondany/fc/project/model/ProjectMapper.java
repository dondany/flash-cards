package io.dondany.fc.project.model;

import io.dondany.fc.project.Project;
import org.mapstruct.Builder;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper(builder = @Builder(disableBuilder = true))
public interface ProjectMapper {

    ProjectMapper INSTANCE = Mappers.getMapper(ProjectMapper.class);

    CreateProjectDto mapProjectToCreateProjectDto(Project source);
    Project mapCreateProjectDtoToProject(CreateProjectDto source);

    @Mapping(target="owner", source="owner.username")
    ProjectDto mapProjectToProjectDto(Project source);
    @Mapping(target="owner", ignore = true)
    Project mapProjectDtoToProject(ProjectDto source);

    UpdateProjectDto mapProjectToUpdateProjectDto(Project source);
    Project mapUpdateProjectDtoToProject(UpdateProjectDto source);

    @Mapping(target="owner", source="owner.username")
    SharedProjectDto mapProjectToSharedProjectDto(Project source);
}
