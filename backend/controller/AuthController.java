package uglyface.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.HttpClientErrorException;
import uglyface.backend.dao.UserRepository;
import uglyface.backend.model.User;
import uglyface.backend.security.JwtTokenProvider;

import java.util.HashMap;
import java.util.Optional;

@CrossOrigin
@RestController
public class AuthController {

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    UserRepository userRepository;

    @PostMapping("/auth/login")
    public Object login(
            @RequestBody LoginBody body
    ) {
        Optional<User> user = userRepository.findOneByEmailAndPassword(body.email, body.password);

        if (!user.isPresent()) {
            return ResponseEntity.badRequest().body("user email and password mismatch");
        }


        try {
            String token = jwtTokenProvider.createToken(user.get());
            HashMap<String, Object> result = new HashMap<>();
            result.put("user", user);
            result.put("token", token);
            return result;
        } catch (AuthenticationException e) {
            throw new RuntimeException("Invalid username/password supplied");
        }


    }

    @PostMapping("/auth/signup")
    public Object register(@RequestBody User user) {
        User existingUser = userRepository.findOneByEmail(user.getEmail());
        if (existingUser != null) {
            throw new RuntimeException("email already exists");
        } else {
            String token = jwtTokenProvider.createToken(user);

            HashMap<String, Object> result = new HashMap<>();
            result.put("user", userRepository.save(user));
            result.put("token", token);
            return result;

        }
    }

    public static class LoginBody {
        public String email;
        public String password;
    }
}
