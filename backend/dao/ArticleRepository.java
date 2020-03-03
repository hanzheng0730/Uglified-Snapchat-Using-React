package uglyface.backend.dao;


import org.springframework.data.jpa.repository.JpaRepository;
import uglyface.backend.model.Article;

public interface ArticleRepository extends JpaRepository<Article,Long> {

}
