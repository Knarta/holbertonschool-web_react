import React from 'react';

function WithLogging(WrappedComponent) {
  const componentName =
    WrappedComponent.displayName || WrappedComponent.name || 'Component';

  /* eslint-disable react-hooks/unsupported-syntax -- HOC pattern requires inline class */
  class WithLoggingComponent extends React.Component {
    componentDidMount() {
      console.log(`Component ${componentName} is mounted`);
    }

    componentWillUnmount() {
      console.log(`Component ${componentName} is going to unmount`);
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }
  /* eslint-enable react-hooks/unsupported-syntax */

  WithLoggingComponent.displayName = `WithLogging(${componentName})`;
  return WithLoggingComponent;
}

export default WithLogging;