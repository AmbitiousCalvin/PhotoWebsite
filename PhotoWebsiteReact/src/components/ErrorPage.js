import errorImage from "../images/not-found.png"; // Import the image

const ErrorComponent = (props) => {
  return (
    <div className={`error-component ${props.custom_class}`}>
      <img
        src={props.image ? props.image : errorImage}
        alt="Error"
        className="error-image"
      />
      <div className="error-message">
        {props.html}
        {(!props.html && props.message) ||
          (!props.html && <p>An error occurred.</p>)}
      </div>
    </div>
  );
};

export default ErrorComponent;
