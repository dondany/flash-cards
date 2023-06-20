package io.dondany.fc.friend;

import io.dondany.fc.friend.model.AddFriendDto;
import io.dondany.fc.friend.model.FriendInfoDto;
import io.dondany.fc.friend.model.FriendInfoMapper;
import io.dondany.fc.friend.model.FriendStatus;
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
        friend.setStatus(FriendStatus.PENDING);

        FriendInfoDto friendInfoDto = FriendInfoMapper.INSTANCE.map(friendRepository.save(friend));
        createFriendRequestNotification(friend);
        return friendInfoDto;
    }

    @Transactional
    public FriendInfoDto acceptFriend(User user, long id) {
        Friend friend = friendRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        if (!friend.getFriendTwo().equals(user)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, String.format("User %s is not allowed to accept this request", user.getUsername()));
        }
        if (!FriendStatus.PENDING.equals(friend.getStatus())) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, String.format("User %s is not allowed to accept this request because it's not pending", user.getUsername()));
        }

        friend.setStatus(FriendStatus.ACCEPTED);
        createFriendAcceptedNotification(friend);
        return FriendInfoMapper.INSTANCE.map(friend);
    }

    @Transactional
    public FriendInfoDto rejectFriend(User user, long id) {
        Friend friend = friendRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        if (!friend.getFriendTwo().equals(user)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, String.format("User %s is not allowed to accept this request", user.getUsername()));
        }
        if (!FriendStatus.PENDING.equals(friend.getStatus())) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, String.format("User %s is not allowed to reject this request because it's not pending", user.getUsername()));
        }
        friend.setStatus(FriendStatus.REJECTED);
        createFriendRejectedNotification(friend);
        return FriendInfoMapper.INSTANCE.map(friend);
    }

    private FriendInfoDto mapFriendToFriendDto(User user, Friend friend) {
        FriendInfoDto dto = new FriendInfoDto();
        dto.setId(friend.getId());
        if (user.equals(friend.getFriendOne())) {
            dto.setFriend(UserMapper.INSTANCE.map(friend.getFriendTwo()));
            dto.setInitiator(true);
        } else {
            dto.setInitiator(false);
            dto.setFriend(UserMapper.INSTANCE.map(friend.getFriendOne()));
        }
        dto.setStatus(friend.getStatus());
        return dto;
    }

    public void deleteFriend(User user, long id) {
        Friend friend = friendRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        if (!friend.getFriendOne().equals(user) && !friend.getFriendTwo().equals(user)) {
            throw new ResponseStatusException(
                    HttpStatus.FORBIDDEN,
                    String.format("User %s is not allowed to delete a friend if he's not part of the relationship", user.getUsername())
            );
        }

        friendRepository.delete(friend);
    }

    private void createFriendRequestNotification(Friend friend) {
        notificationService.createNotification(
                friend.getFriendTwo(),
                String.format("User %s wants to add You as a friend!", friend.getFriendOne().getUsername()),
                "friend-request",
                new FriendNotificationPayload(friend.getId())
        );
    }

    private void createFriendAcceptedNotification(Friend friend) {
        notificationService.createNotification(
                friend.getFriendTwo(),
                String.format("User %s accepted your friend request!", friend.getFriendOne().getUsername()),
                "standard");
    }

    private void createFriendRejectedNotification(Friend friend) {
        notificationService.createNotification(
                friend.getFriendOne(),
                String.format("User %s rejected your friend request!", friend.getFriendTwo().getUsername()),
                "standard");
    }
}
