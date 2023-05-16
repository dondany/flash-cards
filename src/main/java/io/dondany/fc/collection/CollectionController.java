package io.dondany.fc.collection;

import io.dondany.fc.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/projects/{projectId}/collections")
@RequiredArgsConstructor
public class CollectionController {

    private final CollectionService collectionService;

    @GetMapping()
    public List<CollectionDto> getCollections(@PathVariable Long projectId, @AuthenticationPrincipal User user) {
        return collectionService.getAllCollectionsByProjectId(projectId, user);
    }

    @GetMapping("/{id}")
    public CollectionDto getCollection(@PathVariable Long projectId,
                                       @PathVariable Long id,
                                       @AuthenticationPrincipal User user) {
        return collectionService.getOneById(projectId, id, user);
    }

    @PostMapping()
    public CollectionDto addCollection(@PathVariable Long projectId,
                                       @RequestBody Collection collection,
                                       @AuthenticationPrincipal User user) {
        return collectionService.addCollection(projectId, collection, user);
    }

    @PatchMapping("/{id}")
    public CollectionDto updateProject(@RequestBody CollectionUpdateDto project,
                                       @PathVariable Long projectId,
                                       @PathVariable("id") Long id,
                                       @AuthenticationPrincipal User user) {
        return collectionService.updateCollection(project, projectId, id, user);
    }

    @DeleteMapping("/{id}")
    public void deleteCollection(@PathVariable Long projectId,
                                 @PathVariable Long id,
                                 @AuthenticationPrincipal User user) {
        collectionService.deleteCollection(projectId, id, user);
    }
}
