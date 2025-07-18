package com.quest_ai.server.repo;

import com.quest_ai.server.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    boolean existsByMail(String mail);
    boolean existsByUserName(String username);
    Optional<User> findByUserName(String username);
    Optional<User> findByMail(String mail);
}
