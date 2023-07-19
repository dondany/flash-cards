package io.dondany.fc.practice;

import io.dondany.fc.collection.Collection;
import io.dondany.fc.collection.CollectionDto;
import io.dondany.fc.collection.CollectionRepository;
import io.dondany.fc.collection.CollectionService;
import io.dondany.fc.flashcard.FlashCardDto;
import io.dondany.fc.flashcard.FlashCardMapper;
import io.dondany.fc.flashcard.FlashCardService;
import io.dondany.fc.practice.model.CreatePracticeDto;
import io.dondany.fc.practice.model.PracticeDto;
import io.dondany.fc.practice.model.PracticeMapper;
import io.dondany.fc.project.Project;
import io.dondany.fc.project.ProjectRepository;
import io.dondany.fc.project.ProjectService;
import io.dondany.fc.project.model.ProjectDto;
import io.dondany.fc.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PracticeService {

    private final PracticeRepository practiceRepository;
    private final CollectionRepository collectionRepository;
    private final ProjectRepository projectRepository;

    private final FlashCardService flashCardService;
    private final FlashCardMapper flashCardMapper;

    public List<PracticeDto> getAllPractices(User user) {
        return practiceRepository
                .findAllByOwner(user)
                .stream()
                .map(PracticeMapper.INSTANCE::map)
                .toList();
    }

    public PracticeDto getPractice(Long id, User user) {
        Practice practice = practiceRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        if (!user.equals(practice.getOwner())) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN);
        }
        return PracticeMapper.INSTANCE.map(practice);
    }

    public PracticeDto addPractice(CreatePracticeDto createPracticeDto, User user) {
        Project project = projectRepository.findById(createPracticeDto.getProjectId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        List<Collection> collections = collectionRepository.findAllByIdIn(createPracticeDto.getCollectionIds());

        Practice practice = new Practice();
        practice.setName(createPracticeDto.getName());
        practice.setDescription(createPracticeDto.getDescription());
        practice.setType(createPracticeDto.getType());
        practice.setOwner(user);
        practice.setProject(project);
        practice.setCollections(collections);
        return PracticeMapper.INSTANCE.map(practiceRepository.save(practice));
    }

    public List<FlashCardDto> getFlashCards(long id) {
        Practice practice = practiceRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        List<Collection> collections = practice.getCollections();

        return collections.stream()
                .map(Collection::getFlashCards)
                .flatMap(java.util.Collection::stream)
                .map(flashCardMapper)
                .toList();
    }
}
