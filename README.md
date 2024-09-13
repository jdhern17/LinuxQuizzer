# QuizzyLinx

First commit! Woot woot!

Here are the steps to get this far:

make the ec2 instance
t2 micro is fine
sec group allow ssh over instance connect and personal ip
allow http over personal ip
sec group allow 8080 from custom tcp on my personal ip
sudo yum update -y
curl -fsSL https://code-server.dev/install.sh | sh
sudo code-server --bind-addr 0.0.0.0:8080 to get it started
to avoid safari tab reload:
sudo nano /lib/systemd/system/code-server.service
—
[Unit]
Description=code-server
After=network.target

[Service]
Type=simple
User=ec2-user
ExecStart=/usr/bin/code-server --bind-addr 0.0.0.0:8080

[Install]
WantedBy=multi-user.target
—
sudo systemctl daemon-reload
sudo systemctl enable code-server --now

sign in

sudo yum install git -y
