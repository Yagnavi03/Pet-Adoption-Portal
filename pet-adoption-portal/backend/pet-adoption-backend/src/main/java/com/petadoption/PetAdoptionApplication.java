package com.petadoption;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class PetAdoptionApplication {

    public static void main(String[] args) {
        SpringApplication.run(PetAdoptionApplication.class, args);
        System.out.println("========================================");
        System.out.println("Pet Adoption Backend is running on port 8080!");
        System.out.println("========================================");
    }
}
