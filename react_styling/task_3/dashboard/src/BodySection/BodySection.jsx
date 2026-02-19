const BodySection = ({ title, children }) => (
    <div className="bodySection p-4">
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      {children}
    </div>
  );
  
  export default BodySection;