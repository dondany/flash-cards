package io.dondany.fc;

import io.dondany.fc.collection.Collection;
import io.dondany.fc.collection.CollectionRepository;
import io.dondany.fc.flashcard.FlashCard;
import io.dondany.fc.flashcard.FlashCardRepository;
import io.dondany.fc.project.Project;
import io.dondany.fc.project.ProjectRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.ArrayList;

@Configuration
public class DatabaseLoader {

    @Bean
    CommandLineRunner initDatabase(FlashCardRepository repository, CollectionRepository collectionRepository, ProjectRepository projectRepository) {
        return args -> {
            Collection collection = Collection.builder()
                    .name("Lezione 1")
                    .description("Słówka z pierwszej lekcji")
                    .flashCards(new ArrayList<>())
                    .build();
            
            collection.addFlashCard(new FlashCard("być", "essere"));
            collection.addFlashCard(new FlashCard("mieć", "avere"));
            collection.addFlashCard(new FlashCard("móc", "potere"));
            collection.addFlashCard(new FlashCard("robić", "fare"));
            collection.addFlashCard(new FlashCard("mówić", "dire"));
            collection.addFlashCard(new FlashCard("przyjść", "venire"));
            collection.addFlashCard(new FlashCard("musieć", "dovere"));
            collection.addFlashCard(new FlashCard("dawać", "dare"));
            collection.addFlashCard(new FlashCard("iść", "andare"));
            collection.addFlashCard(new FlashCard("widzieć", "vedere"));

            collection.addFlashCard(new FlashCard("żyć", "mieszkać"));
            collection.addFlashCard(new FlashCard("rozumieć", "capire"));
            collection.addFlashCard(new FlashCard("przybywać", "arrivare"));
            collection.addFlashCard(new FlashCard("czekać", "aspettare"));
            collection.addFlashCard(new FlashCard("pić", "bere"));
            collection.addFlashCard(new FlashCard("pytać", "chiedere"));
            collection.addFlashCard(new FlashCard("zaczynać", "cominciare"));

            Collection collection2 = Collection.builder()
                    .name("Lezione 2")
                    .description("Słówka z lekcji 2.")
                    .flashCards(new ArrayList<>())
                    .build();

            collection2.addFlashCard(new FlashCard("kupować", "comprare"));
            collection2.addFlashCard(new FlashCard("znać", "conoscere"));
            collection2.addFlashCard(new FlashCard("kończyć", "finire"));

            Collection collection3 = Collection.builder()
                    .name("Lezione 3")
                    .description("Słówka z lekcji 3.")
                    .flashCards(new ArrayList<>())
                    .build();

            Collection collection4 = Collection.builder()
                    .name("I verbi")
                    .description("Czasowniki")
                    .flashCards(new ArrayList<>())
                    .build();

            Project project = Project.builder()
                    .name("Italiano")
                    .description("L'italiano e' fantastico!")
                    .collections(new ArrayList<>())
                    .build();
            project.addCollection(collection);
            project.addCollection(collection2);
            project.addCollection(collection3);
            project.addCollection(collection4);

            projectRepository.save(project);
        };
    }

}
