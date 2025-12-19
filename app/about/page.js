import AboutTabs from "../../components/AboutTabs";
import ChitFundInteractive from "../../components/ChitFundInteractive";
import CompanyList from "../../components/CompanyList";
import EnquiryForm from "../../components/EnquiryForm";
import Leadership from "../../components/Leadership";

export default function About() {
  return (
    <div className=" ">
      <div className="relative w-full h-auto ">
      <img 
    src="/images/aboutus.jpg" 
    alt="arrow"
    fill
          className="object-cover"
  />
  </div>
      <section className="mt-2">
          <AboutTabs/>
        </section>
         <section className="mt-2">
          <Leadership/>
        </section>
        <section className="mt-2">
          <CompanyList/>
          </section>
          <section className="mt-2">
          <EnquiryForm/>
        </section>
         
    </div>
  );
}