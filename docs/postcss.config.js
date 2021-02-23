module.exports = {
  plugins: [
    require("tailwindcss")({
      config: 'docs/tailwind.config.js'
    }),
    require("autoprefixer"),
    ...(process.env.NODE_ENV === "production" ? [require("cssnano")] : []),
  ],
};
