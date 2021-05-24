import React from 'react';
import './home.css';
import {Link} from 'react-router-dom';
import Navbar from '../layout/Navbar'
export default function Home() {
    return (
        <div>
        <Navbar/>
        <section id="hero">

        <div class="container">
          <div class="row">
            <div class="col-lg-6 pt-5 pt-lg-0 order-2 order-lg-1 d-flex flex-column justify-content-center" data-aos="fade-up">
              <div>
                <h1>Help Brew</h1>
                <h2>We help the community to get closer,bring joy to the needed. We connect community kitchens,shelter homes and others with volunteers who in turn get those resources to the needy </h2>
                <Link to="/contribute" href="#about" class="btn-get-started scrollto">Get Started</Link>
              </div>
            </div>
            <div class="col-lg-6 order-1 order-lg-2 hero-img" data-aos="fade-left">
              <img src="https://i.postimg.cc/wvYh0fNX/Untitled-design-2.png" class="img-fluid" alt=""/>
            </div>
          </div>
        </div>
    
      </section>

      <section id="features" class="features">
      <div class="container">

        <div class="row">
          <div class="col-lg-6 mt-2 mb-tg-0 order-2 order-lg-1">
            <ul class="nav nav-tabs flex-column">
              <li class="nav-item" data-aos="fade-up">
                <a class="nav-link active show" data-toggle="tab" href="#tab-1">
                  <h4>Submit Resources</h4>
                  <p>Login into the portal and add any resources like shelter homes,free food,community kitches and much more</p>
                </a>
              </li>
              <li class="nav-item mt-2" data-aos="fade-up" data-aos-delay="100">
                <a class="nav-link" data-toggle="tab" href="#tab-2">
                  <h4>Explore Resources</h4>
                  <p>volunteers and NGOs can explore resources in their areas.</p>
                </a>
              </li>
              <li class="nav-item mt-2" data-aos="fade-up" data-aos-delay="200">
                <a class="nav-link" data-toggle="tab" href="#tab-3">
                  <h4>Get Resources</h4>
                  <p>NGOs and volunteers can get the resources and by contacting the respective person.</p>
                </a>
              </li>
              <li class="nav-item mt-2" data-aos="fade-up" data-aos-delay="300">
                <a class="nav-link" data-toggle="tab" href="#tab-4">
                  <h4>Deliviring Resources</h4>
                  <p>NGOs and Volunteers deliver those resources to the needy</p>
                </a>
              </li>
            </ul>
          </div>
          <div class="col-lg-6 order-1 order-lg-2" data-aos="zoom-in">
            <div class="tab-content">
              <div class="tab-pane active show" id="tab-1">
                <figure>
                  <img src="https://i.postimg.cc/8cMhdYNv/1.png" alt="" class="img-fluid"/>
                </figure>
              </div>
              <div class="tab-pane" id="tab-2">
                <figure>
                  <img src="https://i.postimg.cc/kXPNM7vv/2.png" alt="" class="img-fluid"/>
                </figure>
              </div>
              <div class="tab-pane" id="tab-3">
                <figure>
                  <img src="https://i.postimg.cc/8PdRjxyQ/3.png" alt="" class="img-fluid"/>
                </figure>
              </div>
              <div class="tab-pane" id="tab-4">
                <figure>
                  <img src="https://i.postimg.cc/Wpk6Pdg4/4.png" alt="" class="img-fluid"/>
                </figure>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
        </div>
    )
}
