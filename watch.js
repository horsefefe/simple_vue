const watch = require('node-watch');
const child_process = require('child_process');
const exec = child_process.exec;
watch(['./test/src/components'], { recursive: true }, function(evt, name) {
    exec('node ./compile/index.js', function(err) {
        if (err) {
            console.log(err);
        }
    });
});
