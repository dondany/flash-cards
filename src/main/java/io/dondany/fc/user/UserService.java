package io.dondany.fc.user;

import io.dondany.fc.user.model.UserDto;
import io.dondany.fc.user.model.UserMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public List<UserDto> getUsersByFirstname(String name){
        return userRepository.findByFirstnameContainingIgnoreCase(name)
                .stream()
                .map(UserMapper.INSTANCE::map)
                .toList();
    }
}
