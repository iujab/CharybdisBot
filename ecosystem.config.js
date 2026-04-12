module.exports = {
  apps: [
    {
      name: "azurlane-bot",
      script: "dist/index.js",
      autorestart: true,
      restart_delay: 5000,
    },
  ],
};
