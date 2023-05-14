package io.dondany.fc.project.model;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UpdateProjectDto {
    private String name;
    private String description;
}
