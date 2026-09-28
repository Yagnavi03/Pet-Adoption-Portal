package com.petadoption.repository.mongodb;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.petadoption.entity.mongodb.Pet;

@Repository
public interface PetRepository extends MongoRepository<Pet, String> {
    List<Pet> findByCategory(String category);
    List<Pet> findByBreed(String breed);
    List<Pet> findByLocation(String location);
    List<Pet> findByAdoptionStatus(String adoptionStatus);
    List<Pet> findByCategoryAndAdoptionStatus(String category, String adoptionStatus);
    List<Pet> findByAgeLessThanEqual(int maxAge);
}
