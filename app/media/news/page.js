import NewsList from "../../../components/NewsList"; 

export default function News() {
  return (
    <div className=" ">
     <div className="relative w-full h-auto">
      <img 
    src="/images/news.jpg" 
    alt="arrow"
          
          className="object-cover"
  />
  </div>
      <section className="mt-2">
          <NewsList/>
        </section>
        
         
    </div>
  );
}