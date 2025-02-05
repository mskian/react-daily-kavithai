import { useState } from "react";
import Quote from "../components/Quote";
import ShareBar from "../components/ShareBar";

const Home = () => {
  const [currentQuote, setCurrentQuote] = useState("");

  return (
    <section className="section full-height">
    <div className="container">
      <Quote setCurrentQuote={setCurrentQuote} />
      <ShareBar quote={currentQuote} />
    </div>
    </section>
  );
};

export default Home;
