package com.dev.ofms.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.dev.ofms.model.Flights;

public interface FlightsRepository extends MongoRepository<Flights,String> {

}
