# QuizzyLinx (with assistance from ChatGPT)


# command to download docker-compose once in code-server

```bash


sudo curl -L "https://github.com/docker/compose/releases/download/v2.3.3/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

```


# updated script to have code-server run on every start (9/15)

```bash

#!/bin/bash

# Create a log file for debugging
LOGFILE="/var/log/user-data.log"
exec > $LOGFILE 2>&1

echo "Starting user-data script..."

# Set the HOME variable for ec2-user
export HOME="/home/ec2-user"

# Update and install necessary packages
sudo yum update -y
sudo yum install -y git openssl

# Install Docker
echo "Installing Docker..."
sudo yum install -y docker

# Start and enable Docker service
sudo systemctl start docker
sudo systemctl enable docker

# Add ec2-user to the docker group so you can run docker without sudo
sudo usermod -aG docker ec2-user

# Install code-server
echo "Installing code-server..."
curl -fsSL https://code-server.dev/install.sh | sh

# Ensure code-server is installed
if command -v code-server >/dev/null 2>&1; then
  echo "code-server installed successfully"
else
  echo "code-server installation failed"
  exit 1
fi

# Generate a self-signed SSL certificate
SSL_DIR="/etc/ssl/code-server"
sudo mkdir -p $SSL_DIR
sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout $SSL_DIR/selfsigned.key -out $SSL_DIR/selfsigned.crt -subj "/C=US/ST=State/L=City/O=Organization/OU=OrgUnit/CN=localhost"

# Change ownership and set permissions for SSL files to allow ec2-user access
sudo chown -R ec2-user:ec2-user $SSL_DIR
sudo chmod 600 $SSL_DIR/selfsigned.key

# Create config file for code-server with hardcoded password
echo "Configuring code-server with hardcoded password..."
sudo mkdir -p /home/ec2-user/.config/code-server/
cat <<EOF | sudo tee /home/ec2-user/.config/code-server/config.yaml
bind-addr: 0.0.0.0:8443
auth: password
password: "your_hardcoded_password_here"
cert: $SSL_DIR/selfsigned.crt
cert-key: $SSL_DIR/selfsigned.key
EOF

# Ensure ec2-user owns the config directory
sudo chown -R ec2-user:ec2-user /home/ec2-user/.config/code-server/

# Create systemd service for code-server
echo "Creating systemd service for code-server..."
cat <<EOF | sudo tee /etc/systemd/system/code-server.service
[Unit]
Description=code-server
After=network.target

[Service]
Type=simple
User=ec2-user
ExecStart=/usr/bin/code-server --bind-addr 0.0.0.0:8443

[Install]
WantedBy=multi-user.target
EOF

# Reload systemd and enable code-server to start on boot
sudo systemctl daemon-reload
sudo systemctl enable code-server

# Start code-server immediately
sudo systemctl start code-server

# Retrieve public IP and log it correctly
PUBLIC_IP=$(curl -s http://169.254.169.254/latest/meta-data/public-ipv4)
if [ -z "$PUBLIC_IP" ]; then
  echo "Failed to retrieve public IP"
else
  echo "Access code-server at https://$PUBLIC_IP:8443 (Self-signed certificate)"
fi

echo "User-data script completed."

```

# integrated docker installation into user data script

```bash
#!/bin/bash

# Create a log file for debugging
LOGFILE="/var/log/user-data.log"
exec > $LOGFILE 2>&1

echo "Starting user-data script..."

# Set the HOME variable for ec2-user
export HOME="/home/ec2-user"

# Update and install necessary packages
sudo yum update -y
sudo yum install -y git openssl

# Install Docker
echo "Installing Docker..."
sudo yum install -y docker

# Start and enable Docker service
sudo systemctl start docker
sudo systemctl enable docker

# Add ec2-user to the docker group so you can run docker without sudo
sudo usermod -aG docker ec2-user

# Install code-server
echo "Installing code-server..."
curl -fsSL https://code-server.dev/install.sh | sh

# Ensure code-server is installed
if command -v code-server >/dev/null 2>&1; then
  echo "code-server installed successfully"
else
  echo "code-server installation failed"
  exit 1
fi

# Generate a self-signed SSL certificate
SSL_DIR="/etc/ssl/code-server"
sudo mkdir -p $SSL_DIR
sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout $SSL_DIR/selfsigned.key -out $SSL_DIR/selfsigned.crt -subj "/C=US/ST=State/L=City/O=Organization/OU=OrgUnit/CN=localhost"

# Change ownership and set permissions for SSL files to allow ec2-user access
sudo chown -R ec2-user:ec2-user $SSL_DIR
sudo chmod 600 $SSL_DIR/selfsigned.key

# Create config file for code-server with hardcoded password
echo "Configuring code-server with hardcoded password..."
sudo mkdir -p /home/ec2-user/.config/code-server/
cat <<EOF | sudo tee /home/ec2-user/.config/code-server/config.yaml
bind-addr: 0.0.0.0:8443
auth: password
password: "your_hardcoded_password_here"
cert: $SSL_DIR/selfsigned.crt
cert-key: $SSL_DIR/selfsigned.key
EOF

# Ensure ec2-user owns the config directory
sudo chown -R ec2-user:ec2-user /home/ec2-user/.config/code-server/

# Start code-server on port 8443 (HTTPS) with the self-signed certificate
echo "Starting code-server on port 8443 with HTTPS..."
sudo -u ec2-user code-server --bind-addr 0.0.0.0:8443 --cert $SSL_DIR/selfsigned.crt --cert-key $SSL_DIR/selfsigned.key &

# Retrieve public IP and log it correctly
PUBLIC_IP=$(curl -s http://169.254.169.254/latest/meta-data/public-ipv4)
if [ -z "$PUBLIC_IP" ]; then
  echo "Failed to retrieve public IP"
else
  echo "Access code-server at https://$PUBLIC_IP:8443 (Self-signed certificate)"
fi

echo "User-data script completed."

```

# EC2 Instance Setup for Secure code-server Access 9/14

This guide outlines how to set up an EC2 instance running `code-server` with **HTTPS**, a **daily rotating password**, and restricted access to your personal IP address. This setup leverages a **self-signed certificate** to secure traffic and ensures only authorized users can access the server.

## Security Measures

We have implemented the following security measures:

1. **Self-Signed SSL Certificate**:
   - The code-server instance uses HTTPS secured by a self-signed certificate to encrypt traffic between your machine and the server.
   - While this does trigger browser warnings due to the self-signed nature, it still encrypts data, preventing potential interception (Man-in-the-Middle attacks).

2. **Daily Rotating Password**:
   - The `code-server` is secured using a hardcoded password that can be changed daily. This ensures that even if an attacker obtains the password, it is only valid for a short period.

3. **IP Restriction**:
   - The instance's security group is configured to restrict access to the server from only **your personal IP**. This prevents unauthorized users from attempting to access your server.

---

## User Data Script

Below is the user data script used to provision and secure the EC2 instance with the above measures:

```bash
#!/bin/bash

# Create a log file for debugging
LOGFILE="/var/log/user-data.log"
exec > $LOGFILE 2>&1

echo "Starting user-data script..."

# Set the HOME variable for ec2-user
export HOME="/home/ec2-user"

# Update and install necessary packages
sudo yum update -y
sudo yum install -y git openssl

# Install code-server
echo "Installing code-server..."
curl -fsSL https://code-server.dev/install.sh | sh

# Ensure code-server is installed
if command -v code-server >/dev/null 2>&1; then
  echo "code-server installed successfully"
else
  echo "code-server installation failed"
  exit 1
fi

# Generate a self-signed SSL certificate
SSL_DIR="/etc/ssl/code-server"
sudo mkdir -p $SSL_DIR
sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout $SSL_DIR/selfsigned.key -out $SSL_DIR/selfsigned.crt -subj "/C=US/ST=State/L=City/O=Organization/OU=OrgUnit/CN=localhost"

# Change ownership and set permissions for SSL files to allow ec2-user access
sudo chown -R ec2-user:ec2-user $SSL_DIR
sudo chmod 600 $SSL_DIR/selfsigned.key

# Create config file for code-server with hardcoded password
echo "Configuring code-server with hardcoded password..."
sudo mkdir -p /home/ec2-user/.config/code-server/
cat <<EOF | sudo tee /home/ec2-user/.config/code-server/config.yaml
bind-addr: 0.0.0.0:8443
auth: password
password: "your_daily_password_here"
cert: $SSL_DIR/selfsigned.crt
cert-key: $SSL_DIR/selfsigned.key
EOF

# Ensure ec2-user owns the config directory
sudo chown -R ec2-user:ec2-user /home/ec2-user/.config/code-server/

# Start code-server on port 8443 (HTTPS) with the self-signed certificate
echo "Starting code-server on port 8443 with HTTPS..."
sudo -u ec2-user code-server --bind-addr 0.0.0.0:8443 --cert $SSL_DIR/selfsigned.crt --cert-key $SSL_DIR/selfsigned.key &

# Retrieve public IP and log it correctly
PUBLIC_IP=$(curl -s http://169.254.169.254/latest/meta-data/public-ipv4)
if [ -z "$PUBLIC_IP" ]; then
  echo "Failed to retrieve public IP"
else
  echo "Access code-server at https://$PUBLIC_IP:8443 (Self-signed certificate)"
fi

echo "User-data script completed."

```

## How to Access

1.	IP Restriction: Ensure that your security group allows inbound access to port 8443 from your personal IP address only.
Example rule:

```

Type: Custom TCP Rule
Port Range: 8443
Source: [Your personal IP]

```

2. Browser Warnings: When accessing the server, your browser will display a warning due to the self-signed certificate. You can safely bypass this warning, as you control both the server and the certificate.

3.	Daily Password: Update the password in the script above for each new instance launch. You can automate password rotation or set it manually during each session.

## Security Summary

	•	Encryption: All communication between your machine and the code-server instance is encrypted via HTTPS using a self-signed certificate.
	•	Authentication: A hardcoded password provides an additional layer of security and should be rotated daily for increased protection.
	•	IP Whitelisting: Only your personal IP can access the server, significantly reducing the attack surface.


This setup strikes a balance between security and convenience while allowing you to access code-server securely on your EC2 instance. For enhanced security, you may consider switching to a valid SSL certificate or further automating password rotations.



---

## First version script 9/14

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




## EC2 Instance Setup for code-server (manual 9/13)

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