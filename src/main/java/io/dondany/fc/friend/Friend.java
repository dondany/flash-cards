package io.dondany.fc.friend;

import io.dondany.fc.friend.model.FriendStatus;
import io.dondany.fc.user.User;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

@Entity
public class Friend {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private User friendOne;

    @ManyToOne
    private User friendTwo;

    @Enumerated(EnumType.STRING)
    private FriendStatus status;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getFriendOne() {
        return friendOne;
    }

    public void setFriendOne(User friendOne) {
        this.friendOne = friendOne;
    }

    public User getFriendTwo() {
        return friendTwo;
    }

    public void setFriendTwo(User friendTwo) {
        this.friendTwo = friendTwo;
    }

    public FriendStatus getStatus() {
        return status;
    }

    public void setStatus(FriendStatus status) {
        this.status = status;
    }
}
