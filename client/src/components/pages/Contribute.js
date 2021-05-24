import React from 'react';
import './contribute.css';
import {Link} from 'react-router-dom';
import Navbar from '../layout/Navbar'
export default function Contribute() {
    return (
        <div>
        <Navbar/>
        <section id="contribute" class="contribute section-bg">
        <div class="container" data-aos="fade-up">
  
          
  
          <div class="row">
  
            
  
            <div class="col-lg-12 col-md-12 mt-4 mt-md-0" data-aos="fade-up" data-aos-delay="200">
              <div class="box featured">
                <h3>Resources</h3>
                
                <ul>
                  <li>Contribute a Resource to the community</li>
                  
                  
                </ul>
                <div class="btn-wrap">
                  <Link to="/login" class="btn btn-primary btn-buy">Submit</Link>
                </div>
              </div>
            </div>
  
            
  
            
  
          </div>
  
        </div>
        <div className="container" style={{marginTop:'3rem'}}>
        <div class="row">
  
            <div class="col-lg-12 col-md-12" data-aos="fade-up" data-aos-delay="100">
            <div class="card">
                <div class="card-header">
                    Contributing Guidelines
                </div>
                <div class="card-body">
                    
                <li>Please do not submit malicious or spammy content.Please be respectful and support the community</li>
                <li>Login to the portal add/update/delete your resources</li>
                  <li>Get calls from volunteers/NGOs</li>
                  <li>Deliver them the resources and make a positive impact and help the community</li>
                <hr></hr>
                <h5>Resources</h5>
                <hr></hr>
                <li>You can submit locations and availability of Shelter Homes</li>
                <li>You can submit locations and availability of community kitchens</li>
                <li>Free food and dontaions</li>
                <li>You can include images,availability and all details</li>
                <hr></hr>
                
                
                
                
                
                </div>
                
            </div>
             
            </div>
  
            
  
            
  
            
            </div>
          </div>
      </section>
      
        </div>
    )
}
