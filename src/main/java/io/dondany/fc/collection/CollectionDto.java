package io.dondany.fc.collection;

import com.fasterxml.jackson.annotation.JsonIgnore;
import io.dondany.fc.project.Project;
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
public class CollectionDto{
    private Long id;
    private String name;
    private String description;
    private Long numberOfFlashCards;
    @JsonIgnore
    private Project project;
}
