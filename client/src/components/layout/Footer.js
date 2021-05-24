import React from 'react';
import { Link } from 'react-router-dom';
import './footer.css';

const Footer = () => {
  return (
    <div style={{marginTop:'2rem'}}>
      <footer id="footer">
        <div class="footer-top">
          <div class="container">
            <div class="row">

              <div class="col-lg-4 col-md-6 footer-info">
                <h3>Help Brew</h3>
                <p>Helping hand in the Community</p>
              </div>

              

              <div class="col-lg-3 col-md-6 footer-contact">
                <h4>Contact Us</h4>
                

                <div class="social-links">
                  <a href="#" class="twitter"><i class="fa fa-twitter"></i></a>
                  <a href="#" class="facebook"><i class="fa fa-facebook"></i></a>
                  <a href="#" class="instagram"><i class="fa fa-instagram"></i></a>
                  <a href="https://www.linkedin.com/company/career-charge/" target="_blank" class="linkedin"><i class="fa fa-linkedin"></i></a>
                </div>

              </div>

              

            </div>
          </div>
        </div>

        <div class="container">
          <div class="copyright">
            &copy; Copyright <strong>Help Brew</strong>. All Rights Reserved
          </div>

        </div>
      </footer>
    </div>
  )
}


export default Footer;