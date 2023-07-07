package io.dondany.fc.practice;

import io.dondany.fc.flashcard.FlashCardDto;
import io.dondany.fc.practice.model.CreatePracticeDto;
import io.dondany.fc.practice.model.PracticeDto;
import io.dondany.fc.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/practices")
@RequiredArgsConstructor
public class PracticeController {
    private final PracticeService practiceService;

    @GetMapping
    public List<PracticeDto> getPractices(@AuthenticationPrincipal User user) {
        return practiceService.getAllPractices(user);
    }

    @PostMapping
    public PracticeDto addPractice(@AuthenticationPrincipal User user,
                                   @RequestBody CreatePracticeDto createPracticeDto) {
        return practiceService.addPractice(createPracticeDto, user);
    }

    @GetMapping("/{id}/flash-cards")
    public List<FlashCardDto> getFlashCards(@PathVariable  long id) {
        return practiceService.getFlashCards(id);
    }
}
