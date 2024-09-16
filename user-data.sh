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