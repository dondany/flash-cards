package io.dondany.flashcards;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DatabaseLoader {

    @Bean
    CommandLineRunner initDatabase(FlashCardRepository repository) {
        return args -> {
            repository.save(new FlashCard("być", "essere"));
            repository.save(new FlashCard("mieć", "avere"));
            repository.save(new FlashCard("móc", "potere"));
            repository.save(new FlashCard("robić", "fare"));
            repository.save(new FlashCard("mówić", "dire"));
            repository.save(new FlashCard("przyjść", "venire"));
            repository.save(new FlashCard("musieć", "dovere"));
            repository.save(new FlashCard("dawać", "dare"));
            repository.save(new FlashCard("iść", "andare"));
            repository.save(new FlashCard("widzieć", "vedere"));

            repository.save(new FlashCard("żyć", "mieszkać"));
            repository.save(new FlashCard("rozumieć", "capire"));
            repository.save(new FlashCard("przybywać", "arrivare"));
            repository.save(new FlashCard("czekać", "aspettare"));
            repository.save(new FlashCard("pić", "bere"));
            repository.save(new FlashCard("pytać", "chiedere"));
            repository.save(new FlashCard("zaczynać", "cominciare"));
            repository.save(new FlashCard("kupować", "comprare"));
            repository.save(new FlashCard("znać", "conoscere"));
            repository.save(new FlashCard("kończyć", "finire"));
        };
    }

}
