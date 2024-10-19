const { exec } = require('child_process');
const fs = require('fs');
const ProgressBar = require('cli-progress');

// Path to your shell script
const shellScript = './specificscript.sh'; // HERE YOU CHANGE THE SPECIFIC SCRIPT TO INSTALL EVERYTHING
const errorLogPath = 'errorlog.txt'; // Path to save error logs

let spinnerIndex = 0;
const spinnerChars = ['-', '\\', '|', '/'];
let spinnerInterval;

const startSpinner = () => {
  spinnerInterval = setInterval(() => {
    process.stdout.write(`\r${spinnerChars[spinnerIndex]}`);
    spinnerIndex = (spinnerIndex + 1) % spinnerChars.length;
  }, 100); // Update every 100ms
};

const stopSpinner = () => {
  clearInterval(spinnerInterval);
  process.stdout.write('\r \n'); // Clear the spinner
};

const runShellScript = () => {
  const bar = new ProgressBar.SingleBar({}, ProgressBar.Presets.shades_classic);
  
  // Start the loading bar
  bar.start(100, 0);

  // Start the spinner
  startSpinner();

  // Start the timer
  const startTime = Date.now();

  // Clear the error log file at the start
  fs.writeFileSync(errorLogPath, '');

  // Run the shell script with sudo
  const process = exec(`sudo bash ${shellScript}`, { shell: true });

  // Handle standard output
  process.stdout.on('data', () => {});

  // Handle standard error
  process.stderr.on('data', (data) => {
    fs.appendFileSync(errorLogPath, data); // Append error output to the log file
  });

  // Listen for process closure
  process.on('close', (code) => {
    stopSpinner(); // Stop the spinner
    bar.stop(); // Stop the loading bar
    const endTime = Date.now();
    const duration = endTime - startTime;

    console.log(`\nScript finished with exit code ${code} in ${(duration / 1000).toFixed(2)} seconds`);
    
    // Errors are logged in the errorLogPath but not displayed
  });

  // Update the loading bar based on elapsed time
  const interval = setInterval(() => {
    const elapsedTime = Date.now() - startTime;
    const progress = Math.min((elapsedTime / 10000) * 100, 100); // Adjust max duration as needed

    bar.update(progress);

    if (progress >= 100) {
      clearInterval(interval); // Stop the interval when complete
    }
  }, 1000); // Update every second
};

// Run the shell script
runShellScript();

