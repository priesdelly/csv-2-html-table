let gulp = require("gulp");
let babel = require("gulp-babel");

let src = "src/*.js";
let dist = "dist/";

function script() {
  return gulp
    .src(src)
    .pipe(
      babel({
        presets: ["@babel/env"],
      }).on("error", function(err) {
        console.error(err.message);
        this.emit("end");
      })
    )
    .pipe(gulp.dest(dist));
}

function scriptWatch() {
  gulp.watch(src, script);
}

exports.script = script;
exports.scriptWatch = scriptWatch;

gulp.task("default", gulp.series(gulp.parallel(script)));
