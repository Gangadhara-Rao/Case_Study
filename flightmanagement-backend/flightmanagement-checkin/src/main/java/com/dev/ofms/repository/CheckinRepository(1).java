package com.dev.ofms.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.dev.ofms.model.Checkin;

@Repository
public interface CheckinRepository extends MongoRepository<Checkin,String> {

}
