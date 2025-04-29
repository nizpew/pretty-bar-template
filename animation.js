const { exec } = require('child_process');
const fs = require('fs');
const ProgressBar = require('cli-progress');

// Path to your shell script
const shellScript = './specificscript.sh'; // Change this to your specific script
const errorLogPath = 'errorlog.txt'; // Path to save error logs
const executionTimePath = 'execution_time.txt'; // Path to save execution time

let spinnerIndex = 0;
const spinnerChars = ['-', '\\', '|', '/'];
let spinnerInterval;

// Function to read execution time from the file
const getExecutionTime = () => {
  try {
    if (fs.existsSync(executionTimePath)) {
      const data = fs.readFileSync(executionTimePath, 'utf8');
      const match = data.match(/Execution time: (\d+(\.\d+)?) seconds/);
      if (match) {
        return parseFloat(match[1]) * 1000; // Convert seconds to milliseconds
      }
    }
  } catch (err) {
    console.error('Error reading execution time:', err);
  }
  return 10000; // Default to 10 seconds if file doesn't exist or is empty
};

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
    
    // Write the execution time to a file
    const executionTimeMessage = `Execution time: ${(duration / 1000).toFixed(2)} seconds\n`;
    fs.writeFileSync(executionTimePath, executionTimeMessage);

    // Errors are logged in the errorLogPath but not displayed
  });

  // Get the maximum duration for the loading bar
  const maxDuration = getExecutionTime();

  // Update the loading bar based on elapsed time
  const interval = setInterval(() => {
    const elapsedTime = Date.now() - startTime;
    const progress = Math.min((elapsedTime / maxDuration) * 100, 100); // Use maxDuration

    bar.update(progress);

    if (progress >= 100) {
      clearInterval(interval); // Stop the interval when complete
    }
  }, 1000); // Update every second
};

// Run the shell script
runShellScript();
