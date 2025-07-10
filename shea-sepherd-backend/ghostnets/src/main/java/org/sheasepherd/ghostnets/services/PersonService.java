package org.sheasepherd.ghostnets.services;

import org.sheasepherd.ghostnets.model.Person;
import org.sheasepherd.ghostnets.model.PersonRoles;
import org.sheasepherd.ghostnets.repository.PersonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

// Login oder Registrierung
@Service
public class PersonService {
    
    @Autowired
    private PersonRepository personRepository;

    public Person loginOrRegister(Person loginData) {
        if (loginData.getName() == null || loginData.getPhoneNumber() == null) {
            throw new IllegalArgumentException("Name und Telefonnummer dürfen nicht null sein");
        }
        
        return personRepository.findByNameAndPhoneNumber(loginData.getName(), loginData.getPhoneNumber())
        .map(existingPerson -> {
            if (!PersonRoles.BERGENDE_PERSON.equals(existingPerson.getRole())) {
                existingPerson.setRole(PersonRoles.BERGENDE_PERSON);
                return personRepository.save(existingPerson);
            }
            return existingPerson;
        })
        .orElseGet(() -> {
            loginData.setAnonymous(false);
            loginData.setRole(PersonRoles.BERGENDE_PERSON);
            return personRepository.save(loginData);
        });
    }
}