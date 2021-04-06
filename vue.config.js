module.exports = {
  css: {
    loaderOptions: {
      sass: {
        additionalData: `
          @import "@/assets/styles/_variables.scss";
          @import "@/assets/styles/main.scss";
        `
      }
    }
  }
};
