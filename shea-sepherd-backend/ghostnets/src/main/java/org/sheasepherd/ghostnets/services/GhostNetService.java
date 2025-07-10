package org.sheasepherd.ghostnets.services;

import org.sheasepherd.ghostnets.model.*;
import org.sheasepherd.ghostnets.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.NoSuchElementException;

@Service
public class GhostNetService {

    @Autowired
    private GhostNetRepository ghostNetRepository;

    @Autowired
    private PersonRepository personRepository;

    // 1. Geisternetz melden (anonym oder unter Angabe von Namen + Telefonnummer)
    public GhostNet reportGhostNet(GhostNet ghostNet) {
        ghostNet.setStatus(Status.GEMELDET);

        Person incomingReporter = ghostNet.getReporter();
        if (incomingReporter != null) {
            Person finalReporter;

            if (incomingReporter.isAnonymous()) {
                incomingReporter.setName("Anonym");
                incomingReporter.setPhoneNumber("");
                incomingReporter.setRole(PersonRoles.MELDENDE_PERSON);
                    finalReporter = personRepository.save(incomingReporter);
            } else {
                Optional<Person> existing = personRepository.findByNameAndPhoneNumber(incomingReporter.getName(), incomingReporter.getPhoneNumber());

                if (existing.isPresent()) {
                    finalReporter = existing.get();
                } else {
                    incomingReporter.setRole(PersonRoles.MELDENDE_PERSON);
                    finalReporter = personRepository.save(incomingReporter);
                }
            }
            ghostNet.setReporter(finalReporter);
        } else {
            throw new IllegalArgumentException("Reporter darf nicht null sein");
        }

        return ghostNetRepository.save(ghostNet);
    }

    // 2.1 Geisternetz zur Bergung übernehmen 
    public GhostNet claimGhostNet(Long netId, long personId) {
        GhostNet net = ghostNetRepository.findById(netId).orElseThrow(() -> new NoSuchElementException("Geisternetz mit ID" + netId + "wurde nicht gefunden"));
        Person person = personRepository.findById(personId).orElseThrow(() -> new NoSuchElementException("Person mit ID" + personId + "wurde nicht gefunden"));
        
        if (!person.isSalvager()) {
            throw new IllegalArgumentException("Nur bergende Personen dürfen Netze übernehmen.");
        }

        if (net.getSalvager() != null) {
            throw new IllegalStateException("Dieses Geisternetz wurde bereits von einer anderen Person zur Bergung übernommen");
        }

        if (net.getStatus() != Status.GEMELDET) {
            throw new IllegalStateException("Geisternetz befindet sich nicht im Status GEMELDET");
        }

        net.setSalvager(person);
        net.setStatus(Status.BERGUNG_BEVORSTEHEND);
        return ghostNetRepository.save(net);
    }

    // 2.2 Geisternetz nicht mehr zur Bergung übernehmen
    public GhostNet unclaimGhostNet(Long netId, long personId) {
        GhostNet net = ghostNetRepository.findById(netId).orElseThrow(() -> new NoSuchElementException("Geisternetz mit Id " + netId + " wurde nicht gefunden"));

        if (net.getSalvager() == null) {
            throw new IllegalStateException("Dieses Geisternetz ist aktuell niemandem zur Bergung zugewiesen");
        }

        if (net.getStatus() != Status.BERGUNG_BEVORSTEHEND) {
            throw new IllegalStateException("Dieses Geisternetz befindet sich nicht im Status BERGUNG_BEVORSTEHEND");
        }

        if (!net.getSalvager().getId().equals(personId)) {
            throw new IllegalArgumentException("Diese Person ist nicht berechtigt, das Geisternetz von der Bergung zurückzuziehen");
        }

        net.setSalvager(null);
        net.setStatus(Status.GEMELDET);
        return ghostNetRepository.save(net);
    }

    // 4. Geisternetz als geborgen melden
    public GhostNet markAsRecovered(Long netId, Long personId) {
        GhostNet net = ghostNetRepository.findById(netId).orElseThrow(() -> new NoSuchElementException("Geisternetz mit Id " + netId + " wurde nciht gefunden"));
        
        if (net.getSalvager() == null) {
            throw new IllegalArgumentException("Dieses Geisternetz ist aktuell niemandem zur Bergung zugewiesen");
        }

        if (!net.getSalvager().getId().equals(personId)) {
            throw new IllegalArgumentException("Nur die zugewiesene Person darf das Geisternetz als geborgen markieren");
        }

        if (net.getStatus() != Status.BERGUNG_BEVORSTEHEND) {
            throw new IllegalStateException("Dieses Geisternetz befindet sich nicht im Status BERGUNG_BEVORSTEHEND");
        }

        net.setStatus(Status.GEBORGEN);
        return ghostNetRepository.save(net);
    }

    //3., 5. Rückgabe aller Netze, die noch zu bergen sind
    public List <GhostNet> getUnsalvagedGhostNets() {
        return ghostNetRepository.findAllUnsalvaged();
    }
    
}
