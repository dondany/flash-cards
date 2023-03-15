package io.dondany.fc.collection;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CollectionUpdateDto {
    private String name;
    private String description;
}
