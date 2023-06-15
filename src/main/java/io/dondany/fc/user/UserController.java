package io.dondany.fc.user;

import io.dondany.fc.user.model.UserDto;
import io.dondany.fc.user.model.UserMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping()
    public UserDto getAuthenticatedUser(@AuthenticationPrincipal User user) {
        return UserMapper.INSTANCE.map(user);
    }

    @GetMapping(params = { "firstname" })
    public List<UserDto> getUsersByFristname(@RequestParam String firstname) {
        return userService.getUsersByFirstname(firstname);
    }
}
