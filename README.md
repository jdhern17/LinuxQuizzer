# QuizzyLinx

## Latest Setup

Working with ChatGPT, we experienced issues with openssl and credential management, here is the current script:

```

#!/bin/bash

# Create a log file for debugging
LOGFILE="/var/log/user-data.log"
exec > $LOGFILE 2>&1

echo "Starting user-data script..."

# Set the HOME variable for ec2-user
export HOME="/home/ec2-user"

# Update and install necessary packages
sudo yum update -y
sudo yum install -y git

# Install code-server
echo "Installing code-server..."
curl -fsSL https://code-server.dev/install.sh | sh

# Ensure code-server is installed
if command -v code-server >/dev/null 2>&1; then
  echo "code-server installed successfully"
else
  echo "code-server installation failed"
fi

# Start code-server on port 8080
echo "Starting code-server on port 8080..."
sudo -u ec2-user code-server --bind-addr 0.0.0.0:8080 &

# Retrieve public IP and log it correctly
PUBLIC_IP=$(curl -s http://169.254.169.254/latest/meta-data/public-ipv4)
if [ -z "$PUBLIC_IP" ]; then
  echo "Failed to retrieve public IP"
else
  echo "Access code-server at http://$PUBLIC_IP:8080"
fi

echo "User-data script completed."

```




## EC2 Instance Setup for code-server

1. **Create an EC2 Instance**:
   - **Instance Type**: t2.micro (sufficient for this project)
   - **Operating System**: Amazon Linux 2023

2. **Configure Security Groups**:
   - **Allow SSH (Instance Connect)**: 
     - Port: 22
     - Source: Your personal IP address (for secure access).
   - **Allow HTTP**:
     - Port: 80 (for code-server access)
     - Source: Your personal IP address.
   - **Allow Custom TCP (for code-server)**:
     - Port: 8080
     - Source: Your personal IP address (since code-server is running on port 8080).

3. **Update the System**:
   - Once connected via **Instance Connect**, update the instance:
     ```bash
     sudo yum update -y
     ```

4. **Install code-server**:
   - Download and install code-server using the official script:
     ```bash
     curl -fsSL https://code-server.dev/install.sh | sh
     ```

---

### Persist code-server to Avoid Safari Reload Issues

To prevent Safari from reloading tabs when switching, we set up **code-server** to run as a service:

1. **Create a systemd Service for code-server**:
   ```bash
   sudo nano /lib/systemd/system/code-server.service
   ```

2. **Add the Following Configuration**:
   ```ini
   [Unit]
   Description=code-server
   After=network.target

   [Service]
   Type=simple
   User=ec2-user
   ExecStart=/usr/bin/code-server

   [Install]
   WantedBy=multi-user.target
   ```

3. **Reload systemd and Enable the Service**:
   ```bash
   sudo systemctl daemon-reload
   sudo systemctl enable code-server --now
   ```

---

### Set Up Git for Code Commits

1. **Install Git**:
   - Use the following command to install Git:
     ```bash
     sudo yum install git -y
     ```

2. **Sign In to GitHub**:
   - During your first commit, **authorize code-server** to connect to your GitHub account when prompted.

---

### Summary of Access and Configuration

- **EC2 instance**: t2.micro
- **Security Groups**: 
  - SSH (Instance Connect), 
  - HTTP (port 80), 
  - Custom TCP (port 8080), all restricted to your personal IP.
- **code-server**: Installed and running as a service.
- **Git**: Installed and authorized for use within code-server for commits.