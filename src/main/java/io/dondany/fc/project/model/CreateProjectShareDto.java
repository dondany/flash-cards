package io.dondany.fc.project.model;

import io.dondany.fc.auth.Permission;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CreateProjectShareDto {
    private Long userId;
    private Permission permission;
}
