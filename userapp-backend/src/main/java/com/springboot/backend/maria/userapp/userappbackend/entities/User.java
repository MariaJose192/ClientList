package com.springboot.backend.maria.userapp.userappbackend.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;

import static jakarta.persistence.GenerationType.IDENTITY;

import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "users")
public class User {

  @Id
  @GeneratedValue(strategy = IDENTITY)
  private Long id;

  private String name;
  private String lastname;
  private String email;
  private String username;
  private String password;
  private String address;
  private String phone;
  //private String role;
  private String image;

  // Constructores
  public User() {
  }

  public User(Long id, String name, String lastname, String email, String username, String password, String address, String phone, String image) {
    this.id = id;
    this.name = name;
    this.lastname = lastname;
    this.email = email;
    this.username = username;
    this.password = password;
    this.address = address;
    this.phone = phone;
    this.image = image;
  }

  // Getters y Setters
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

  public String getLastname() {
    return lastname;
  }

  public void setLastname(String lastname) {
    this.lastname = lastname;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public String getUsername() {
    return username;
  }

  public void setUsername(String username) {
    this.username = username;
  }

  public String getPassword() {
    return password;
  }

  public void setPassword(String password) {
    this.password = password;
  }

  public String getImage() {
    return image;
  }

  public void setImage(String image) {
    this.image = image;
  }

  public String getAddress() {
    return address;
  }

  public void setAddress(String address) {
    this.address = address;
  }

  public String getPhone() {
    return phone;
  }

  public void setPhone(String phone) {
    this.phone = phone;
  }
}
