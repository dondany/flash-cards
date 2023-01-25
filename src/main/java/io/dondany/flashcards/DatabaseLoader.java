package io.dondany.flashcards;

import io.dondany.flashcards.collection.Collection;
import io.dondany.flashcards.collection.CollectionRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.ArrayList;

@Configuration
public class DatabaseLoader {

    @Bean
    CommandLineRunner initDatabase(FlashCardRepository repository, CollectionRepository collectionRepository) {
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
            collection.addFlashCard(new FlashCard("kupować", "comprare"));
            collection.addFlashCard(new FlashCard("znać", "conoscere"));
            collection.addFlashCard(new FlashCard("kończyć", "finire"));

            collectionRepository.save(collection);

            Collection collection2 = Collection.builder()
                    .name("Lezione 2")
                    .description("Słówka z lekcji 2.")
                    .build();

            collectionRepository.save(collection2);
        };
    }

}
