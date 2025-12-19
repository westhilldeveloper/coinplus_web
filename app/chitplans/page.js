import AboutTabs from "../../components/AboutTabs";
import ChitFundInteractive from "../../components/ChitFundInteractive";
import ChitPlansComponent from "../../components/ChitPlansComponent";
import CompanyList from "../../components/CompanyList";
import EnquiryForm from "../../components/EnquiryForm";
import Leadership from "../../components/Leadership";

export default function About() {
  return (
    <div className=" ">
      <div className="relative w-full h-auto ">
        <img
          src="/images/cuteFamily.jpg"
          alt="FAQs Banner"
          fill
          className="object-cover"
        />
      </div>
     
      <section className="mt-2">
          <ChitPlansComponent/>
        </section>
        
         
    </div>
  );
}