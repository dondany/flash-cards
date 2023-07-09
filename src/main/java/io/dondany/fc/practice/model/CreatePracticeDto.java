package io.dondany.fc.practice.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CreatePracticeDto {
    private String name;
    private String description;
    private PracticeType type;
    private long projectId;
    private List<Long> collectionIds;
}
