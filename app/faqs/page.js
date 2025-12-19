import ChitFundFAQ from "../../components/ChitFundFAQ";
export default function FaQs() {
  return (
    <div className=" ">
      <div className="relative w-full h-auto ">
        <img
          src="/images/faqs.jpg"
          alt="FAQs Banner"
          fill
          className="object-cover"
        />
      </div>
      
        <section className="mt-2">
          <ChitFundFAQ/>
        </section>
    </div>
  );
}