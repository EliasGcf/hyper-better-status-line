import { decorateConfig } from './config/decorateConfig';
import { StatusLine, HyperMiddleware } from './components/StatusLine';

export function decorateHyper(Hyper, { React }) {
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
}

export { decorateConfig, HyperMiddleware as middleware };
