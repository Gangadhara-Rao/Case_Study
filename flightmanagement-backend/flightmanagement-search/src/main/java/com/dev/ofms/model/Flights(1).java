package com.dev.ofms.model;

import org.springframework.data.annotation.Id;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
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
	
	
}
