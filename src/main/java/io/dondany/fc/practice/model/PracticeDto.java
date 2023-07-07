package io.dondany.fc.practice.model;

import io.dondany.fc.collection.model.CollectionSimpleDto;
import io.dondany.fc.project.model.ProjectSimpleDto;
import io.dondany.fc.user.model.UserDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PracticeDto {
    private Long id;
    private String name;
    private String description;
    private UserDto owner;
    private ProjectSimpleDto project;
    private List<CollectionSimpleDto> collections;
}
