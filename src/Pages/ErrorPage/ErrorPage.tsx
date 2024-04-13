import { useNavigate } from "react-router-dom";
import "./ErrorPage.scss";
export function ErrorPage() {
    const navigate=useNavigate();
    function handleRedirectButton()
    {
        navigate("/");
    }
  return (
    <div className="error-page-wrapper">
      <div className="error-page-text-wrapper">
        <div className="error-page-heading">ERROR!!!!</div>
        <div className="error-page-subheading"><i>PAGE NOT FOUND</i></div>
        <div className="error-page-para-wrapper">
        <div className="error-page-para">
          The link is broken or the page has been moved.
        </div>
        </div>
        <div className="redirect-button-wrapper">
        <button className="redirect-home-button" onClick={handleRedirectButton}>Home Page</button>
        </div>
      </div>
    </div>
  );
}
