<!-- @file Instructions for using the talker sub-theme. -->
<!-- @defgroup sub_theming_sass -->
<!-- @ingroup sub_theming -->
# Talker Drupal Theme

The Talker theme extends the [Drupal Bootstrap](http://drupal.org/project/bootstrap) base theme
with a few additional features like using [gulp-sass](https://www.npmjs.com/package/gulp-sass)
as preprocessor and using [bootstrap-sass](https://www.npmjs.com/package/bootstrap-sass) nodejs package
instead of downloading it manually.

## Managing assets with Gulp.

The following tasks are performed with Gulp:
- compile SASS into CSS
- watch for changes in scss, js, or twig files then automatically compile and
  rebuild the Drupal cache

The use of Gulp in this manner is heavily influenced by the [Neato theme](https://www.drupal.org/project/neato)

## install instructions

Because Talker is a sub-theme of Drupal Bootstrap base theme. Drupal Bootstrap
needs to be downloaded and enabled along side of the Talker theme.

The Talker theme is still under development and it hasn't been deployed to drupal.org or packagist yet.

If a Drupal 8 project was created with the [composer template](https://github.com/drupal-composer/drupal-project),
then the Talker theme repository would need to be added to the project's composer.json file by the following command:
composer config repositories.drupal-theme-talker vcs https://github.com/llslim/drupal-theme-talker

Then use 'require' to get the theme like usual:
composer require llslim/drupal-theme-talker


For more on Bootstrap go to [getbootstrap.com](http://getbootstrap.com)
