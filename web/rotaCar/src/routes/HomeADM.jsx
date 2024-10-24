import React, { useEffect } from 'react';
import Isotope from 'isotope-layout';
import styleHomeAdm from './HomeADM.module.css';

const HomeADM = () => {
  useEffect(() => {
    const grid = document.querySelector('.grid');
    new Isotope(grid, {
      itemSelector: '.element-item',
      layoutMode: 'fitRows',
    });
  }, []);

  return (
    <section id="services">
      <div className="col-md-10 offset-1">
        {/* Section Title */}
        <div className={styleHomeAdm.sectionTitle}>
          <h2>Services</h2>
          <p>This is an information about our services.</p>
        </div>
        {/* Button Filters */}
        <div className={`${styleHomeAdm.buttonGroup} filters-button-group`}>
          <button className={`${styleHomeAdm.button} is-checked`} data-filter="*">Show all</button>
          <button className={styleHomeAdm.button} data-filter=".service01">service 01</button>
          <button className={styleHomeAdm.button} data-filter=".service02">service 02</button>
          <button className={styleHomeAdm.button} data-filter=".service03">service 03</button>
          <button className={styleHomeAdm.button} data-filter=".service04">service 04</button>
        </div>
      </div>

      {/* Services Grid */}
      <div className="container">
        <div className="row grid">
          {/* Service 01 */}
          <div className="col-xs-12 col-md-6 col-lg-4 element-item service01">
            <div className={styleHomeAdm.card}>
              <div className={styleHomeAdm.circle}></div>
              <img className={styleHomeAdm.cardImgTop} src="https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png" alt="Service 01" />
              <div className={styleHomeAdm.cardBlock}>
                <h4 className={styleHomeAdm.cardTitle}>Service 01</h4>
                <div className={styleHomeAdm.cardText}>
                  <p className={styleHomeAdm.infoText}>Information</p>
                  <p className={styleHomeAdm.priceText}>Prices</p>
                </div>
              </div>
            </div>
          </div>

          {/* Service 02 */}
          <div className="col-xs-12 col-md-6 col-lg-4 element-item service02">
            <div className={styleHomeAdm.card}>
              <div className={styleHomeAdm.circle}></div>
              <img className={styleHomeAdm.cardImgTop} src="https://media.sproutsocial.com/uploads/2017/08/Social-Media-Video-Specs-Feature-Image.png" alt="Service 02" />
              <div className={styleHomeAdm.cardBlock}>
                <h4 className={styleHomeAdm.cardTitle}>Service 02</h4>
                <div className={styleHomeAdm.cardText}>
                  <p className={styleHomeAdm.infoText}>Information</p>
                  <p className={styleHomeAdm.priceText}>Prices</p>
                </div>
              </div>
            </div>
          </div>

          {/* Service 03 */}
          <div className="col-xs-12 col-md-6 col-lg-4 element-item service03">
            <div className={styleHomeAdm.card}>
              <div className={styleHomeAdm.circle}></div>
              <img className={styleHomeAdm.cardImgTop} src="https://media.sproutsocial.com/uploads/2017/08/Pinterest-Promoted-Video.png" alt="Service 03" />
              <div className={styleHomeAdm.cardBlock}>
                <h4 className={styleHomeAdm.cardTitle}>Service 03</h4>
                <div className={styleHomeAdm.cardText}>
                  <p className={styleHomeAdm.infoText}>Information</p>
                  <p className={styleHomeAdm.priceText}>Prices</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeADM;
