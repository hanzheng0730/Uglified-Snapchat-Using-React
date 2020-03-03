package uglyface.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;

@Entity(name="article")
public class Article extends AuditModel {

    @Id
    @GeneratedValue()
    @SequenceGenerator(
            name = "article_generator",
            sequenceName = "article_sequence",
            initialValue = 1
    )
    Long id;

    @Column
    private String title;

    @Column(columnDefinition = "TEXT")
    private String img;


    @Column(columnDefinition = "TEXT default '[]'")
    private String comments;


    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
    private User user;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getImg() {
        return img;
    }

    public void setImg(String img) {
        this.img = img;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getComments() {
        return comments;
    }

    public void setComments(String comments) {
        this.comments = comments;
    }
}
