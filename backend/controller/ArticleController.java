package uglyface.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import uglyface.backend.dao.ArticleRepository;
import uglyface.backend.dao.UserRepository;
import uglyface.backend.model.Article;
import uglyface.backend.model.User;

import javax.websocket.server.PathParam;
import java.util.List;
import java.util.Optional;

@CrossOrigin
@RestController()
public class ArticleController {

    @Autowired
    ArticleRepository articleRepository;

    @Autowired
    UserRepository userRepository;

    @GetMapping("/articles")
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_CLIENT')")
    public List<Article> list() {
        return articleRepository.findAll();
    }

    @PostMapping("/users/{userId}/articles")
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_CLIENT')")
    public Article post(
            @RequestBody Article article,
            @PathVariable("userId") Long userId
    ) {
        User user = userRepository.findById(userId).get();
        article.setUser(user);
        return articleRepository.save(article);
    }

    @DeleteMapping("/articles/{articleId}")
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_CLIENT')")
    public ResponseEntity<?> delete(@PathVariable("articleId") Long id) {
        articleRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/articles")
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_CLIENT')")
    public Article put(@RequestBody Article article) {
        Article targetArticle = articleRepository.findById(article.getId()).get();
        targetArticle.setComments(article.getComments());
        return articleRepository.save(targetArticle);
    }

}
