package io.dondany.fc.collection;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CollectionService {
    private final CollectionRepository collectionRepository;

//    List<CollectionDto> getAllCollections() {
//        return collectionRepository.findAllCollections();
//    }

    List<CollectionDto> getAllCollectionsByProjectId(Long projectId) {
        return collectionRepository.findAllCollectionsByProjectId(projectId);
    }


    public CollectionDto getOneById(Long projectId, Long id) {
        return collectionRepository.findOne(projectId, id);
    }
}
