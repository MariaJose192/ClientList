package com.springboot.backend.maria.userapp.userappbackend.controllers;

import org.springframework.web.bind.annotation.RestController;

import com.springboot.backend.maria.userapp.userappbackend.entities.User;
import com.springboot.backend.maria.userapp.userappbackend.services.UserService;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PutMapping;


@CrossOrigin(origins = {"http://localhost:4200"})
@RestController
@RequestMapping("/api/users")
public class UserController {

    private UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping()
    public List<User> list() {
        return userService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getUserById(@PathVariable Long id) {
        Optional<User> user = userService.findById(id);

        if (user.isPresent()) {
            return ResponseEntity.status(HttpStatus.OK).body(user.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Collections.singletonMap("error", "No se encontró el usuario con ID: " + id));
        }
    }

    @PostMapping()
    public ResponseEntity<User> createUser(@RequestBody User user) {
        return ResponseEntity.status(HttpStatus.CREATED).body(userService.save(user));
    }

    @PutMapping("/{id}")
    public ResponseEntity<User> UpdateUser(@PathVariable Long id, @RequestBody User user) {
        Optional<User> userOptional = userService.findById(id);
        if (userOptional.isPresent()) {
            User userDB = userOptional.get();
            userDB.setName(user.getName());
            userDB.setLastname(user.getLastname());
            userDB.setEmail(user.getEmail());
            userDB.setUsername(user.getUsername());
            userDB.setPassword(user.getPassword());
            userDB.setImage(user.getImage());
            return ResponseEntity.ok(userService.save(userDB));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        Optional<User> userOptional = userService.findById(id);
        if (userOptional.isPresent()) {
            userService.deleteById(id);
            return ResponseEntity.noContent().build();

        } else {
            return ResponseEntity.notFound().build();

        }

    }
}
