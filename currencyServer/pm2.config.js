module.exports = {
  apps: [
    {
      name: "currencyServer",
      script: "./bin/www",
      watch: true,
      ignore_watch: ["node_modules", "./public"]
    }
  ]
}
