package repository;

import dao.UserDAO;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import models.User;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class UserRepository {

    @PersistenceContext
    private EntityManager em;

    public UserDAO getUser(String username) {
        var query = em.createQuery("select u from User u where u.username = :uname", User.class);
        query.setParameter("uname", username);
        return cleanUserData(query.getSingleResult());
    }

    public List<UserDAO> getEnabledUsers() {
        return cleanUsersDataList(em.createQuery("select u from User u", User.class).getResultList());
    }

    private List<UserDAO> cleanUsersDataList(List<User> users) {
        return users.stream().map(user -> new UserDAO(user.getUsername(), user.getFirstname())).toList();
    }

    private UserDAO cleanUserData(User user) {
        return new UserDAO(user.getUsername(), user.getFirstname());
    }
}
