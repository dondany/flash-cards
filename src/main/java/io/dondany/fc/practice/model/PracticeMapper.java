package io.dondany.fc.practice.model;

import io.dondany.fc.practice.Practice;
import org.mapstruct.Builder;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper(builder = @Builder(disableBuilder = true))
public interface PracticeMapper {

    PracticeMapper INSTANCE = Mappers.getMapper(PracticeMapper.class);

    PracticeDto map(Practice source);
}
