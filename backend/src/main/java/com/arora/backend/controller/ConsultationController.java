package com.arora.backend.controller;

import com.arora.backend.entity.Consultation;
import com.arora.backend.repository.ConsultationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/consultations")
@CrossOrigin(origins = "*") // Allows local development requests from Next.js
public class ConsultationController {

    @Autowired
    private ConsultationRepository consultationRepository;

    @GetMapping
    public List<Consultation> getAllConsultations() {
        return consultationRepository.findAll();
    }

    @PostMapping
    public Consultation createConsultation(@RequestBody Consultation consultation) {
        return consultationRepository.save(consultation);
    }
}
