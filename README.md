# LinuxQuizzer App

The goal of this tool is to provide users a front-end to securely observe the health of a container.

![Front-End](./Screenshot%202025-10-04%20170334.png)

## Functionality

This project will initially use JavaScript package (`systeminformation`) and built-in module tools (`fs`) to deliver Linux commands with the following mappings and rationale:

| **Command**     | **Mapped Method/Module**                                                                                  | **Description**                                                                                       | **Discrepancies**                                                                                                  |
|-----------------|-----------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------|
| `top`           | `si.currentLoad()`                                                                                        | Provides info about current CPU load, which can be used to approximate data from `top`.     | `si.currentLoad()` doesn't show individual process information like `top`; provides overall system load.       |
| `chmod`         | `fs.chmod()`                                                               | Used to change file permissions. | `fs.chmod()` can fully replicate the functionality of `chmod` for file permission changes.                  |
| `ps`            | `si.processes()`                                                                                          | Returns a list of all processes, similar to `ps aux`, with details like PID, user, CPU, and memory usage.| `si.processes()` may not show as much detailed information, such as process states or TTY columns from `ps aux`.  |
| `df`            | `si.fsSize()`                                                                                             | Provides information about disk usage, mapping to the output of the `df` command.                     | `si.fsSize()` may not include certain filesystem types as `df`.          |
| `free`          | `si.mem()`                                                                                                | Returns memory usage information, including total, used, and free memory, similar to the `free` command.| `si.mem()` provides memory statistics but may lack granularity, such as cache or buffer details from `free`.      |


## Build Instructions

This guide outlines how to set up an EC2 instance (currently t3.medium) running `code-server` with **HTTPS**, a **daily rotating password**, and restricted access to your personal IP address. This setup leverages a **self-signed certificate** to secure traffic and ensures only authorized users can access the server.

1. **Create EC2 Instance in AWS**

2. **Copy User Data Script into User Data Field** 

3. **Launch EC2 Instance and enter code-server**

4. **Post-Launch Environment setup**


```bash
curl -sL https://rpm.nodesource.com/setup_18.x | sudo bash -
```
```bash
sudo yum install -y nodejs

```

```bash
sudo curl -L "https://github.com/docker/compose/releases/download/v2.3.3/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
```
```bash
sudo chmod +x /usr/local/bin/docker-compose

```

5. **Setup env for dev**

```
VITE_APP_EC2_IP=<Public-EC2-IP-here>
```

6. **Launch**

```bash
docker-compose up --build dummy
```
```bash
docker-compose up --build backend
```
```bash
docker-compose up --build frontend
```

7. **Access**

Site can be reached at: `http://<EC2-Public-IP>:5173/`

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
