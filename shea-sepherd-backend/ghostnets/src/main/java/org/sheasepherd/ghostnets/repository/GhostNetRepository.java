package org.sheasepherd.ghostnets.repository;

import org.sheasepherd.ghostnets.model.GhostNet;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface GhostNetRepository extends JpaRepository<GhostNet, Long> {
    @Query("SELECT n FROM GhostNet n WHERE n.status = 'GEMELDET' OR n.status = 'BERGUNG_BEVORSTEHEND'")
    List<GhostNet> findAllUnsalvaged();
}
