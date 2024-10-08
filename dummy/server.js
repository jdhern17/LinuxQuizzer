const express = require('express');
const { exec } = require('child_process'); // Import exec to run shell commands
const app = express();
const port = 3001;

// Dummy system statistics
app.get('/stats', (req, res) => {
  res.json({
    cpuUsage: 60,
    memoryUsage: 70,
    activeProcesses: [
      { name: 'Process1', cpu: 30, memory: 40 },
      { name: 'Process2', cpu: 20, memory: 15 },
    ],
  });
});

// New /get-processes endpoint
app.get('/get-processes', (req, res) => {
  exec('ps -aux', (err, stdout, stderr) => {
    if (err) {
      console.error(`Error: ${stderr}`);
      return res.status(500).json({ error: 'Failed to retrieve processes' });
    }
    return res.json({ processes: stdout }); // Send ps output as a JSON response
  });
});

app.listen(port, () => {
  console.log(`Dummy container running on port ${port}`);
});