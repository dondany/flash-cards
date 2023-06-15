package io.dondany.fc.friend.model;

import io.dondany.fc.friend.Friend;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper
public interface FriendInfoMapper {
    FriendInfoMapper INSTANCE = Mappers.getMapper(FriendInfoMapper.class);

    @Mapping(source = "friendTwo", target="friend")
    FriendInfoDto map(Friend source);
}
