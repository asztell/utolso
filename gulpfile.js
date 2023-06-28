/**
 * Gulp file used for creating front end templates on local instances.
 */
"use strict";

// Configs
// Webpack Configs
import * as config from "./config/general.config.js";
import webpack_config_dev from "./config/webpack.config.js";
import * as template_config from "./config/template.data.js";

// The gulp task runner
import gulp from "gulp";

// CSS
import dartSass from "sass";
import gulpSass from "gulp-sass";
import prefix from "gulp-autoprefixer";
import sourcemaps from "gulp-sourcemaps";

//Node Server
import nodemon from "nodemon";

// Images
import imagemin from "gulp-imagemin";

// HTML Templating, we use mustache to ensure it works with the Live Drupal site
import mustache from "gulp-mustache";

// Javasript - WebPack Version
import webpack from "webpack-stream";
import * as babel from "gulp-babel";
import * as uglify from "gulp-uglify";

// Browser Sync to auto refresh and keep things quick
import * as browserSyncModule from "browser-sync";
const browserSync = browserSyncModule.create();

// General Use Packages
import rename from "gulp-rename";
import * as fs from "fs";
import git from "gulp-git";

const sass = gulpSass(dartSass);

// Global
// Can be set either Dynamically using a date stamp
// or set manually by overriding the below with a string.
const _devFolder = config.development_folder || ".local_server";
const _prodFolder = config.production_folder || "prod";
const _imageFolderName = config.image_folder || "img";
let _logfile = "";

// Error handling
// Add the Error to the Browser Sync message so you can see it easily
function errorLog($err) {
  console.log($err);
  browserSync.notify(
    '<span style="file-size: 22px;">Error : ' + $err + "</span>",
    10000
  );
  this.emit("end");
}

function infoLog($message) {
  const ts = new Date();
  $message =
    "\n" +
    "[" +
    ts.getDate() +
    "/" +
    (ts.getMonth() + 1) +
    "/" +
    ts.getFullYear() +
    " -- " +
    ts.getHours() +
    ":" +
    ts.getMinutes() +
    "]  " +
    (_logfile === "" ? "Info task started" : $message);

  // grab the log file
  if (_logfile === "") {
    fs.readFile("./logs/.logfile.txt", "utf8", function ($err, $data) {
      if ($err) {
        console.log("Error with logging file", $err);
      } else {
        // Store the data we have saved
        _logfile = $data;
        _logfile += $message;
        // Write with the new message
        fs.writeFile("./logs/.logfile.txt", _logfile, function () {
          // file logged
          return;
        });
      }
    });
  } else {
    // Append the new message
    _logfile += $message;

    // If git changes exist then also write these out
    git.exec({
      args: "log",
      function($err, $out) {
        _logfile += "\n" + "Git changes : " + $out;
      },
    });

    // Write to file
    fs.writeFile("./logs/.logfile.txt", _logfile, function () {
      // file logged
      return;
    });
  }
}

// Browser Sync Server runing on default 3030 //

/*=====================================
=            Watched Tasks            =
=====================================*/

// Sass Task Runner
export function sassTask() {
  // Log this change
  infoLog("Sass ran on files");

  // Return the task
  return gulp
    .src("./app/sass/**/*.scss")
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: "compressed", includePaths: ["./app/sass"] }))
    .on("error", errorLog)
    .pipe(
      prefix({
        browsers: ["last 2 versions"],
      })
    )
    .pipe(sourcemaps.write("./"))
    .pipe(gulp.dest("./" + _devFolder + "/css"));
}

//Node server task
function server() {
  // configure nodemon
  nodemon({
    // the script to run the app
    script: "server/app.js",
    // this listens to changes in any of these files/routes and restarts the application
    watch: ["server/app.js"],
    ext: "js",
  }).on("restart", function () {
    infoLog("restarted!");
  });
}

// Scripts runner, this time using the Webpack Framework
function scripts() {
  // Log this change
  infoLog("Scripts ran on main.js");

  // Return the task
  return gulp
    .src("./app/scripts/index.tsx")
    .pipe(webpack(webpack_config_dev))
    .on("error", errorLog)
    .pipe(gulp.dest("./" + _devFolder + "/js/"))
    .on("error", errorLog);
}

// Scripts runner, this time using the Webpack Framework
gulp.task("minify", function () {
  // Log this change
  infoLog("Minify ran on the JS file");

  // Return the task
  return gulp
    .src("./prod/js/app.min.js")
    .pipe(uglify())
    .on("error", errorLog)
    .pipe(gulp.dest("./" + _devFolder + "/js/"))
    .on("error", errorLog);
});

// Template language compiler for taking Jade templates and moving them over to HTML files,
// this is an alternative to using the Jade Renderer on the Server
function mustacheTask() {
  // Log this change
  infoLog("Mustache Templates ran on the HTML files");

  // Data for the site can be loaded via a JSON file
  return gulp
    .src(["./app/views/*.mustache"])
    .on("error", errorLog)
    .pipe(mustache(template_config))
    .on("error", errorLog)
    .pipe(
      rename(function (path) {
        path.extname = ".html";
      })
    )
    .pipe(gulp.dest("./" + _devFolder + "/"))
    .on("error", errorLog)
    .pipe(browserSync.stream());
}

/*=========================================
=            Non Watched Tasks            =
=       all need to be self executed      =
=========================================*/

// Scripts runner, converts all the third party JS and CSS etc. to a single vendor based file
// then compresses file and puts it in the correct folder.
function vendorJS() {
  // Log this change
  infoLog("Vendor JS Scripts ran");

  // All the vendor JS
  return gulp
    .src("./app/third_party/**/*.js")
    .pipe(uglify())
    .pipe(gulp.dest("./" + _devFolder + "/js"));
}

function vendorCSS() {
  // Log this change
  infoLog("Vendor CSS Scripts ran");

  // All the vendor CSS
  return gulp
    .src("./app/third_party/**/*.css")
    .pipe(gulp.dest("./" + _devFolder + "/css"));
}

function vendorWC() {
  // Log this change
  infoLog("Vendor web components Scripts ran");

  return gulp
    .src("./app/third_party/web_components/**/*")
    .pipe(gulp.dest("./" + _devFolder + "/web_components"));
}

// Clear out metadata from Photohshop Images and Shrink em' Down, has to be self exectued
// as there are a few bugs with del and watching etc.
export function images() {
  // Log this change
  infoLog("Image Minification ran");

  // Create the new images
  return gulp
    .src("./app/images/**/*")
    .pipe(
      imagemin({
        progressive: true,
        svgoPlugins: [{ removeViewBox: false }],
      })
    )
    .on("error", errorLog)
    .pipe(gulp.dest("./" + _devFolder + "/" + _imageFolderName + "/"));
}

function browserSyncReload(done) {
  browserSync.reload();
  done();
}

function browserSyncServe(done) {
  browserSync.init({
    server: "./" + _devFolder,
    port: config.dev_port || 3030,
  });
  done();
}

function watchTask() {
  gulp.watch(
    [
      "./app/scripts/**/*.jsx",
      "./app/scripts/**/*.js",
      "./app/scripts/**/*.tsx",
      "./app/scripts/**/*.ts",
      "!./app/scripts/**/*.test.tsx",
      "!./app/scripts/**/*.test.ts",
    ],
    gulp.series(scripts, browserSyncReload)
  );
  gulp.watch(["./app/**/*.scss"], gulp.series(sassTask, browserSyncReload));
  gulp.watch(
    ["./app/**/*.mustache", "./app/**/*.json", "./app/**/*.html"],
    gulp.series(mustacheTask, browserSyncReload)
  );
}

export const watch = gulp.parallel(
  gulp.series(
    images,
    mustacheTask,
    scripts,
    sassTask,
    browserSyncServe,
    watchTask
  ),
  server
);
// exports.watch = watch;

export const dev_server = gulp.series(
  images,
  mustacheTask,
  scripts,
  sassTask,
  browserSyncServe,
  watchTask
);

export const compile = gulp.series(images, mustacheTask, scripts, sassTask);

export const vendor = gulp.series(vendorJS, vendorCSS, vendorWC);

function prodJS() {
  // Log this change
  infoLog("Setup JS for Prod");

  // Javascript for Prod
  return gulp
    .src("./" + _devFolder + "/js/**/*.js")
    .pipe(
      babel({
        presets: ["@babel/env", "@babel/preset-react"],
      })
    )
    .pipe(uglify())
    .on("error", errorLog)
    .pipe(gulp.dest("./" + _prodFolder + "/js/"));
}

function prodCSS() {
  // Log this change
  infoLog("Setup CSS for Prod");

  // Sass for Prod
  return gulp
    .src("./" + _devFolder + "/css/**/*.css")
    .on("error", errorLog)
    .pipe(gulp.dest("./" + _prodFolder + "/css/"));
}

function prodHTML() {
  // Log this change
  infoLog("Setup HTML for Prod");

  // HTML for Prod
  return gulp
    .src("./" + _devFolder + "/css/**/*.html")
    .on("error", errorLog)
    .pipe(gulp.dest("./" + _prodFolder + "/"));
}

export const prod = gulp.series(
  images,
  mustacheTask,
  scripts,
  sassTask,
  prodJS,
  prodCSS,
  prodHTML
);
