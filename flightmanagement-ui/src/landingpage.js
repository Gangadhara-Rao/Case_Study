import React, { Component } from 'react';
import Image from "./images/flightmanagement.jpeg";
import './home.css'
class Landing extends Component {
    
    render() {
        return (
            <div className="home-container" style={{  
                backgroundImage: "url("+Image+")",
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                width:'1200px'
              }}>
                
            </div>
        );
    }

    
}

export default Landing;