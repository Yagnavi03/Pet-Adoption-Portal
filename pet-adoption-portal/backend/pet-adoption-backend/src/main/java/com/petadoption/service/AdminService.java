package com.petadoption.service;

import com.petadoption.dto.AuthResponse;
import com.petadoption.dto.LoginRequest;
import com.petadoption.entity.mysql.Admin;
import com.petadoption.exception.ResourceNotFoundException;
import com.petadoption.repository.mysql.AdminRepository;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class AdminService {

    private final AdminRepository adminRepository;
    private final PetService petService;
    private final AdoptionService adoptionService;

    public AdminService(AdminRepository adminRepository, PetService petService, AdoptionService adoptionService) {
        this.adminRepository = adminRepository;
        this.petService = petService;
        this.adoptionService = adoptionService;
    }

    public AuthResponse registerAdmin(Admin admin) {
        if (adminRepository.existsByEmail(admin.getEmail())) {
            return new AuthResponse(false, "Admin email already registered!");
        }
        adminRepository.save(admin);
        return new AuthResponse(true, "Admin registered successfully!");
    }

    public Map<String, Object> getDashboardStats() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("totalPets", petService.getAllPets().size());
        stats.put("availablePets", petService.getAvailableCount());
        stats.put("adoptedPets", petService.getAdoptedCount());
        stats.put("pendingRequests", adoptionService.getPendingCount());
        stats.put("approvedRequests", adoptionService.getApprovedCount());
        stats.put("totalRequests", adoptionService.getTotalCount());
        return stats;
    }
}
