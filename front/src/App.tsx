import React from 'react'
import { BrowserRouter } from 'react-router-dom';
import Router from './router/Router';
import  ScrollToTop from './util/scroll-to-top/Main';


const App: React.FC = () => {
  return (
    <BrowserRouter> 
    <Router />
    <ScrollToTop />
  </BrowserRouter>
  )
}

export default App
