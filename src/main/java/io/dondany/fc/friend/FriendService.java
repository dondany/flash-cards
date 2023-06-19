package io.dondany.fc.friend;

import io.dondany.fc.friend.model.AddFriendDto;
import io.dondany.fc.friend.model.FriendInfoDto;
import io.dondany.fc.friend.model.FriendInfoMapper;
import io.dondany.fc.notification.NotificationService;
import io.dondany.fc.notification.model.FriendNotificationPayload;
import io.dondany.fc.user.User;
import io.dondany.fc.user.UserRepository;
import io.dondany.fc.user.model.UserMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FriendService {

    private final FriendRepository friendRepository;
    private final UserRepository userRepository;

    private final NotificationService notificationService;

    /**
     * Get all friends of a user
     *
     * @param user user
     * @return friends
     */
    public List<FriendInfoDto> getFriends(User user) {
        return friendRepository.findAllByFriendOneOrFriendTwo(user, user)
                .stream()
                .map(friend -> mapFriendToFriendDto(user, friend))
                .toList();
    }

    @Transactional
    public FriendInfoDto addFriend(User userOne, AddFriendDto addFriendDto) {
        if (userOne.getId().equals(addFriendDto.getUserId())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "A user can't befriend himself!");
        }
        User userTwo = userRepository.findById(addFriendDto.getUserId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        Friend friend = new Friend();
        friend.setFriendOne(userOne);
        friend.setFriendTwo(userTwo);


        FriendInfoDto friendInfoDto = FriendInfoMapper.INSTANCE.map(friendRepository.save(friend));
        createFriendNotification(friend);
        return friendInfoDto;
    }

    private void createFriendNotification(Friend friend) {
        notificationService.createNotification(
                friend.getFriendTwo(),
                String.format("User %s added You as a friend!", friend.getFriendOne().getUsername()),
                "friend-request",
                new FriendNotificationPayload(friend.getId())
        );
    }

    private FriendInfoDto mapFriendToFriendDto(User user, Friend friend) {
        FriendInfoDto dto = new FriendInfoDto();
        dto.setId(friend.getId());
        if (user.equals(friend.getFriendOne())) {
            dto.setFriend(UserMapper.INSTANCE.map(friend.getFriendTwo()));
        } else {
            dto.setFriend(UserMapper.INSTANCE.map(friend.getFriendOne()));
        }
        return dto;
    }
}
