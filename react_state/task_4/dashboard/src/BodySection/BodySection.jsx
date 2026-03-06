const BodySection = ({ title, children }) => (
    <div className="bodySection p-4">
      <h2 className="text-lg sm:text-xl font-semibold mb-2">{title}</h2>
      <div className="break-words">{children}</div>
    </div>
  );
  
  export default BodySection;