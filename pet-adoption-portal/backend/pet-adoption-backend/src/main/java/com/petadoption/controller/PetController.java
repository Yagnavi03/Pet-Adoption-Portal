package com.petadoption.controller;

import com.petadoption.dto.PetDTO;
import com.petadoption.entity.mongodb.Pet;
import com.petadoption.service.PetService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pets")
@CrossOrigin(origins = "*")
public class PetController {

    private final PetService petService;

    public PetController(PetService petService) {
        this.petService = petService;
    }

    @PostMapping
    public ResponseEntity<PetDTO> addPet(@RequestBody Pet pet) {
        return ResponseEntity.ok(petService.addPet(pet));
    }

    @GetMapping
    public ResponseEntity<List<PetDTO>> getAllPets() {
        return ResponseEntity.ok(petService.getAllPets());
    }

    @GetMapping("/available")
    public ResponseEntity<List<PetDTO>> getAvailablePets() {
        return ResponseEntity.ok(petService.getAvailablePets());
    }

    @GetMapping("/{id}")
    public ResponseEntity<PetDTO> getPet(@PathVariable String id) {
        return ResponseEntity.ok(petService.getPetById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<PetDTO> updatePet(@PathVariable String id, @RequestBody Pet pet) {
        return ResponseEntity.ok(petService.updatePet(id, pet));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePet(@PathVariable String id) {
        petService.deletePet(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/search")
    public ResponseEntity<List<PetDTO>> searchPets(
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String breed,
            @RequestParam(required = false) String location,
            @RequestParam(required = false) Integer maxAge) {
        return ResponseEntity.ok(petService.searchPets(category, breed, location, maxAge));
    }
}
