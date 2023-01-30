package io.dondany.fc.project;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class ProjectService {
    private final ProjectRepository projectRepository;
    private final ProjectModelAssembler projectModelAssembler;

    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }

    public Optional<Project> getProject(Long id) {
        return projectRepository.findById(id);
    }

    public ProjectDto addProject(Project project) {
        Project newProject = projectRepository.save(project);
        return projectModelAssembler.toModel(newProject);
    }

    public void deleteProject(Long id) {
        projectRepository.deleteById(id);
    }
}
