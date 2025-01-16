const Loading = (props) => {
  return (
    <div className={`loading-container ${props.class}`}>
      <span className="dot" style={{ "--delay": "0s" }}></span>
      <span className="dot" style={{ "--delay": "0.2s" }}></span>
      <span className="dot" style={{ "--delay": "0.4s" }}></span>
      <span className="dot" style={{ "--delay": "0.6s" }}></span>
    </div>
  );
};

const InitialLoading = () => (
  <div className="initial-loading-container">
    <div className="spinner">
      <div
        className="line"
        style={{ "--delay": "0s", "--height": "4rem" }}
      ></div>
      <div
        className="line"
        style={{ "--delay": "0.15s", "--height": "5rem" }}
      ></div>
      <div
        className="line"
        style={{ "--delay": "0.3s", "--height": "6rem" }}
      ></div>
      <div
        className="line"
        style={{ "--delay": "0.15s", "--height": "5rem" }}
      ></div>
      <div
        className="line"
        style={{ "--delay": "0s", "--height": "4rem" }}
      ></div>
    </div>
  </div>
);

export { Loading, InitialLoading };
