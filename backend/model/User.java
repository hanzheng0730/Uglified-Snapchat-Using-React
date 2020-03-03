package uglyface.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity(name = "user")
public class User extends AuditModel {
    @Id
    @GeneratedValue()
    @SequenceGenerator(
            name = "user_generator",
            sequenceName = "user_sequence",
            initialValue = 1
    )
    Long id;

    @Column
    String name;
    @Column
    String password;
    @Column(unique = true)
    String email;

    @Column
    String description;

    @Column(columnDefinition = "TEXT")
    String avator;
    @Column
    boolean isAdmin;

    @Column
    boolean isKing;


    @OneToMany(cascade = CascadeType.ALL,
            fetch = FetchType.LAZY,
            mappedBy = "user")
    private Set<Article> articles = new HashSet<>();


    @Column(columnDefinition = "TEXT default '[]'")
    String faces;

    @JsonIgnore
    public List<Role> getRoles(){
        if (isAdmin){

            return Arrays.asList(Role.ROLE_ADMIN);
        }
        else {
            return Arrays.asList(Role.ROLE_CLIENT);
        }
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getAvator() {
        return avator;
    }

    public void setAvator(String avator) {
        this.avator = avator;
    }

    public boolean getIsAdmin() {
        return isAdmin;
    }

    public void setIsAdmin(boolean isAdmin) {
        this.isAdmin = isAdmin;
    }

    public Set<Article> getArticles() {
        return articles;
    }

    public void setArticles(Set<Article> articles) {
        this.articles = articles;
    }

    public boolean isAdmin() {
        return isAdmin;
    }

    public void setAdmin(boolean admin) {
        isAdmin = admin;
    }

    public boolean isKing() {
        return isKing;
    }

    public void setKing(boolean king) {
        isKing = king;
    }

    public String getFaces() {
        return faces;
    }

    public void setFaces(String faces) {
        this.faces = faces;
    }
}
