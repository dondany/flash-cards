package io.dondany.fc.project.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SharedProjectDto {
    private Long id;
    private String name;
    private String description;
    private String owner;
}
