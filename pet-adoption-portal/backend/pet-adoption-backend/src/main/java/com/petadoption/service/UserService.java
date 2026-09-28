package com.petadoption.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.petadoption.dto.AuthResponse;
import com.petadoption.dto.LoginRequest;
import com.petadoption.dto.UserDTO;
import com.petadoption.entity.mysql.Admin;
import com.petadoption.entity.mysql.User;
import com.petadoption.exception.ResourceNotFoundException;
import com.petadoption.repository.mysql.AdminRepository;
import com.petadoption.repository.mysql.UserRepository;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final AdminRepository adminRepository;

    public UserService(UserRepository userRepository, AdminRepository adminRepository) {
        this.userRepository = userRepository;
        this.adminRepository = adminRepository;
    }

    public AuthResponse register(User user) {
        if (userRepository.existsByEmail(user.getEmail())) {
            return new AuthResponse(false, "Email already registered!");
        }
        User saved = userRepository.save(user);
        return new AuthResponse(true, "Registration successful!", toDTO(saved));
    }

    public AuthResponse login(LoginRequest request) {
        if ("ADMIN".equalsIgnoreCase(request.getRole())) {
            Admin admin = adminRepository.findByEmail(request.getEmail())
                    .orElse(null);
            if (admin == null || !admin.getPassword().equals(request.getPassword())) {
                return new AuthResponse(false, "Invalid admin credentials!");
            }
            AuthResponse res = new AuthResponse(true, "Admin login successful!");
            res.setRole("ADMIN");
            res.setData(admin.getAdminId());
            return res;
        }

        User user = userRepository.findByEmail(request.getEmail())
                .orElse(null);
        if (user == null || !user.getPassword().equals(request.getPassword())) {
            return new AuthResponse(false, "Invalid email or password!");
        }
        AuthResponse res = new AuthResponse(true, "Login successful!", toDTO(user));
        res.setRole("USER");
        return res;
    }

    public UserDTO getUserById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));
        return toDTO(user);
    }

    public UserDTO updateProfile(Long id, UserDTO dto) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));
        if (dto.getFullName() != null) user.setFullName(dto.getFullName());
        if (dto.getPhone() != null) user.setPhone(dto.getPhone());
        if (dto.getAddress() != null) user.setAddress(dto.getAddress());
        if (dto.getCity() != null) user.setCity(dto.getCity());
        if (dto.getState() != null) user.setState(dto.getState());
        if (dto.getPincode() != null) user.setPincode(dto.getPincode());
        user.setUpdatedAt(LocalDateTime.now());
        return toDTO(userRepository.save(user));
    }

    public List<UserDTO> getAllUsers() {
        return userRepository.findAll().stream().map(this::toDTO).collect(Collectors.toList());
    }

    private UserDTO toDTO(User user) {
        UserDTO dto = new UserDTO();
        dto.setUserId(user.getUserId());
        dto.setEmail(user.getEmail());
        dto.setFullName(user.getFullName());
        dto.setPhone(user.getPhone());
        dto.setAddress(user.getAddress());
        dto.setCity(user.getCity());
        dto.setState(user.getState());
        dto.setPincode(user.getPincode());
        dto.setCreatedAt(user.getCreatedAt());
        return dto;
    }
}
