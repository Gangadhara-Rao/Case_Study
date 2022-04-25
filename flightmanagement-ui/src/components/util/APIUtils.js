import { API_BASE_URL, ACCESS_TOKEN, API_BASE_URL_SEARCH,API_BASE_URL_BOOKING,API_BASE_URL_CHECKIN } from '../constants';

const request = (options) => {
    const headers = new Headers({
        'Content-Type': 'application/json',
    })
    
    if(localStorage.getItem(ACCESS_TOKEN)) {
        headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
    }

    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);

    return fetch(options.url, options)
    .then(response => 
        response.json().then(json => {
            if(!response.ok) {
                return Promise.reject(json);
            }
            return json;
        })
    );
};

export function getFlightDetails(source, destination,travelDate){
    return request({
        url: API_BASE_URL_SEARCH + "/search/flight?source="+source+"&destination="+destination+"&travelDate="+travelDate,
        method: 'GET'
    });
}

export function getFlightDetailsById(id){
    return request({
        url: API_BASE_URL_SEARCH + "/search/flightbyid?id="+id,
        method: 'GET'
    });
}

export function getBookingDetails(id){
    return request({
        url: API_BASE_URL_BOOKING + "/booking/"+id,
        method: 'GET'
    });
}

export function bookFlightService(bookingRequest){
    return request({
        url: API_BASE_URL_BOOKING + "/booking/save",
        method: 'POST',
        body: JSON.stringify(bookingRequest)
    });
}

export function checkIn(checkinRequest){
    return request({
        url: API_BASE_URL_CHECKIN + "/checkin/save",
        method: 'POST',
        body: JSON.stringify(checkinRequest)
    });
}

export function login(loginRequest) {
    return request({
        url: API_BASE_URL + "/auth/signin",
        method: 'POST',
        body: JSON.stringify(loginRequest)
    });
}

export function signup(signupRequest) {
    return request({
        url: API_BASE_URL + "/auth/signup",
        method: 'POST',
        body: JSON.stringify(signupRequest)
    });
}

export function checkUsernameAvailability(username) {
    return request({
        url: API_BASE_URL + "/user/checkUsernameAvailability?username=" + username,
        method: 'GET'
    });
}

export function getCurrentUser() {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/user/me",
        method: 'GET'
    });
}
