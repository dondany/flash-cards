package io.dondany.fc.flashcard;

import org.springframework.stereotype.Component;

import java.util.function.Function;

@Component
public class FlashCardMapper implements Function<FlashCard, FlashCardModel> {

    @Override
    public FlashCardModel apply(FlashCard flashCard) {
        return FlashCardModel.builder()
                .id(flashCard.getId())
                .front(flashCard.getFront())
                .back(flashCard.getBack())
                .build();
    }
}
