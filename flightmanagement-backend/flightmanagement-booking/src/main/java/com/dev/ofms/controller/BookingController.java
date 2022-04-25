package com.dev.ofms.controller;

import java.util.Date;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dev.ofms.model.Booking;
import com.dev.ofms.model.Flights;
import com.dev.ofms.repository.BookingRepository;
import com.dev.ofms.repository.FlightsRepository;

@RestController
@RequestMapping("/api/booking")
public class BookingController {
	
	@Autowired
	BookingRepository bookingRepository;
	
	@Autowired
	FlightsRepository flightsRepository;

	@GetMapping("/{referenceId}")
    public Optional<Booking> getBooking(@PathVariable String referenceId) {
        return bookingRepository.findById(referenceId);
    }
	
	@PostMapping("/save")
	public Booking saveBooking(@RequestBody Booking booking) {
			return bookingRepository.save(booking);
	}
	@PutMapping("/update/{id}")
	public Booking updateBooking(@RequestBody Booking booking) {
			return bookingRepository.save(booking);
	}
}
