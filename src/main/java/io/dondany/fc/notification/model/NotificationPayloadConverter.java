package io.dondany.fc.notification.model;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.AttributeConverter;

public class NotificationPayloadConverter implements AttributeConverter<NotificationPayload, String> {

    private final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public String convertToDatabaseColumn(NotificationPayload attribute) {
        try {
            return objectMapper.writeValueAsString(attribute);
        } catch (JsonProcessingException e) {
            throw(new RuntimeException(e));
        }
    }

    @Override
    public NotificationPayload convertToEntityAttribute(String dbData) {
        try {
            return objectMapper.readValue(dbData, NotificationPayload.class);
        } catch (JsonProcessingException e) {
            throw(new RuntimeException(e));
        }
    }
}
