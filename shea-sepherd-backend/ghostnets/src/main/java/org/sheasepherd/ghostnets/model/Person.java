package org.sheasepherd.ghostnets.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;

@Entity
public class Person {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Die Angabe eines Namens ist verplfichtend")
    private String name;

    @Pattern(regexp = "^$|\\+?[0-9]{7,}$", message = "Die Telefonnummer muss gültig formatiert sein ")
    private String phoneNumber;
    
    private boolean anonymous;
    
    @Enumerated(EnumType.STRING)
    private PersonRoles role;

    //Standard-Constructor
    public Person() {}

    //Getter & Setter
    public Long getId() { return id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getPhoneNumber() { return phoneNumber; }
    public void setPhoneNumber(String phoneNumber) { this.phoneNumber = phoneNumber; }

    public boolean isAnonymous() { return anonymous; }
    public void setAnonymous(boolean anonymous) { this.anonymous = anonymous; }

    public PersonRoles getRole() { return role; }
    public void setRole(PersonRoles role) { this.role = role; }

    //Hilfsmethoden
    public boolean isSalvager() {
        return this.role == PersonRoles.BERGENDE_PERSON;
    }

    public boolean isReporter() {
        return this.role == PersonRoles.MELDENDE_PERSON;
    }
}
