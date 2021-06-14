export function decorateConfig(config) {
  return Object.assign({}, config, {
    css: `
      ${config.css || ''}
      .terms_terms {
        margin-bottom: 26px;
      }
    `,
  });
}
