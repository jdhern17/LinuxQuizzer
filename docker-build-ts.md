# Docker Compose Troubleshooting with `sar` and `sysstat`

## Problem
While running `docker-compose up --build`, the system was crashing, and we suspected that it was due to resource consumption. To troubleshoot the performance issues, we decided to monitor system performance using `sar` from the `sysstat` package.

## Tools Used
- **sysstat**: A collection of performance monitoring tools for Linux, including `sar`.
- **sar**: A tool to collect and report on system activity, especially CPU, memory, and I/O.

## Step-by-Step Troubleshooting

### 1. Install `sysstat`
We installed `sysstat` on the EC2 instance to use `sar` for performance monitoring:

```bash
sudo yum install sysstat -y
```

### 2. Enable `sysstat` (starts the `sar` command)
Once installed, we enabled `sysstat` to start collecting performance data:

```bash
sudo systemctl enable sysstat
sudo systemctl start sysstat
```

### 3. Verify `sysstat` is Running
To make sure the service is running and collecting data, we checked its status:

```bash
sudo systemctl status sysstat
```

We also verified that `sar` was working by checking the performance logs:

```bash
sar
```

### 4. Running `docker-compose up --build`
While `sysstat` was running, we attempted the `docker-compose up --build` command with logging to capture potential issues:

```bash
docker-compose up --build > docker-compose.log 2>&1
```

### 5. Analyzing Performance Data with `sar`
To see how the system performed during the build process, we ran:

```bash
sar -u
```

This command reported CPU usage and other system metrics to analyze whether high resource consumption was causing the issue.

### 6. Results
- **No crash**: During this troubleshooting session, the system did not crash, leading us to suspect that previous crashes may have been caused by a misconfigured `package.json`.
- **Performance stable**: The `sar` data showed that system resources were stable and not overutilized.

### 7. Stopping `sysstat` (Once Troubleshooting is Complete)
After successfully troubleshooting, we disabled `sysstat` to stop monitoring:

```bash
sudo systemctl stop sysstat
sudo systemctl disable sysstat
```

### Conclusion
By using `sar` and `sysstat`, we were able to monitor the system's performance during a potentially resource-intensive task. Although the system did not crash during this session, this approach helped verify that the issue was not due to system resource consumption.

### Future Use
If you encounter performance issues in the future, follow these steps to reinstall and use `sysstat` and `sar` for monitoring. Simply re-enable `sysstat` if needed for monitoring performance.