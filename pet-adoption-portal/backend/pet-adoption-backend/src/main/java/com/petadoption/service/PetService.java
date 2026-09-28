package com.petadoption.service;

import com.petadoption.dto.PetDTO;
import com.petadoption.entity.mongodb.Pet;
import com.petadoption.exception.ResourceNotFoundException;
import com.petadoption.repository.mongodb.PetRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PetService {

    private final PetRepository petRepository;

    public PetService(PetRepository petRepository) {
        this.petRepository = petRepository;
    }

    public PetDTO addPet(Pet pet) {
        pet.setAddedDate(LocalDateTime.now());
        pet.setAdoptionStatus("Available");
        return toDTO(petRepository.save(pet));
    }

    public PetDTO getPetById(String id) {
        Pet pet = petRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Pet not found with id: " + id));
        return toDTO(pet);
    }

    public List<PetDTO> getAllPets() {
        return petRepository.findAll().stream().map(this::toDTO).collect(Collectors.toList());
    }

    public List<PetDTO> getAvailablePets() {
        return petRepository.findByAdoptionStatus("Available")
                .stream().map(this::toDTO).collect(Collectors.toList());
    }

    public PetDTO updatePet(String id, Pet petDetails) {
        Pet pet = petRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Pet not found with id: " + id));
        if (petDetails.getName() != null) pet.setName(petDetails.getName());
        if (petDetails.getCategory() != null) pet.setCategory(petDetails.getCategory());
        if (petDetails.getBreed() != null) pet.setBreed(petDetails.getBreed());
        if (petDetails.getAge() > 0) pet.setAge(petDetails.getAge());
        if (petDetails.getGender() != null) pet.setGender(petDetails.getGender());
        if (petDetails.getLocation() != null) pet.setLocation(petDetails.getLocation());
        if (petDetails.getHealthStatus() != null) pet.setHealthStatus(petDetails.getHealthStatus());
        if (petDetails.getDescription() != null) pet.setDescription(petDetails.getDescription());
        if (petDetails.getAdoptionStatus() != null) pet.setAdoptionStatus(petDetails.getAdoptionStatus());
        if (petDetails.getImageUrl() != null) pet.setImageUrl(petDetails.getImageUrl());
        if (petDetails.getImageUrls() != null) pet.setImageUrls(petDetails.getImageUrls());
        if (petDetails.getTemperament() != null) pet.setTemperament(petDetails.getTemperament());
        if (petDetails.getSpecialNeeds() != null) pet.setSpecialNeeds(petDetails.getSpecialNeeds());
        if (petDetails.getSize() != null) pet.setSize(petDetails.getSize());
        if (petDetails.getColor() != null) pet.setColor(petDetails.getColor());
        if (petDetails.getVaccinations() != null) pet.setVaccinations(petDetails.getVaccinations());
        pet.setWeight(petDetails.getWeight());
        pet.setNeutered(petDetails.isNeutered());
        pet.setUpdatedDate(LocalDateTime.now());
        return toDTO(petRepository.save(pet));
    }

    public void deletePet(String id) {
        if (!petRepository.existsById(id)) {
            throw new ResourceNotFoundException("Pet not found with id: " + id);
        }
        petRepository.deleteById(id);
    }

    public List<PetDTO> searchPets(String category, String breed, String location, Integer maxAge) {
        if (category != null && !category.isEmpty()) {
            return petRepository.findByCategory(category)
                    .stream().map(this::toDTO).collect(Collectors.toList());
        }
        if (breed != null && !breed.isEmpty()) {
            return petRepository.findByBreed(breed)
                    .stream().map(this::toDTO).collect(Collectors.toList());
        }
        if (location != null && !location.isEmpty()) {
            return petRepository.findByLocation(location)
                    .stream().map(this::toDTO).collect(Collectors.toList());
        }
        if (maxAge != null && maxAge > 0) {
            return petRepository.findByAgeLessThanEqual(maxAge)
                    .stream().map(this::toDTO).collect(Collectors.toList());
        }
        return getAvailablePets();
    }

    public void updateAdoptionStatus(String petId, String status) {
        Pet pet = petRepository.findById(petId)
                .orElseThrow(() -> new ResourceNotFoundException("Pet not found with id: " + petId));
        pet.setAdoptionStatus(status);
        petRepository.save(pet);
    }

    public long getAvailableCount() {
        return petRepository.findByAdoptionStatus("Available").size();
    }

    public long getAdoptedCount() {
        return petRepository.findByAdoptionStatus("Adopted").size();
    }

    private PetDTO toDTO(Pet pet) {
        PetDTO dto = new PetDTO();
        dto.setPetId(pet.getPetId());
        dto.setName(pet.getName());
        dto.setCategory(pet.getCategory());
        dto.setBreed(pet.getBreed());
        dto.setAge(pet.getAge());
        dto.setGender(pet.getGender());
        dto.setSize(pet.getSize());
        dto.setColor(pet.getColor());
        dto.setLocation(pet.getLocation());
        dto.setHealthStatus(pet.getHealthStatus());
        dto.setVaccinations(pet.getVaccinations());
        dto.setDescription(pet.getDescription());
        dto.setAdoptionStatus(pet.getAdoptionStatus());
        dto.setImageUrl(pet.getImageUrl());
        dto.setImageUrls(pet.getImageUrls());
        dto.setNeutered(pet.isNeutered());
        dto.setTemperament(pet.getTemperament());
        dto.setSpecialNeeds(pet.getSpecialNeeds());
        dto.setWeight(pet.getWeight());
        dto.setAddedDate(pet.getAddedDate());
        return dto;
    }
}
