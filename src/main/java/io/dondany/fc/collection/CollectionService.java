package io.dondany.fc.collection;

import io.dondany.fc.project.Project;
import io.dondany.fc.project.ProjectRepository;
import io.dondany.fc.project.ProjectUpdateDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

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
        Optional<Project> projectOptional = projectRepository.findById(projectId);
        if (projectOptional.isEmpty()) {
            throw new RuntimeException("Project with id " + projectId + " not found!");
        }
        collection.setProject(projectOptional.get());

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
    public CollectionDto updateCollection(CollectionUpdateDto updateDto, Long projectId, Long id) {
        Optional<Collection> existing = collectionRepository.findById(id);
        if (existing.isEmpty()) {
            throw new IllegalArgumentException("Can't find collection with id " + id);
        }

        Collection toUpdate = existing.get();
        toUpdate.setName(updateDto.getName());
        toUpdate.setDescription(updateDto.getDescription());

        return CollectionDto.builder()
                .id(toUpdate.getId())
                .name(toUpdate.getName())
                .description(toUpdate.getDescription())
                .project(toUpdate.getProject())
                .numberOfFlashCards(0L)
                .build();
    }
}
