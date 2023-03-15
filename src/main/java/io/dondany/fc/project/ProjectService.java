package io.dondany.fc.project;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class ProjectService {
    private final ProjectRepository projectRepository;

    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }

    public Optional<Project> getProject(Long id) {
        return projectRepository.findById(id);
    }

    public Project addProject(Project project) {
        return projectRepository.save(project);
    }

    public void deleteProject(Long id) {
        projectRepository.deleteById(id);
    }

    @Transactional
    public Project updateProjectGeneralInfo(ProjectUpdateDto updateDto, Long id) {
        Optional<Project> existing = projectRepository.findById(id);
        if (existing.isEmpty()) {
            throw new IllegalArgumentException("Can't find updateDto with id  " + id);
        }

        Project toUpdate = existing.get();
        toUpdate.setName(updateDto.getName());
        toUpdate.setDescription(updateDto.getDescription());
        return toUpdate;
    }
}
