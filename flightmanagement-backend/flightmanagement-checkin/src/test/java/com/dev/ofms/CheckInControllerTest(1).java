package com.dev.ofms;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import com.dev.ofms.model.Checkin;
import com.dev.ofms.repository.CheckinRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@WebMvcTest
public class CheckInControllerTest {

	@Autowired
	MockMvc mockMvc;
	
	@MockBean
	CheckinRepository checkinRepository;
	
	@Test
	public void testSaveCheckin() throws Exception {
		Checkin checkin = new Checkin();
		checkin.setBookingId("622c9a1605597d1b038715a8");
		checkin.setFlightNum("AI987");
		checkin.setSeatNumber("31C");
		checkin.setUserId("622c9a1605597d1b038711234");
		Mockito.when(checkinRepository.save(Mockito.any())).thenReturn(checkin);
		String request = new ObjectMapper().writeValueAsString(checkin);
		mockMvc.perform(post("/api/checkin/save").contentType(MediaType.APPLICATION_JSON).content(request)).andExpect(status().is2xxSuccessful());
	}
	
	@Test
	public void getCheckinDetails() throws Exception {
		Checkin checkin = new Checkin();
		checkin.setBookingId("622c9a1605597d1b038715a8");
		checkin.setFlightNum("AI987");
		checkin.setSeatNumber("31C");
		checkin.setUserId("622c9a1605597d1b038711234");
		Mockito.when(checkinRepository.findById(Mockito.anyString())).thenReturn(Optional.of(checkin));
		mockMvc.perform(get("/api/checkin/622c9a1605597d1b038715a8").contentType(MediaType.APPLICATION_JSON)).andExpect(status().is2xxSuccessful());
		
	}
}
