package com.dev.ofms.model;

import org.springframework.data.annotation.Id;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Flights {

	@Id
	@JsonProperty("id")
	private String _id;
	@JsonProperty("flightId")
	private String flightId;
	@JsonProperty("source")
	private String source;
	@JsonProperty("sourceCode")
	private String sourceCode;
	@JsonProperty("destination")
	private String destination;
	@JsonProperty("destinationCode")
	private String destinationCode;
	@JsonProperty("travelDate")
	private String travelDate;
	@JsonProperty("fare")
	private Double fare;

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

	public String getSource() {
		return source;
	}

	public void setSource(String source) {
		this.source = source;
	}

	public String getSourceCode() {
		return sourceCode;
	}

	public void setSourceCode(String sourceCode) {
		this.sourceCode = sourceCode;
	}

	public String getDestination() {
		return destination;
	}

	public void setDestination(String destination) {
		this.destination = destination;
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

	public Double getFare() {
		return fare;
	}

	public void setFare(Double fare) {
		this.fare = fare;
	}

	public Flights(String _id, String flightId, String source, String sourceCode, String destination,
			String destinationCode, String travelDate, Double fare) {
		super();
		this._id = _id;
		this.flightId = flightId;
		this.source = source;
		this.sourceCode = sourceCode;
		this.destination = destination;
		this.destinationCode = destinationCode;
		this.travelDate = travelDate;
		this.fare = fare;
	}

	public Flights() {
		super();
		// TODO Auto-generated constructor stub
	}

}
