const { decorateConfig } = require('./config/decorateConfig');
const { StatusLine, HyperMiddleware } = require('./components/StatusLine');

exports.decorateConfig = decorateConfig;

exports.decorateHyper = (Hyper, { React }) => {
  return class extends React.PureComponent {
    render() {
      const { customChildren } = this.props;
      const existingChildren = customChildren
        ? customChildren instanceof Array
          ? customChildren
          : [customChildren]
        : [];

      return React.createElement(
        Hyper,
        Object.assign({}, this.props, {
          customInnerChildren: existingChildren.concat(React.createElement(StatusLine)),
        }),
      );
    }
  };
};

exports.middleware = HyperMiddleware;
