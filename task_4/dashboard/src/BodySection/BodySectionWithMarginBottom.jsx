import React from 'react';
import BodySection from './BodySection';

const BodySectionWithMargin = ({ title, children }) => (
  <div className="mb-10">
    <BodySection title={title}>{children}</BodySection>
  </div>
);

export default BodySectionWithMargin;