package org.sheasepherd.ghostnets.controller;

import org.sheasepherd.ghostnets.model.Person;
import org.sheasepherd.ghostnets.services.PersonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/persons")
public class PersonController {

    @Autowired
    private PersonService personService;

    // Login oder Regsitrierung
    @PostMapping("/login")
    public Person loginOrRegister(@Valid @RequestBody Person loginData) {
        return personService.loginOrRegister(loginData);
    }
}