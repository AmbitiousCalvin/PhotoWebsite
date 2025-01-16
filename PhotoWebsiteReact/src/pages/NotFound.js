import { MainContent } from "../main";
import { Slider } from "../components/slider";
import notFound from "../images/error-404.gif"; // Import the image
import "../styles/slider.css";
import { memo } from "react";
import { Link } from "react-router-dom";

function NotFoundpage() {
  return (
    <div className="not-found-page">
      <MainContent
        items={[]}
        loading={false}
        image={notFound}
        custom_class={"not-found"}
        error={"not-found"}
      >
        <div class="not-found-container">
          <h1 class="not-found-title">Oops! Page Not Found</h1>
          <p class="not-found-message">
            We couldn’t find that page. Try going back to the{" "}
            <Link to="/" class="home-link">
              Home Page
            </Link>{" "}
          </p>
          <p class="not-found-message">
            Need help? <Link className="contact-link">Contact us!</Link>
          </p>
        </div>
      </MainContent>
    </div>
  );
}

const MemoizedNotFound = memo(NotFoundpage);

export { MemoizedNotFound as NotFoundpage };
