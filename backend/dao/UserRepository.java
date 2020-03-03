package uglyface.backend.dao;

import org.springframework.data.domain.Example;
import org.springframework.data.jpa.repository.JpaRepository;
import uglyface.backend.model.User;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User,Long> {
    Optional<User> findOneByEmailAndPassword(String email, String password);
    User findOneByEmail(String email);
}
