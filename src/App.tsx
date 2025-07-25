import Header from './components/Header';
import Hero from './components/Hero';
import ClientLogos from './components/ClientLogos';
import Services from './components/Services';
import CaseStudies from './components/CaseStudies';
import Testimonials from './components/Testimonials';
import Industries from './components/Industries';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import StickyButton from './components/StickyButton';
import Chatbot from './components/Chatbot';
import ATSComponent from './components/ATSComponent';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <ClientLogos />
      <Services />
      <CaseStudies />
      <Testimonials />
      <Industries />
      <section id="ats-matcher" className="py-20 bg-gray-50">
        <ATSComponent />
      </section>
      <FAQ />
      <Footer />
      <StickyButton />
      <Chatbot />
    </div>
  );
}

export default App;