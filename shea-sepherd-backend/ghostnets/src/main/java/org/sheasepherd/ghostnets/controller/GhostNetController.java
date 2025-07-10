package org.sheasepherd.ghostnets.controller;

import org.sheasepherd.ghostnets.model.*;
import org.sheasepherd.ghostnets.services.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

import java.util.List;

@RestController
@RequestMapping("/ghostnets")
public class GhostNetController {

    @Autowired
    private GhostNetService ghostNetService;

    // 1. Geisternetz melden (anonym oder mit meldender Person)
    @PostMapping("/report")
    public GhostNet reportGhostNet(@Valid @RequestBody GhostNet ghostNet) {
        return ghostNetService.reportGhostNet(ghostNet);
    }

    // 2.1 Geisternetz zur Bergung übernehmen
    @PutMapping("/{id}/claim")
    public GhostNet claimGhostNet(@PathVariable("id") Long netId, @RequestParam Long personId) {
        return ghostNetService.claimGhostNet(netId, personId);
    }

    // 2.2 Geisternetz nicht mehr zur Bergung übernehmen
    @PutMapping("/{id}/unclaim")
    public GhostNet unclaimGhostNet(@PathVariable("id") Long netId, @RequestParam Long personId) {
        return ghostNetService.unclaimGhostNet(netId, personId);
    }

    // 4. Geisternetz als geborgen melden
    @PutMapping("/{id}/recover")
    public GhostNet markAsRecovered(@PathVariable("id") Long netId, @RequestParam Long personId) {
        return ghostNetService.markAsRecovered(netId, personId);
    }

    // 3., 5. Rückgabe aller Netze, die noxh zu bergen sind
    @GetMapping("/open")
    public List<GhostNet> getUnsalvagedGhostNets() {
        return ghostNetService.getUnsalvagedGhostNets();
    }

}
