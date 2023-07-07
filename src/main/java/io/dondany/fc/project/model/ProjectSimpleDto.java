package io.dondany.fc.project.model;

import io.dondany.fc.collection.model.CollectionSimpleDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProjectSimpleDto {
    private long id;
    private String name;
    private List<CollectionSimpleDto> collections;
}
