import React, { Component } from 'react';
import { Table } from 'antd';
import './Flight.css'
import { getCurrentUser } from '../util/APIUtils';
import { Link } from 'react-router-dom';


class Flight extends Component {
  constructor(props) {
    super(props);
    this.state = {
        flight: {},
        currentUser:null
    };
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

componentDidMount() {
  this.loadCurrentUser();
}

    render() {
        const columns = [

          {
            title: 'Flight',
            dataIndex: 'flightId',
            key: 'flightId',
          },{
              title: 'From',
              dataIndex: 'sourceCode',
              key: 'source',
            },
            {
              title: 'To',
              dataIndex: 'destinationCode',
              key: 'destination',
            },
            {
              title: 'Date',
              dataIndex: 'travelDate',
              key: 'travelDate',
            },
            {
              title: 'Fare',
              dataIndex: 'fare',
              key: 'fare',
            },
            {
              title:'Action',
              dataIndex:'id',
              key:'id',
              render: text => <Link
              to={{
                pathname: "/booking/"+text,
                state: text // your data array of objects
              }}
           >Book</Link>
            }
          ];


        return (
            <Table columns={columns} dataSource={this.props.flights} />
        );
    }
}

export default Flight;