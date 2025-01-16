import { MainContent } from "../main";
import notFound from "../images/error-404.gif"; // Import the image
import "../styles/error.css";
import { memo } from "react";
import { Link } from "react-router-dom";

function NotFoundpage(props) {
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
          <h1 class="not-found-title">
            Oops! {props.title || `Page Not Found`}
          </h1>
          <p class="not-found-message">
            {!props.message && `We couldn’t find that page. Try going back to the`}
            {props.message && `Please head back to the homepage and pick an image to preview.`}
            {" "}
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
