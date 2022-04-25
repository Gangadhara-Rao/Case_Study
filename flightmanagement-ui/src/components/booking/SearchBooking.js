import React, { Component } from 'react';
import { getBookingDetails,checkIn ,getCurrentUser} from '../util/APIUtils';
import { withRouter } from 'react-router-dom';
import { Form, Button, Table} from 'react-bootstrap';

class SearchBooking extends Component {
    constructor(props) {
        super(props);
        this.state = {
            referenceId: {
                value: ''
            },
            booking: {}
        };
        this.handleInputChange = this.handleInputChange.bind(this);

        this.handleReferenceIdChange = this.handleReferenceIdChange.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.loadcheckIn = this.loadcheckIn.bind(this);
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
    
    validateReferenceId = (text) => {
        if(text.length === 0) {
            return {
                isValid: 'error',
                errorMsg: 'Please enter reference ID'
            }
        } else {
            return {
                isValid: 'success',
                errorMsg: null
            }
        }
    }

    handleReferenceIdChange(event) {
        const value = event.target.value;
        this.setState({
            referenceId: {
                value: value,
                ...this.validateReferenceId(value)
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault(); 
        
        getBookingDetails(this.state.referenceId.value)
        .then(response => {
            console.log(response);
            if( null != response ) {
                this.setState({
                    booking: response
                });
            } else {
                alert("Could not find any booking with provided refernce ID");
            }
        }).catch(error => {
            alert("Could not find any booking with provided refernce ID");
        });
        
    }

    isFormInvalid() {
        if(this.state.referenceId.isValid !== 'success') {
            return true;
        }
    }

    loadcheckIn(event) {
        event.preventDefault(); 
        
        const checkinRequest = {
            bookingId:this.state.referenceId.value,
            flightNum:this.state.booking.flightId,
            userId: this.state.currentUser.id
        }
        checkIn(checkinRequest)
        .then(response => {
            console.log(response);
            if( null != response ) {
                alert("Checked In. Seat Number is : "+response.seatNumber+" , checkin id is : "+response.id);
                this.props.history.push("/search");
            } else {
                alert("Failed to checkin. Please try again.");
                this.props.history.push("/bookings");
            }
        }).catch(error => {
            alert("Failed to checkin. Please try again.");
                this.props.history.push("/bookings");
        });
        
        };

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
  
          componentDidMount() {
            this.loadCurrentUser();
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
                <h3>Find your booking</h3>
                <div className="new-appointment-content">
                    <Form {...layout} onSubmit={this.handleSubmit} className="create-appointment-form">
                        
                        <Form.Group className="mb-3" controlId="signup-form.travelDate">
                            <Form.Label>Booking Reference</Form.Label>
                            <Form.Control type="text" name="referenceId" placeholder="Reference Id" isValid={this.state.referenceId.isValid}
                            autoComplete="off" value={this.state.referenceId.value}
                            onChange={(event) => this.handleInputChange(event, this.validateReferenceId)} />
                        </Form.Group>
                        <Form.Group {...tailLayout}  className="appointment-form-row">
                            <Button type="primary" 
                                htmlType="submit" 
                                size="large" 
                                disabled={this.isFormInvalid()}
                                className="create-appointment-form-button">Search</Button>
                        </Form.Group>
                    </Form>
                    {Object.keys(this.state.booking).length > 0 ? (   
                    <Table>
                    <tbody>
                        <tr>
                            <td>{this.state.booking.flightId}</td>
                            <td>{this.state.booking.sourceCode}</td>
                            <td>{this.state.booking.destinationCode}</td>
                            <td>{this.state.booking.travelDate}</td>
                            <td>{this.state.booking.fare}</td>
                            <td> <Button onClick={(event) => this.loadcheckIn(event)}>CheckIn</Button> </td>
                        </tr>
                    </tbody> 
                </Table>
                    ): null
                }
                
                </div> 
                  
            </div>
        );
    }
}

export default withRouter(SearchBooking);