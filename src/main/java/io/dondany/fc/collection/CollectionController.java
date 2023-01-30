package io.dondany.fc.collection;

import lombok.RequiredArgsConstructor;
import org.springframework.hateoas.CollectionModel;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/projects/{projectId}/collections")
@RequiredArgsConstructor
public class CollectionController {

    private final CollectionService collectionService;
    private final CollectionModelAssembler collectionModelAssembler;

    @GetMapping()
    public CollectionModel<CollectionDto> getCollections(@PathVariable Long projectId) {
        List<CollectionDto> collections = collectionService.getAllCollectionsByProjectId(projectId);
        return collectionModelAssembler.toCollectionModel(collections);
    }

    @GetMapping("/{id}")
    public CollectionDto getCollection(@PathVariable Long projectId, @PathVariable Long id) {
        return collectionModelAssembler.toModel(collectionService.getOneById(projectId, id));
    }

    @PostMapping()
    public CollectionDto addCollection(@PathVariable Long projectId,
                                       @RequestBody Collection collection) {
        return collectionService.addCollection(projectId, collection);
    }

    @DeleteMapping("/{id}")
    public void deleteCollection(@PathVariable Long projectId,
                                 @PathVariable Long id) {
        collectionService.deleteCollection(id);
    }
}
