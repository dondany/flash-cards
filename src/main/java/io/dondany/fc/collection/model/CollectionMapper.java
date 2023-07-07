package io.dondany.fc.collection.model;

import io.dondany.fc.collection.Collection;
import io.dondany.fc.collection.CollectionDto;
import org.mapstruct.Builder;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper(builder = @Builder(disableBuilder = true))
public interface CollectionMapper {

    CollectionMapper INSTANCE = Mappers.getMapper(CollectionMapper.class);

    CollectionDto map(Collection source);
}
