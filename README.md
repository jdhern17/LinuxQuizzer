# Quinux App

## Daily Build

This guide outlines how to set up an EC2 instance (currently t3.small) running `code-server` with **HTTPS**, a **daily rotating password**, and restricted access to your personal IP address. This setup leverages a **self-signed certificate** to secure traffic and ensures only authorized users can access the server.

1. **Create EC2 Instance in AWS**

2. **Copy User Data Script into User Data Field** 

3. **Launch EC2 Instance and enter code-server**

4. **Environment setup**


```bash
sudo curl -L "https://github.com/docker/compose/releases/download/v2.3.3/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

sudo chmod +x /usr/local/bin/docker-compose

```

```bash
curl -sL https://rpm.nodesource.com/setup_18.x | sudo bash -

sudo yum install -y nodejs

```

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
