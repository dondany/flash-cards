package io.dondany.fc.user.model;

import io.dondany.fc.user.User;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface UserMapper {
    public static UserMapper INSTANCE = Mappers.getMapper(UserMapper.class);

    UserDto map(User source);
}
