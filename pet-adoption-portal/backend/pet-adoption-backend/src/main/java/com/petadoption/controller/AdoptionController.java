package com.petadoption.controller;

import com.petadoption.dto.AdoptionRequestDTO;
import com.petadoption.entity.mysql.AdoptionRequest;
import com.petadoption.service.AdoptionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/adoptions")
@CrossOrigin(origins = "*")
public class AdoptionController {

    private final AdoptionService adoptionService;

    public AdoptionController(AdoptionService adoptionService) {
        this.adoptionService = adoptionService;
    }

    @PostMapping
    public ResponseEntity<AdoptionRequestDTO> submitRequest(@RequestBody AdoptionRequest request) {
        return ResponseEntity.ok(adoptionService.submitRequest(request));
    }

    @GetMapping
    public ResponseEntity<List<AdoptionRequestDTO>> getAllRequests() {
        return ResponseEntity.ok(adoptionService.getAllRequests());
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<AdoptionRequestDTO>> getUserRequests(@PathVariable Long userId) {
        return ResponseEntity.ok(adoptionService.getRequestsByUser(userId));
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<AdoptionRequestDTO>> getRequestsByStatus(@PathVariable String status) {
        return ResponseEntity.ok(adoptionService.getRequestsByStatus(status));
    }

    @PutMapping("/{requestId}/approve")
    public ResponseEntity<AdoptionRequestDTO> approveRequest(
            @PathVariable Long requestId, @RequestParam Long adminId) {
        return ResponseEntity.ok(adoptionService.approveRequest(requestId, adminId));
    }

    @PutMapping("/{requestId}/reject")
    public ResponseEntity<AdoptionRequestDTO> rejectRequest(
            @PathVariable Long requestId, @RequestParam Long adminId) {
        return ResponseEntity.ok(adoptionService.rejectRequest(requestId, adminId));
    }
}
