package io.dondany.fc.collection;

import io.dondany.fc.project.Project;
import io.dondany.fc.project.ProjectRepository;
import io.dondany.fc.user.User;
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

    List<CollectionDto> getAllCollectionsByProjectId(Long projectId, User user) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        if (!user.equals(project.getUser())) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN);
        }
        return collectionRepository.findAllCollectionsByProjectId(projectId);
    }


    public CollectionDto getOneById(Long projectId, Long id, User user) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        if (!user.equals(project.getUser())) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN);
        }
        return collectionRepository.findOne(projectId, id);
    }

    public CollectionDto addCollection(Long projectId, Collection collection, User user) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        if (!user.equals(project.getUser())) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN);
        }
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

    public void deleteCollection(Long projectId, Long id,  User user) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        if (!user.equals(project.getUser())) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN);
        }
        collectionRepository.deleteById(id);
    }

    @Transactional
    public CollectionDto updateCollection(CollectionUpdateDto updateDto,
                                          Long projectId,
                                          Long id,
                                          User user) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        if (!user.equals(project.getUser())) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN);
        }

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
