import React from 'react';

function WithLogging(WrappedComponent) {
  const componentName =
    WrappedComponent.displayName || WrappedComponent.name || 'Component';

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

  WithLoggingComponent.displayName = `WithLogging(${componentName})`;
  return WithLoggingComponent;
}

export default WithLogging;