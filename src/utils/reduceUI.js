import color from 'color';

export function reduceUI(state, { type, config }) {
  switch (type) {
    case 'CONFIG_LOAD':
    case 'CONFIG_RELOAD':
      const colorForeground = color(config.foregroundColor || '#fff');
      const colorBackground = color(config.backgroundColor || '#000');
      const colors = {
        foreground: colorForeground.string(),
        background: colorBackground.lighten(0.3).string(),
      };

      const configColors = Object.assign(
        {
          cyan: '#78D1E1',
          pink: '#FF79C6',
          lightYellow: '#ffff00',
          lightBlue: '#0066ff',
        },
        config.colors,
      );

      const hyperStatusLine = Object.assign(
        {
          footerTransparent: false,
          footerBackground: colors.background,
          footerForeground: colors.foreground,
          footerCwdHoverColor: 'none',
          footerBranchHoverColor: 'none',
          fontFamily: config.fontFamily,
          dirtyColor: configColors.lightYellow,
          aheadColor: configColors.lightBlue,
        },
        config.hyperStatusLine,
      );

      return state.set('hyperStatusLine', hyperStatusLine);
    default:
      return state;
  }
}
