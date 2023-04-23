import React from 'react';
import './index.css';
import Header from './components/Header/Header';
import About from './components/About/About';
import ImageSection from './components/ImageSection/ImageSection';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <div className="App">
      <Header />
      <About />
      <ImageSection
        src="/images/solar-panels.jpg"
        alt="Solar panels"
        title="Off-Grid Solutions"
        text="Our off-grid solutions provide reliable and cost-effective electricity to customers in remote locations, without the need for a centralized power grid. With our off-grid solutions, you can access clean and sustainable energy anywhere, anytime."
      />
      <ImageSection
        src="/images/wind-turbines.jpg"
        alt="Wind turbines"
        title="Mini-Grid Solutions"
        text="Our mini-grid solutions are perfect for communities that require more power than individual off-grid systems can provide, but don't have access to a centralized power grid. Our mini-grids are scalable, modular, and designed to meet the needs of any community."
      />
      <ImageSection
        src="/images/power-lines.jpg"
        alt="Power lines"
        title="Grid Solutions"
        text="Our grid solutions connect businesses and households to a centralized power grid, providing reliable and sustainable energy to customers across Africa. We work closely with power utilities, governments, and regulators to ensure our grid solutions meet the needs of customers and communities."
      />
      <Footer />
    </div>
  );
}

export default App;