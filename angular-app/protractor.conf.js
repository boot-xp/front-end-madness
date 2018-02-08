// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

const path = require('path');
const { SpecReporter } = require('jasmine-spec-reporter');
const { spawn } = require('child_process');

let backendProcess;
exports.config = {
  allScriptsTimeout: 11000,
  specs: [
    './e2e/**/*.e2e-spec.ts'
  ],
  capabilities: {
    'browserName': 'chrome'
  },
  directConnect: true,
  baseUrl: 'http://localhost:4200/',
  framework: 'jasmine',
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000,
    print: function() {}
  },
  onPrepare() {
    require('ts-node').register({
      project: 'e2e/tsconfig.e2e.json'
    });
    jasmine.getEnv().addReporter(new SpecReporter({ spec: { displayStacktrace: true } }));


    return startBackend();
  },
  onComplete() {
    if (!backendProcess && !backendProcess.killed)
      return;

    backendProcess.kill('SIGTERM');
  }
};

function startBackend() {
  return new Promise((resolve, reject) => {
    backendProcess = spawn('npm', ['start'], { cwd: path.resolve(__dirname, '..', 'backend'), shell: true });
    backendProcess.stdout.on('data', data => {
      if (data.indexOf('Now listening'))
        resolve();

      console.log(`BACKEND: ${data}`)
    });
    backendProcess.stderr.on('data', data => console.error(`BACKEND: ${data}`));
    backendProcess.on('close', code => console.log(`BACKEND: Exited with code ${code}`));
  })

}
