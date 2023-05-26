package io.dondany.fc.collection;

import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
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
    @PreAuthorize("@projectAuthorizationHelper.isProjectOwner(#projectId, authentication) " +
            "|| @projectAuthorizationHelper.hasAccessToSharedProject(#projectId, authentication)")
    public List<CollectionDto> getCollections(@PathVariable Long projectId) {
        return collectionService.getAllCollectionsByProjectId(projectId);
    }

    @GetMapping("/{id}")
    @PreAuthorize("@projectAuthorizationHelper.isProjectOwner(#projectId, authentication) " +
            "|| @projectAuthorizationHelper.hasAccessToSharedProject(#projectId, authentication)")
    public CollectionDto getCollection(@PathVariable Long projectId,
                                       @PathVariable Long id) {
        return collectionService.getOneById(projectId, id);
    }

    @PostMapping()
    @PreAuthorize("@projectAuthorizationHelper.isProjectOwner(#projectId, authentication)")
    public CollectionDto addCollection(@PathVariable Long projectId,
                                       @RequestBody Collection collection) {
        return collectionService.addCollection(projectId, collection);
    }

    @PatchMapping("/{id}")
    @PreAuthorize("@projectAuthorizationHelper.isProjectOwner(#projectId, authentication)")
    public CollectionDto updateCollection(@RequestBody CollectionUpdateDto collectionUpdateDto,
                                          @PathVariable Long projectId,
                                          @PathVariable("id") Long id) {
        return collectionService.updateCollection(collectionUpdateDto, id);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("@projectAuthorizationHelper.isProjectOwner(#projectId, authentication)")
    public void deleteCollection(@PathVariable Long projectId,
                                 @PathVariable Long id) {
        collectionService.deleteCollection(id);
    }
}
