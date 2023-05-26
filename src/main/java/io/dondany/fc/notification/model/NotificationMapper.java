package io.dondany.fc.notification.model;

import io.dondany.fc.notification.Notification;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface NotificationMapper {

    NotificationMapper INSTANCE = Mappers.getMapper(NotificationMapper.class);

    NotificationDto map(Notification source);
    Notification map(NotificationDto source);
}
