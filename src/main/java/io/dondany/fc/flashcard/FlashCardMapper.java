package io.dondany.fc.flashcard;

import org.springframework.stereotype.Component;

import java.util.function.Function;

@Component
public class FlashCardMapper implements Function<FlashCard, FlashCardDto> {

    @Override
    public FlashCardDto apply(FlashCard flashCard) {
        return FlashCardDto.builder()
                .id(flashCard.getId())
                .front(flashCard.getFront())
                .back(flashCard.getBack())
                .build();
    }
}
