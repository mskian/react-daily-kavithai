import { useEffect, useState, useCallback, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DOMPurify from "dompurify";
import { ArrowBigRight, ArrowBigLeft, MessageCircleHeart } from "lucide-react";

const CACHE = new Map();

// eslint-disable-next-line react/prop-types
const Quote = ({ setCurrentQuote }) => {
  const [quotes, setQuotes] = useState([]);
  const [index, setIndex] = useState(0);
  const [error, setError] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const parseQuotes = (text) => {
    return text
      .split(/\n\s*\n/)
      .map((quote) => DOMPurify.sanitize(quote.trim()))
      .filter((quote) => quote !== "");
  };

  const fetchQuotes = useCallback(async () => {
    try {
      if (CACHE.has("quotes")) {
        setQuotes(CACHE.get("quotes"));
        return;
      }

      const res = await fetch("/kavithai.md", { cache: "force-cache" });
      if (!res.ok) throw new Error("Failed to fetch quotes");

      const text = await res.text();
      const rawQuotes = parseQuotes(text);

      if (rawQuotes.length === 0) throw new Error("No quotes available.");

      CACHE.set("quotes", rawQuotes);
      setQuotes(rawQuotes);
    } catch (err) {
      setError(err.message);
      setQuotes([]);
    }
  }, []);

  useEffect(() => {
    fetchQuotes();
  }, [fetchQuotes]);

  useEffect(() => {
    if (quotes.length === 0) return;

    const urlParams = new URLSearchParams(location.search);
    const urlIndex = urlParams.get("q");

    if (urlIndex === null) {
      setIndex(0);
      setCurrentQuote(quotes[0]);
      setError("");
    } else {
      const parsedIndex = parseInt(urlIndex, 10);
      if (!Number.isInteger(parsedIndex) || parsedIndex < 0 || parsedIndex >= quotes.length) {
        setError("Invalid quote number. Please select a valid one.");
        setIndex(null);
        setCurrentQuote("");
      } else {
        setIndex(parsedIndex);
        setCurrentQuote(quotes[parsedIndex]);
        setError("");
      }
    }
  }, [quotes, location.search, setCurrentQuote]);

  const prevQuote = () => index > 0 && navigate(`/?q=${index - 1}`);
  const nextQuote = () => index < quotes.length - 1 && navigate(`/?q=${index + 1}`);

  const currentQuote = useMemo(() => (index !== null ? quotes[index] : ""), [quotes, index]);

  return (
    <>
      <div className="card">
        <div className="card-content">
          <MessageCircleHeart size={50} className="has-text-danger" />
          {error ? (
            <p className="has-text-danger">{error}</p>
          ) : (
            currentQuote && (
              <p className="mt-5 mb-4">
                {currentQuote.split("\n").map((line, i) => (
                  <span key={i}>
                    {line}
                    <br />
                  </span>
                ))}
              </p>
            )
          )}
        </div>
      </div>

      {quotes.length > 0 && !error && (
        <div className="pagination">
          <button className="button is-small is-rounded" onClick={prevQuote} disabled={index === 0}>
            <ArrowBigLeft />
          </button>
          <span className="has-text-black">
            {index + 1} of {quotes.length}
          </span>
          <button className="button is-small is-rounded" onClick={nextQuote} disabled={index === quotes.length - 1}>
            <ArrowBigRight />
          </button>
        </div>
      )}
    </>
  );
};

export default Quote;
