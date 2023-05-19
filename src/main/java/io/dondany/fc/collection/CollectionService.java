package io.dondany.fc.collection;

import io.dondany.fc.project.Project;
import io.dondany.fc.project.ProjectRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CollectionService {
    private final CollectionRepository collectionRepository;
    private final ProjectRepository projectRepository;

    List<CollectionDto> getAllCollectionsByProjectId(Long projectId) {
        return collectionRepository.findAllCollectionsByProjectId(projectId);
    }

    public CollectionDto getOneById(Long projectId, Long id) {
        return collectionRepository.findOne(projectId, id);
    }

    public CollectionDto addCollection(Long projectId, Collection collection) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        collection.setProject(project);

        Collection newCollection = collectionRepository.save(collection);
        return CollectionDto.builder()
                .id(newCollection.getId())
                .name(newCollection.getName())
                .description(newCollection.getDescription())
                .project(newCollection.getProject())
                .numberOfFlashCards(0L)
                .build();
    }

    public void deleteCollection(Long id) {
        collectionRepository.deleteById(id);
    }

    @Transactional
    public CollectionDto updateCollection(CollectionUpdateDto updateDto,
                                          Long id) {
        Collection collection = collectionRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        collection.setName(updateDto.getName());
        collection.setDescription(updateDto.getDescription());
        return CollectionDto.builder()
                .id(collection.getId())
                .name(collection.getName())
                .description(collection.getDescription())
                .project(collection.getProject())
                .numberOfFlashCards(0L)
                .build();
    }
}
