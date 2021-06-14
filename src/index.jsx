import { reduceUI } from './utils/reduceUI';

import { decorateConfig } from './config/decorateConfig';
import { StatusLine, HyperMiddleware } from './components/StatusLine';

export function decorateHyper(Hyper, { React }) {
  return class extends React.PureComponent {
    render() {
      const { customChildren, hyperStatusLine } = this.props;
      const existingChildren = customChildren
        ? customChildren instanceof Array
          ? customChildren
          : [customChildren]
        : [];

      return (
        <Hyper
          {...this.props}
          customInnerChildren={existingChildren.concat(
            <StatusLine statusLineConfig={hyperStatusLine} />,
          )}
        />
      );
    }
  };
}

export function mapHyperState({ ui: { hyperStatusLine } }, map) {
  return Object.assign({}, map, {
    hyperStatusLine: Object.assign({}, hyperStatusLine),
  });
}

export { decorateConfig, reduceUI, HyperMiddleware as middleware };
