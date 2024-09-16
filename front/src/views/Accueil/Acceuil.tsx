import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

const Acceuil: React.FC = () => {
  // You can replace this with dynamic data if needed
  const journee = "Today’s Date"; // Example static value. Replace with dynamic data if required.
  const navigate = useNavigate();

  const navigateTo = (path : string)=> {
       navigate(path);
  }

  return (
    <section id="hero" className="d-flex align-items-center">
      <div className="container position-relative" data-aos="fade-up" data-aos-delay="100">
        <div className="row justify-content-center">
          <div className="col-xl-7 col-lg-9 text-center">
            <label id="Titlelogo">محطة البركة للخدمات</label>
            <h2>Station El Baraka Service</h2>
            <h2>{journee}</h2> {/* Replace with dynamic data if needed */}
          </div>
        </div>
        <div className="text-center">
          {/* You can add additional content or components here if needed */}
        </div>

        <div className="row icon-boxes">
          <div onClick={()=> {navigateTo("/listearticle")}} className="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0" data-aos="zoom-in" data-aos-delay="200">
            <div className="icon-box">
              <div className="icon">
                <i className="icofont-files-stack"></i>
              </div>
              <h4 className="title">
                <a>Articles</a>
              </h4>
              <p className="description">Gestion des et suivi des Articles</p>
            </div>
          </div>

          <div className="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0" data-aos="zoom-in" data-aos-delay="300">
            <div className="icon-box">
              <div className="icon">
                <i className="icofont-car-alt-1"></i>
              </div>
              <h4 className="title">
                <a>Lavage</a>
              </h4>
              <p className="description">Gestion des et suivi du service Lavage</p>
            </div>
          </div>

          <div className="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0" data-aos="zoom-in" data-aos-delay="400">
            <div className="icon-box">
              <div className="icon">
                <i className="icofont-paper"></i>
              </div>
              <h4 className="title">
                <a href="Devis.php#Devis">Devis</a>
              </h4>
              <p className="description">Gestion des et suivi des Devis</p>
            </div>
          </div>

          <div className="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0" data-aos="zoom-in" data-aos-delay="500">
            <div className="icon-box">
              <div className="icon">
                <i className="icofont-file-text"></i>
              </div>
              <h4 className="title">
                <a href="ToutDemandes.php#Facture">Facture</a>
              </h4>
              <p className="description">Gestion des et suivi des Factures</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Acceuil;
