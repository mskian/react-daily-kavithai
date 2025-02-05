import { Link } from "react-router-dom";
import { AlertTriangle } from "lucide-react";

const ErrorPage = () => {
  return (
    <section className="section has-text-centered mt-6">
      <div className="container">
        <AlertTriangle size={60} className="has-text-link mb-4" />
        <h1 className="title has-text-dark">404 - Page Not Found</h1>
        <p className="hash-text-dark">Oops! The page you are looking for does not exist.</p>
        <Link to="/" className="button is-warning mt-4">
          Go Back Home
        </Link>
      </div>
    </section>
  );
};

export default ErrorPage;
