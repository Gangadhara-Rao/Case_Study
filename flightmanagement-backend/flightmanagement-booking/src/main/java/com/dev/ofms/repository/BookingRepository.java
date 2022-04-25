package com.dev.ofms.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.dev.ofms.model.Booking;

@Repository
public interface BookingRepository extends MongoRepository<Booking,String> {

	Optional<Booking> findById(String referenceId);

}
