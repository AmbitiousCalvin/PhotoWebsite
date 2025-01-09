const Loading = () => {
  return (
    <div className="loading-container">
      <span className="dot" style={{ "--delay": "0s" }}></span>
      <span className="dot" style={{ "--delay": "0.2s" }}></span>
      <span className="dot" style={{ "--delay": "0.4s" }}></span>
      <span className="dot" style={{ "--delay": "0.6s" }}></span>
    </div>
  );
};

export { Loading };
