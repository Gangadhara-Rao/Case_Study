import React, { Component } from 'react';
import { getFlightDetails } from '../util/APIUtils';
import { withRouter } from 'react-router-dom';
import { Form, Button} from 'react-bootstrap';
import Flight from './Flight';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            destination: {
                value: ''
            },
            source: {
                value:""
            },
            travelDate:{
                value:""
            },
            flights: {}
        };
        this.handleInputChange = this.handleInputChange.bind(this);

        this.handleDestinationChange = this.handleDestinationChange.bind(this);
        this.handleSourceChange = this.handleSourceChange.bind(this);
        this.handleTravelDateChange = this.handleTravelDateChange.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event, validationFun) {
        const target = event.target;
        const inputName = target.name;        
        const inputValue = target.value;

        this.setState({
            [inputName] : {
                value: inputValue,
                ...validationFun(inputValue)
            }
        });
    }

    validateDestination = (text) => {
        if(text.length === 0) {
            return {
                isValid: 'error',
                errorMsg: 'Please enter Destination!'
            }
        } else {
            return {
                isValid: 'success',
                errorMsg: null
            }
        }
    }

    
    validateSource = (text) => {
        if(text.length === 0) {
            return {
                isValid: 'error',
                errorMsg: 'Please enter source!'
            }
        } else {
            return {
                isValid: 'success',
                errorMsg: null
            }
        }
    }

    
    validateTravelDate = (text) => {
        if(text.length === 0) {
            return {
                isValid: 'error',
                errorMsg: 'Please enter travel date!'
            }
        } else {
            return {
                isValid: 'success',
                errorMsg: null
            }
        }
    }

    handleDestinationChange(event) {
        const value = event.target.value;
        this.setState({
            destination: {
                value: value,
                ...this.validateDestination(value)
            }
        });
    }

    handleSourceChange(event) {
        const value = event.target.value;
        this.setState({
            source: {
                value: value,
                ...this.validateSource(value)
            }
        });
    }

    handleTravelDateChange(event) {
        const value = event.target.value;
        this.setState({
            travelDate: {
                value: value,
                ...this.validateTravelDate(value)
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault(); 
        
        getFlightDetails(this.state.source.value,this.state.destination.value,this.state.travelDate.value)
        .then(response => {
            console.log(response);
            if( Array.isArray(response) && response.length ) {
                console.log(response);
                this.setState({
                    flights: response
                });
            } else {
                this.setState({
                    flights: response
                });
            }
        }).catch(error => {
            alert("Failed to get flight details. Please Try again");
        });
        
    }

    isFormInvalid() {
        if(this.state.destination.isValid !== 'success') {
            return true;
        }
    }

    render() {
        const layout = {
            labelCol: { span: 8 },
            wrapperCol: { span: 16 },
          };
          const tailLayout = {
            wrapperCol: { offset: 8, span: 16 },
          };

        return (
            <div className="appointments-container">
                <h3>Search Flights</h3>
                <div className="new-appointment-content">
                    <Form {...layout} onSubmit={this.handleSubmit} className="create-appointment-form">
                        <Form.Group className="mb-3" controlId="signup-form.source">
                            <Form.Label>Travelling From</Form.Label>
                            <Form.Control type="text" name="source" placeholder="Source" isValid={this.state.source.isValid}
                            autoComplete="off" value={this.state.source.value}
                            onChange={(event) => this.handleInputChange(event, this.validateSource)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="signup-form.destination">
                            <Form.Label>Going to</Form.Label>
                            <Form.Control type="text" name="destination" placeholder="Destination" isValid={this.state.destination.isValid}
                            autoComplete="off" value={this.state.destination.value}
                            onChange={(event) => this.handleInputChange(event, this.validateDestination)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="signup-form.travelDate">
                            <Form.Label>Planning on</Form.Label>
                            <Form.Control type="date" name="travelDate" placeholder="Planning on" isValid={this.state.travelDate.isValid}
                            autoComplete="off" value={this.state.travelDate.value}
                            onChange={(event) => this.handleInputChange(event, this.validateTravelDate)} />
                        </Form.Group>
                        <Form.Group {...tailLayout}  className="appointment-form-row">
                            <Button type="primary" 
                                htmlType="submit" 
                                size="large" 
                                disabled={this.isFormInvalid()}
                                className="create-appointment-form-button">Search</Button>
                        </Form.Group>
                    </Form>
                    {this.state.flights.length > 0 ? (   
                    <Flight flights={this.state.flights} />
                    ): null
                }
                {this.state.flights.length === 0 ? (
                        <div className="no-doctors-found">
                            <span>No Flights Found.</span>
                        </div>    
                    ): null
                }
                </div> 
                  
            </div>
        );
    }
}

export default withRouter(Search);