package com.petadoption.service;

import com.petadoption.dto.AdoptionRequestDTO;
import com.petadoption.entity.mysql.AdoptionRequest;
import com.petadoption.exception.ResourceNotFoundException;
import com.petadoption.repository.mysql.AdoptionRequestRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class AdoptionService {

    private final AdoptionRequestRepository adoptionRequestRepository;
    private final PetService petService;

    public AdoptionService(AdoptionRequestRepository adoptionRequestRepository, PetService petService) {
        this.adoptionRequestRepository = adoptionRequestRepository;
        this.petService = petService;
    }

    public AdoptionRequestDTO submitRequest(AdoptionRequest request) {
        request.setStatus("PENDING");
        request.setRequestDate(LocalDateTime.now());
        return toDTO(adoptionRequestRepository.save(request));
    }

    public List<AdoptionRequestDTO> getAllRequests() {
        return adoptionRequestRepository.findAll().stream()
                .map(this::toDTO).collect(Collectors.toList());
    }

    public List<AdoptionRequestDTO> getRequestsByUser(Long userId) {
        return adoptionRequestRepository.findByUserId(userId).stream()
                .map(this::toDTO).collect(Collectors.toList());
    }

    public List<AdoptionRequestDTO> getRequestsByStatus(String status) {
        return adoptionRequestRepository.findByStatus(status).stream()
                .map(this::toDTO).collect(Collectors.toList());
    }

    public AdoptionRequestDTO approveRequest(Long requestId, Long adminId) {
        AdoptionRequest request = adoptionRequestRepository.findById(requestId)
                .orElseThrow(() -> new ResourceNotFoundException("Adoption request not found with id: " + requestId));
        request.setStatus("APPROVED");
        request.setReviewedDate(LocalDateTime.now());
        request.setReviewedBy(adminId);
        AdoptionRequestDTO dto = toDTO(adoptionRequestRepository.save(request));
        petService.updateAdoptionStatus(request.getPetId(), "Adopted");
        return dto;
    }

    public AdoptionRequestDTO rejectRequest(Long requestId, Long adminId) {
        AdoptionRequest request = adoptionRequestRepository.findById(requestId)
                .orElseThrow(() -> new ResourceNotFoundException("Adoption request not found with id: " + requestId));
        request.setStatus("REJECTED");
        request.setReviewedDate(LocalDateTime.now());
        request.setReviewedBy(adminId);
        return toDTO(adoptionRequestRepository.save(request));
    }

    public long getPendingCount() {
        return adoptionRequestRepository.countByStatus("PENDING");
    }

    public long getApprovedCount() {
        return adoptionRequestRepository.countByStatus("APPROVED");
    }

    public long getTotalCount() {
        return adoptionRequestRepository.count();
    }

    private AdoptionRequestDTO toDTO(AdoptionRequest request) {
        AdoptionRequestDTO dto = new AdoptionRequestDTO();
        dto.setRequestId(request.getRequestId());
        dto.setUserId(request.getUserId());
        dto.setPetId(request.getPetId());
        dto.setPetName(request.getPetName());
        dto.setApplicantName(request.getApplicantName());
        dto.setApplicantEmail(request.getApplicantEmail());
        dto.setApplicantPhone(request.getApplicantPhone());
        dto.setApplicantAddress(request.getApplicantAddress());
        dto.setReasonForAdoption(request.getReasonForAdoption());
        dto.setHasExperience(request.isHasExperience());
        dto.setHomeEnvironment(request.getHomeEnvironment());
        dto.setStatus(request.getStatus());
        dto.setRequestDate(request.getRequestDate());
        dto.setReviewedDate(request.getReviewedDate());
        dto.setReviewedBy(request.getReviewedBy());
        return dto;
    }
}
