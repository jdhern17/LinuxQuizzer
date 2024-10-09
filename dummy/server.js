const express = require('express');
const si = require('systeminformation');
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

// Refactored /get-processes endpoint using systeminformation
app.get('/get-processes', async (req, res) => {
  try {
    const processes = await si.processes(); // Get the list of processes
    res.json({ processes: processes.list }); // Send the process list as a JSON response
  } catch (error) {
    console.error(`Error: ${error.message}`);
    res.status(500).json({ error: 'Failed to retrieve processes' });
  }
});

app.listen(port, () => {
  console.log(`Dummy container running on port ${port}`);
});