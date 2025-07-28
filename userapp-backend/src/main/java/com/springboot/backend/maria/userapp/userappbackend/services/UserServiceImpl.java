package com.springboot.backend.maria.userapp.userappbackend.services;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.springboot.backend.maria.userapp.userappbackend.entities.User;
import com.springboot.backend.maria.userapp.userappbackend.repositories.UserRepository;

@Service
public class UserServiceImpl implements UserService {

    private UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    @Transactional(readOnly = true)
public List<User> findAll() {
    Iterable<User> iterable = userRepository.findAll();
    return StreamSupport
            .stream(iterable.spliterator(), false)
            .collect(Collectors.toList());
}


    @Override
    @Transactional(readOnly = true)
    public Optional<User> findById(Long id) {
        return userRepository.findById(id);
    }


    @Override
    @Transactional
    public User save(User user) {
        return userRepository.save(user);

    }

    @Override
    @Transactional
    public void deleteById(Long id) {
        userRepository.deleteById(id);
        
    }


}
