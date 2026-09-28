package com.petadoption.seed;

import com.petadoption.entity.mongodb.Pet;
import com.petadoption.repository.mongodb.PetRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Component
public class DataSeeder implements CommandLineRunner {

    private final PetRepository petRepository;

    public DataSeeder(PetRepository petRepository) {
        this.petRepository = petRepository;
    }

    @Override
    public void run(String... args) {
        Set<String> existingNames = petRepository.findAll()
                .stream()
                .map(Pet::getName)
                .map(String::toLowerCase)
                .collect(Collectors.toSet());

        List<Pet> samplePets = List.of(
            createPet("Charlie", "Dog", "Golden Retriever", 1, "Male", "Small", "Golden",
                "Bangalore", "Vaccinated", "Full course", "Friendly, playful, and loves belly rubs. Charlie is a bundle of joy who gets along with everyone.",
                "Available", "https://images.unsplash.com/photo-1552053831-71594a27632d?w=600&q=80",
                true, "Very friendly", "None", 8.5),

            createPet("Bella", "Cat", "Persian Mix", 2, "Female", "Medium", "White & Grey",
                "Mumbai", "Vaccinated", "Initial shots done", "Sweet and gentle. Loves to curl up on your lap and purr the day away.",
                "Available", "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=600&q=80",
                true, "Calm and affectionate", "Needs regular grooming", 4.2),

            createPet("Oreo", "Rabbit", "Holland Lop", 1, "Male", "Small", "Black & White",
                "Delhi", "Healthy", "None needed", "The cutest little bunny with floppy ears. Loves hopping around and eating carrots!",
                "Available", "https://images.unsplash.com/photo-1535241749838-299277b6305f?w=600&q=80",
                true, "Playful and curious", "None", 1.8),

            createPet("Daisy", "Dog", "Beagle", 2, "Female", "Medium", "Tricolor",
                "Pune", "Vaccinated", "Complete", "Adventurous and loving. Daisy has the most expressive eyes and a wagging tail that never stops.",
                "Available", "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=600&q=80",
                true, "Energetic and friendly", "None", 10.2),

            createPet("Mochi", "Cat", "Scottish Fold", 1, "Female", "Small", "Cream",
                "Hyderabad", "Vaccinated", "Full course", "Tiny folded ears and a huge heart. Mochi loves feather toys and sunbathing by the window.",
                "Available", "https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?w=600&q=80",
                false, "Playful yet shy", "None", 3.5),

            createPet("Simba", "Dog", "Labrador", 3, "Male", "Large", "Chocolate Brown",
                "Chennai", "Vaccinated", "Complete", "Big, goofy, and full of love. Simba gives the best cuddles and is great with children.",
                "Available", "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=600&q=80",
                true, "Gentle giant", "None", 28.0),

            createPet("Pepper", "Bird", "Cockatiel", 1, "Male", "Small", "Grey & Yellow",
                "Bangalore", "Healthy", "None needed", "A chatty little fellow who loves to whistle and mimic sounds. Pepper will keep you entertained for hours!",
                "Available", "https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=600&q=80",
                false, "Cheerful and vocal", "None", 0.1)
        );

        for (Pet pet : samplePets) {
            if (!existingNames.contains(pet.getName().toLowerCase())) {
                petRepository.save(pet);
            }
        }
    }

    private Pet createPet(String name, String category, String breed, int age,
                          String gender, String size, String color,
                          String location, String healthStatus, String vaccinations,
                          String description, String adoptionStatus, String imageUrl,
                          boolean neutered, String temperament, String specialNeeds, double weight) {
        Pet pet = new Pet();
        pet.setName(name);
        pet.setCategory(category);
        pet.setBreed(breed);
        pet.setAge(age);
        pet.setGender(gender);
        pet.setSize(size);
        pet.setColor(color);
        pet.setLocation(location);
        pet.setHealthStatus(healthStatus);
        pet.setVaccinations(vaccinations);
        pet.setDescription(description);
        pet.setAdoptionStatus(adoptionStatus);
        pet.setImageUrl(imageUrl);
        pet.setNeutered(neutered);
        pet.setTemperament(temperament);
        pet.setSpecialNeeds(specialNeeds);
        pet.setWeight(weight);
        pet.setAddedDate(LocalDateTime.now());
        return pet;
    }
}
