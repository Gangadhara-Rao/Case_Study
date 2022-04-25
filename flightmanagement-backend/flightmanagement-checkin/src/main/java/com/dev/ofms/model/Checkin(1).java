package com.dev.ofms.model;

import org.springframework.data.annotation.Id;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Checkin {

	@Id
	@JsonProperty("id")
	private String _id;
	@JsonProperty("flightNum")
	private String flightNum;
	@JsonProperty("seatNumber")
	private String seatNumber;
	@JsonProperty("bookingId")
	private String bookingId;
	@JsonProperty("userId")
	private String userId;

	public String get_id() {
		return _id;
	}

	public void set_id(String _id) {
		this._id = _id;
	}

	public String getFlightNum() {
		return flightNum;
	}

	public void setFlightNum(String flightNum) {
		this.flightNum = flightNum;
	}

	public String getSeatNumber() {
		return seatNumber;
	}

	public void setSeatNumber(String seatNumber) {
		this.seatNumber = seatNumber;
	}

	public String getBookingId() {
		return bookingId;
	}

	public void setBookingId(String bookingId) {
		this.bookingId = bookingId;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public Checkin(String _id, String flightNum, String seatNumber, String bookingId, String userId) {
		super();
		this._id = _id;
		this.flightNum = flightNum;
		this.seatNumber = seatNumber;
		this.bookingId = bookingId;
		this.userId = userId;
	}

	public Checkin() {
		super();
		// TODO Auto-generated constructor stub
	}

}
