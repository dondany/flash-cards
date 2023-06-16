package io.dondany.fc.friend;

import io.dondany.fc.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FriendRepository extends JpaRepository<Friend, Long> {

    /**
     * Finds all friends for two users
     *
     * @param userOne friendOne role
     * @param userTwo friendTwo role
     * @return friends
     */
    List<Friend> findAllByFriendOneOrFriendTwo(User userOne, User userTwo);
}
