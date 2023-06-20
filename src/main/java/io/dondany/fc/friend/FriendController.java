package io.dondany.fc.friend;

import io.dondany.fc.friend.model.AddFriendDto;
import io.dondany.fc.friend.model.FriendInfoDto;
import io.dondany.fc.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/friends")
@RequiredArgsConstructor
public class FriendController {

    private final FriendService friendService;

    @GetMapping
    public List<FriendInfoDto> getFriends(@AuthenticationPrincipal User user) {
        return friendService.getFriends(user);
    }

    @PostMapping
    public FriendInfoDto addFriend(@AuthenticationPrincipal User user, @RequestBody AddFriendDto addFriendDto) {
        return friendService.addFriend(user, addFriendDto);
    }

    @PatchMapping("/{id}/accept")
    public FriendInfoDto acceptFriend(@AuthenticationPrincipal User user,
                                      @PathVariable long id) {
        return friendService.acceptFriend(user, id);
    }

    @PatchMapping("/{id}/reject")
    public FriendInfoDto rejectFriend(@AuthenticationPrincipal User user,
                                      @PathVariable long id) {
        return friendService.rejectFriend(user, id);
    }

    @DeleteMapping("/{id}")
    public void deleteFriend(@AuthenticationPrincipal User user,
                             @PathVariable long id) {
        friendService.deleteFriend(user, id);
    }
}
