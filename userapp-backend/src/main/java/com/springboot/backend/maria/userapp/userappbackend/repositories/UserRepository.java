package com.springboot.backend.maria.userapp.userappbackend.repositories;

import org.springframework.data.repository.CrudRepository;
import com.springboot.backend.maria.userapp.userappbackend.entities.User;


public interface UserRepository extends CrudRepository<User,Long> {

    


}
