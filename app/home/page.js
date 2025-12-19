import Header from '../../components/Header';
import Hero from '../../components/Hero';
import PlansGrid from '../../components/PlansGrid';
import WhyUs from '../../components/WhyUs';
import Footer from '../../components/Footer';
import PlansSection from '../../components/PlansSection';
import Vision from '../../components/Vision';
import BranchLocator from '../../components/BranchLocator';
import Withus from '../../components/Withus';
import RealStories from '../../components/RealStories';
import ContactComponent from '../../components/ContactComponent';
import AboutTabs from '../../components/AboutTabs';
import Leadership from '../../components/Leadership';
import CompanyList from '../../components/CompanyList';
import EnquiryForm from '../../components/EnquiryForm';

export default function Home() {
  return (
    <>
      
      <main className="w-full mx-auto px-4 sm:px-2 lg:px-2">
        <Hero />
       
        <section className="mt-12">
          <PlansSection/>
        </section>
        <section className="mt-12">
          <WhyUs />
        </section>
         <section className="mt-12">
          <Vision/>
        </section>
        <section className="mt-12">
          <BranchLocator/>
        </section>
         <section className="mt-12">
          <Withus/>
        </section>
        <section className="mt-12">
          <RealStories/>
        </section>
        <section className="mt-2">
          <ContactComponent/>
        </section>
        
       
      </main>
    
    </>
  );
}
