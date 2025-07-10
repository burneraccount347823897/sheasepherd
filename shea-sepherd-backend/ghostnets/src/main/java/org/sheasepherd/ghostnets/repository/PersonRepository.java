package org.sheasepherd.ghostnets.repository;

import org.sheasepherd.ghostnets.model.Person;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
import org.springframework.stereotype.Repository;

@Repository
public interface PersonRepository extends JpaRepository<Person, Long> {
    Optional<Person> findByNameAndPhoneNumber(String name, String phoneNumber);

}
