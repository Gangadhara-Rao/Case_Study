package com.dev.ofms.model;

import java.util.Date;

import org.springframework.data.annotation.Id;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Booking {

	@Id
	@JsonProperty("id")
	private String _id;
	@JsonProperty("flightId")
	private String flightId;
	@JsonProperty("flightNum")
	private String flightNum;
	@JsonProperty("sourceCode")
	private String sourceCode;
	@JsonProperty("destinationCode")
	private String destinationCode;
	@JsonProperty("travelDate")
	private String travelDate;
	@JsonProperty("firstname")
	private String firstname;
	@JsonProperty("lastname")
	private String lastname;
	@JsonProperty("gender")
	private String gender;
	@JsonProperty("userId")
	private String userId;
	@JsonProperty("fare")
	private Double fare;

	private Date createdDate;

	public String get_id() {
		return _id;
	}

	public void set_id(String _id) {
		this._id = _id;
	}

	public String getFlightId() {
		return flightId;
	}

	public void setFlightId(String flightId) {
		this.flightId = flightId;
	}

	public String getFlightNum() {
		return flightNum;
	}

	public void setFlightNum(String flightNum) {
		this.flightNum = flightNum;
	}

	public String getSourceCode() {
		return sourceCode;
	}

	public void setSourceCode(String sourceCode) {
		this.sourceCode = sourceCode;
	}

	public String getDestinationCode() {
		return destinationCode;
	}

	public void setDestinationCode(String destinationCode) {
		this.destinationCode = destinationCode;
	}

	public String getTravelDate() {
		return travelDate;
	}

	public void setTravelDate(String travelDate) {
		this.travelDate = travelDate;
	}

	public String getFirstname() {
		return firstname;
	}

	public void setFirstname(String firstname) {
		this.firstname = firstname;
	}

	public String getLastname() {
		return lastname;
	}

	public void setLastname(String lastname) {
		this.lastname = lastname;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public Double getFare() {
		return fare;
	}

	public void setFare(Double fare) {
		this.fare = fare;
	}

	public Date getCreatedDate() {
		return createdDate;
	}

	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
	}

	public Booking(String _id, String flightId, String flightNum, String sourceCode, String destinationCode,
			String travelDate, String firstname, String lastname, String gender, String userId, Double fare,
			Date createdDate) {
		super();
		this._id = _id;
		this.flightId = flightId;
		this.flightNum = flightNum;
		this.sourceCode = sourceCode;
		this.destinationCode = destinationCode;
		this.travelDate = travelDate;
		this.firstname = firstname;
		this.lastname = lastname;
		this.gender = gender;
		this.userId = userId;
		this.fare = fare;
		this.createdDate = createdDate;
	}

	public Booking() {
		super();
		// TODO Auto-generated constructor stub
	}

}
