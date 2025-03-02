const express = require('express');
const si = require('systeminformation');
const app = express();
const port = 3001;

// Dummy system statistics
app.get('/health', (req, res) => {
  res.json({
message: 'This is a healthy response',
simpleValue: "healthy",
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