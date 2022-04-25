import React, { Component } from 'react';
import { getFlightDetails } from '../util/APIUtils';
import { withRouter } from 'react-router-dom';
import { Form, Button, Table} from 'react-bootstrap';
import { getCurrentUser ,getFlightDetailsById,bookFlightService} from '../util/APIUtils';


class Booking extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: {
                value: ''
            },
            lastname: {
                value:""
            },
            gender:{
                value:""
            },
            flightId:"",
            source:"",
            destination:"",
            travelDate:"",
            fare:"",
            flight: {},
            flights:{}
        };
        this.handleInputChange = this.handleInputChange.bind(this);

        this.handleFirstnameChange = this.handleFirstnameChange.bind(this);
        this.handleLastnameChange = this.handleLastnameChange.bind(this);
        this.handleGenderChange = this.handleGenderChange.bind(this);

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

    validateFirstname = (text) => {
        if(text.length === 0) {
            return {
                isValid: 'error',
                errorMsg: 'Please enter firstName'
            }
        } else {
            return {
                isValid: 'success',
                errorMsg: null
            }
        }
    }

    
    validateLastname = (text) => {
        if(text.length === 0) {
            return {
                isValid: 'error',
                errorMsg: 'Please enter lastName!'
            }
        } else {
            return {
                isValid: 'success',
                errorMsg: null
            }
        }
    }

    
    validateGender = (text) => {
        if(text.length === 0) {
            return {
                isValid: 'error',
                errorMsg: 'Please enter gender!'
            }
        } else {
            return {
                isValid: 'success',
                errorMsg: null
            }
        }
    }

    handleFirstnameChange(event) {
        const value = event.target.value;
        this.setState({
            firstname: {
                value: value,
                ...this.validateFirstname(value)
            }
        });
    }

    handleLastnameChange(event) {
        const value = event.target.value;
        this.setState({
            lastname: {
                value: value,
                ...this.validateLastname(value)
            }
        });
    }

    handleGenderChange(event) {
        const value = event.target.value;
        this.setState({
            gender: {
                value: value,
                ...this.validateGender(value)
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault(); 
       let bookingRequest  ={
            firstname:this.state.firstname.value,
            lastname:this.state.lastname.value,
            gender:this.state.gender.value,
            flightId : this.props.match.params.id,
            flightNum : this.state.flightId,
            sourceCode:this.state.source,
            destinationCode:this.state.destination,
            travelDate:this.state.travelDate,
            fare:this.state.fare,
            userId: this.state.currentUser.id
        }

        console.log(bookingRequest);
        bookFlightService(bookingRequest)
        .then(response => {
            console.log(response);
            if( null != response ) {
                alert("Your booking is confirmed. Reference ID is : "+response.id);
                this.props.history.push("/bookings");
            } else {
                alert("Failed to book. Please try again.");
                this.props.history.push("/search");
            }
        }).catch(error => {
            alert("Failed to book. Please try again.");
                this.props.history.push("/search");
        });
        
    }

    
    isFormInvalid() {
        if(this.state.firstname.isValid !== 'success') {
            return true;
        }
    }

    
loadCurrentUser() {
    getCurrentUser()
    .then(response => {
      this.setState({
        currentUser: response
      });
    }).catch(error => {
      this.setState({
        isLoading: false
      });  
    });
  }
  
  
  loadFlightDetails() {
    const id = this.props.match.params.id;
    getFlightDetailsById(id)
    .then(response => {
      this.setState({
        flight: response,
        flightId : response.flightId,
        source:response.sourceCode,
        destination:response.destinationCode,
        travelDate:response.travelDate,
        fare:response.fare
      });
    }).catch(error => {
      this.setState({
        isLoading: false
      });  
    });
  }
  
  componentDidMount() {
    this.loadCurrentUser();
    this.loadFlightDetails();
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
                <h3>Confirm Booking</h3>
                <div className="new-appointment-content">
                    <Table>
                        <tbody>
                            <tr>
                                <td>{this.state.flightId}</td>
                                <td>{this.state.source}</td>
                                <td>{this.state.destination}</td>
                                <td>{this.state.travelDate}</td>
                                <td>{this.state.fare}</td>
                            </tr>
                        </tbody> 
                    </Table>
                    <Form {...layout} onSubmit={this.handleSubmit} className="create-appointment-form">
                        <Form.Group className="mb-3" controlId="signup-form.firstname">
                            <Form.Label>FirstName</Form.Label>
                            <Form.Control type="text" name="firstname" placeholder="firstname" isValid={this.state.firstname.isValid}
                            autoComplete="off" value={this.state.firstname.value}
                            onChange={(event) => this.handleInputChange(event, this.validateFirstname)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="signup-form.lastname">
                            <Form.Label>LastName</Form.Label>
                            <Form.Control type="text" name="lastname" placeholder="LastName" isValid={this.state.lastname.isValid}
                            autoComplete="off" value={this.state.lastname.value}
                            onChange={(event) => this.handleInputChange(event, this.validateLastname)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="signup-form.gender">
                            <Form.Label>Gender</Form.Label>
                            <Form.Control type="text" name="gender" placeholder="Gender" isValid={this.state.gender.isValid}
                            autoComplete="off" value={this.state.gender.value}
                            onChange={(event) => this.handleInputChange(event, this.validateGender)} />
                        </Form.Group>
                        <Form.Group {...tailLayout}  className="appointment-form-row">
                            <Button type="primary" 
                                htmlType="submit" 
                                size="large" 
                                disabled={this.isFormInvalid()}
                                className="create-appointment-form-button">Confirm</Button>
                        </Form.Group>
                    </Form>
                   
                </div> 
                  
            </div>
        );
    }
}

export default withRouter(Booking);