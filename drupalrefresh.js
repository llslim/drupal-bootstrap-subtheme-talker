module.exports = {
  browserSync: {
    hostname: "d8lls.lab.localhost",
    port: 8080,
    openAutomatically: true,
    reloadDelay: 50,
    injectChanges: true,
  },

  drush: {
    enabled: false,
    alias: {
      css_js: 'drush @d8lls.lab cc css-js',
      cr: 'drush @d8lls.lab cr'
    }
  },

  twig: {
    useCache: true
  }
};
