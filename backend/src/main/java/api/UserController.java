package api;

import dao.UserDAO;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import repository.UserRepository;

import java.util.List;

@RestController
@RequestMapping("/api")
public class UserController {

    private UserRepository repository;

    public UserController(UserRepository repo) {
        this.repository = repo;
    }

    @GetMapping("users")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public List<UserDAO> getUserInfoByUserName(Authentication authentication) {
        return repository.getEnabledUsers();
    }

    @GetMapping("users/{username}")
    @PreAuthorize("#username == authentication.name || hasRole('ROLE_ADMIN')")
    public UserDAO getUserInfoByUserName(@PathVariable String username, Authentication authentication) {
        return repository.getUser(username);
    }
}
