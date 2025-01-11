import errorImage from "../images/not-found.png"; // Import the image

const ErrorComponent = (props) => {
  return (
    <div className="error-component">
      <img src={errorImage} alt="Error" className="error-image" />
      <p className="error-message">{props.message || "An error occurred."}</p>
    </div>
  );
};

export default ErrorComponent;
