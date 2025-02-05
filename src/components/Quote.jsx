import { useEffect, useState, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DOMPurify from "dompurify";
import { ArrowBigRight, ArrowBigLeft, MessageCircleHeart } from 'lucide-react';

// eslint-disable-next-line react/prop-types
const Quote = ({ setCurrentQuote }) => {
  const [quotes, setQuotes] = useState([]);
  const [index, setIndex] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();

  const fetchQuotes = useCallback(async () => {
    try {
      const res = await fetch("/kavithai.md");
      if (!res.ok) throw new Error("Failed to fetch quotes");

      const text = await res.text();
      const rawQuotes = text
        .split(/\n\s*\n/)
        .map((quote) => DOMPurify.sanitize(quote.trim())) 
        .filter((quote) => quote !== "");

      if (rawQuotes.length === 0) {
        setQuotes(["No quotes available."]);
        setCurrentQuote("No quotes available.");
        setIndex(0);
      } else {
        setQuotes(rawQuotes);

        const urlParams = new URLSearchParams(location.search);
        const urlIndex = parseInt(urlParams.get("q"), 10);
        const safeIndex = Number.isInteger(urlIndex) && urlIndex >= 0 && urlIndex < rawQuotes.length ? urlIndex : 0;

        setIndex(safeIndex);
        setCurrentQuote(rawQuotes[safeIndex]);
      }
    } catch {
      setQuotes(["Error loading quotes."]);
      setIndex(0);
    }
  }, [location.search, setCurrentQuote]);

  useEffect(() => {
    fetchQuotes();
  }, [fetchQuotes]);

  const prevQuote = () => navigate(`/?q=${Math.max(index - 1, 0)}`);
  const nextQuote = () => navigate(`/?q=${Math.min(index + 1, quotes.length - 1)}`);

  const quoteText = quotes[index] || "No quotes available.";

  return (
        <><div className="card">
      <div className="card-content">
        <MessageCircleHeart size={50} className="has-text-danger" />
        <p className="mt-5 mb-4">
          {quoteText.split("\n").map((line, i) => (
            <span key={i}>
              {line}
              <br />
            </span>
          ))}
        </p>
      </div>
    </div><div className="pagination">
        <button className="button is-small is-rounded" onClick={prevQuote} disabled={index === 0}>
          <ArrowBigLeft />
        </button>
        <span className="has-text-dark">{index + 1} / {quotes.length}</span>
        <button className="button is-small is-rounded" onClick={nextQuote} disabled={index === quotes.length - 1}>
          <ArrowBigRight />
        </button>
      </div></>
  );
};

export default Quote;
