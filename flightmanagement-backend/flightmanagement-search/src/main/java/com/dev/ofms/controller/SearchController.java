package com.dev.ofms.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.dev.ofms.model.Flights;
import com.dev.ofms.repository.FlightsRepository;

@RestController
@RequestMapping("/api/search")
public class SearchController {
	
	@Autowired
	FlightsRepository flightsRepository;

	@GetMapping("/flights")
    public List<Flights> getAllFlights() {
        return flightsRepository.findAll();
    }
	
	@GetMapping("/flight")
    public List<Flights> getFlights(@RequestParam String source, @RequestParam String destination, @RequestParam String travelDate) {
        return flightsRepository.findBySourceCodeAndDestinationCodeAndTravelDate(source,destination,travelDate);
    }
	
	@GetMapping("/flightbyid")
    public Optional<Flights> getFlightbyid(@RequestParam String id) {
        return flightsRepository.findById(id);
    }
	
	@PostMapping("/save")
	public Flights saveFlight(@RequestBody Flights flight) {
		return flightsRepository.save(flight);
	}
	@PutMapping("/update/{id}")
	public Flights updateFlight(@RequestBody Flights flight) {
		return flightsRepository.save(flight);
	}
}
