package io.dondany.flashcards;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DatabaseLoader {

    @Bean
    CommandLineRunner initDatabase(FlashCardRepository repository) {
        return args -> {
          repository.save(new FlashCard("ja", "io"));
          repository.save(new FlashCard("ty", "tu"));
          repository.save(new FlashCard("on, ona, Pan/Pani", "lei, lui, Lei"));
          repository.save(new FlashCard("my", "noi"));
          repository.save(new FlashCard("wy", "voi"));
          repository.save(new FlashCard("oni, Państwo", "loro, Loro"));
          repository.save(new FlashCard("być", "essere|io sono|tu sei|lei,lui,Lei e'|noi siamo|voi siete|loro,Loro sono"));
        };
    }

}
