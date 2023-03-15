package io.dondany.fc.project;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ProjectUpdateDto {
    private String name;
    private String description;
}
