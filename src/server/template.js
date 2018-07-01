export default (markup, initialState, isProduction, initialI18nStore, initialLanguage) => {
  const staticUrl = '/static';
  const css = `\n      <link rel="stylesheet" href="${staticUrl}/build/main.css">`;

  return `
  <!DOCTYPE html>
  <html>
    <head>
      <title>LoL Stats</title>${isProduction ? css : ''}
      <script type="application/javascript">
        window.initialState = ${JSON.stringify(initialState)};
        window.initialI18nStore = JSON.parse('${JSON.stringify(initialI18nStore)}');
        window.initialLanguage = '${initialLanguage}';
      </script>
      <meta name="viewport" content="width=device-width">
    </head>
    <body>
      <div id="app">${markup}</div>
      <script src="${staticUrl}/build/main.js"></script>
    </body>
  </html>`;
};
