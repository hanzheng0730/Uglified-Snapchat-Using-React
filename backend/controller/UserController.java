package uglyface.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import uglyface.backend.dao.UserRepository;
import uglyface.backend.model.User;

import java.util.List;

@CrossOrigin
@RestController()

public class UserController {

    @Autowired
    UserRepository userRepository;

    @GetMapping("/users")
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_CLIENT')")
    public List<User> list(){
        return this.userRepository.findAll();
    }

    @PostMapping("/users")
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_CLIENT')")
    public User add(@RequestBody User user){
        return this.userRepository.save(user);
    }

    @PutMapping("/users")
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_CLIENT')")
    public User put(@RequestBody User user) {
        User targetUser = this.userRepository.findById(user.getId()).get();
        targetUser.setFaces(user.getFaces());

        if (user.isKing()){
            this.userRepository.findAll().stream().forEach(u->{
                u.setKing(false);
                this.userRepository.save(u);
            });
        }
        targetUser.setKing(user.isKing());
        return this.userRepository.save(targetUser);
    }
}
