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

      const platform = process.platform;

      const hyperStatusLine = Object.assign(
        {
          isTransparent: false,
          background: colors.background,
          foreground: colors.foreground,
          cwdHoverColor: 'none',
          branchHoverColor: 'none',
          fontFamily: config.fontFamily,
          dirtyColor: configColors.lightYellow,
          aheadColor: configColors.lightBlue,
          platform,
        },
        config.hyperStatusLine,
      );

      return state.set('hyperStatusLine', hyperStatusLine);
    default:
      return state;
  }
}
