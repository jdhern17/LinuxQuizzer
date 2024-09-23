const express = require('express');
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

app.listen(port, () => {
  console.log(`Dummy container running on port ${port}`);
});