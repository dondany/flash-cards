package io.dondany.fc.project;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.hateoas.RepresentationModel;
import org.springframework.hateoas.server.core.Relation;

@Getter
@Setter
@Builder
@Relation(collectionRelation = "projects")
@AllArgsConstructor
@NoArgsConstructor
public class ProjectDto extends RepresentationModel<ProjectDto>{
    private Long id;
    private String name;
    private String description;
}
