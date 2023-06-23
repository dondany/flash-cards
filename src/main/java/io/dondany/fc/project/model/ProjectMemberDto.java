package io.dondany.fc.project.model;

import io.dondany.fc.auth.Permission;
import io.dondany.fc.user.model.UserDto;
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
public class ProjectMemberDto {
    private Long id;
    private UserDto user;
    private Permission permission;
}
