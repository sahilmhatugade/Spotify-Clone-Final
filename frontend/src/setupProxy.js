const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "https://spotify23.p.rapidapi.com/search/?type=multi&offset=0&limit=10&numberOfTopResults=5",
      changeOrigin: true,
      pathRewrite: {
        "^/api": "", // Remove "/api" from the request path
      },
    })
  );
};
