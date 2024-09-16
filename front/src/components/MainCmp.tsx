/* eslint-disable no-mixed-spaces-and-tabs */
import React, { FC, ReactNode } from 'react'


interface MainCmpProps {
    children: ReactNode; // This type can represent any valid React child: elements, strings, numbers, etc.
  }


const MainCmp : FC<MainCmpProps> = ({children}) => {
  return ( 
    <main id="main">
        <section id="articles" className="d-flex align-items-center">
          <div className="container position-relative" data-aos="fade-up" data-aos-delay="100">
              <div className="row justify-content-left">
        	       <div className="col-xl-12 col-lg-12 text-left">
                    {children}
                </div>
               </div>
          </div>
        </section>
    </main>
  )
}

export default  MainCmp
