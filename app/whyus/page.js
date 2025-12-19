import AboutTabs from "../../components/AboutTabs";
import ChitFundFAQ from "../../components/ChitFundFAQ";
import ChitFundInteractive from "../../components/ChitFundInteractive";
import CompanyList from "../../components/CompanyList";
import EnquiryForm from "../../components/EnquiryForm";
import Leadership from "../../components/Leadership";
import CreateChitForm from "../admin/CreateChitForm";

export default function Whyus() {
  return (
    <div className=" ">
       <div className="relative w-full h-[25vh] sm:h-[30vh]  lg:h-screen">
      <img 
    src="/images/whyus.jpg" 
    alt="arrow"
    fill
          priority
          className="object-cover"
  />
  </div>
      
         <section className="mt-1">
          <ChitFundInteractive/>
        </section>
        <section className="mt-2">
          <AboutTabs/>
        </section>
         <section className="mt-2">
          <EnquiryForm/>
        </section>
        
        
    </div>
  );
}