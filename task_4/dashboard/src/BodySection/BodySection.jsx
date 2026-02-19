const BodySection = ({ title, children }) => (
    <div className="bodySection">
      <h2>{title}</h2>
      {children}
    </div>
  );
  
  export default BodySection;