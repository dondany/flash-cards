package io.dondany.fc.user;

import io.dondany.fc.user.model.UserDto;
import io.dondany.fc.user.model.UserMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class UserController {

    @GetMapping()
    public UserDto getAuthenticatedUser(@AuthenticationPrincipal User user) {
        return UserMapper.INSTANCE.map(user);
    }
}
