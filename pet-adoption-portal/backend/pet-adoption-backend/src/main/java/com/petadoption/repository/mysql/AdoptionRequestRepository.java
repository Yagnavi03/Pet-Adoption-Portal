package com.petadoption.repository.mysql;

import com.petadoption.entity.mysql.AdoptionRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface AdoptionRequestRepository extends JpaRepository<AdoptionRequest, Long> {
    List<AdoptionRequest> findByUserId(Long userId);
    List<AdoptionRequest> findByStatus(String status);
    List<AdoptionRequest> findByPetId(String petId);
    long countByStatus(String status);
}
