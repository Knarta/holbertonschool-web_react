import React from 'react';
import BodySection from './BodySection';
import './BodySectionWithMarginBottom.css';

const BodySectionWithMargin = ({ title, children }) => (
  <div className="bodySectionWithMargin">
    <BodySection title={title}>{children}</BodySection>
  </div>
);

export default BodySectionWithMargin;