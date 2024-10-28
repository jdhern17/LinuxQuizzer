# Security-First Architecture for Quinux App
## Table of Contents

1. [Introduction](#introduction)
2. [Defense-in-Depth Model](#defense-in-depth-model)
3. [Layer 1: Policies, Procedures, and Awareness](#layer-1-policies-procedures-and-awareness)
4. [Layer 2: Physical Security](#layer-2-physical-security)
5. [Layer 3: Perimeter Defense](#layer-3-perimeter-defense)
6. [Layer 4: Internal Network Security](#layer-4-internal-network-security)
7. [Layer 5: Host Security](#layer-5-host-security)
8. [Layer 6: Application Security](#layer-6-application-security)
9. [Layer 7: Data Security](#layer-7-data-security)
10. [Acknowledgements](#acknowledgements)
11. [Conclusion](#conclusion)

---

## Introduction

This project implements a security-first approach based on the  **Defense-in-Depth (DiD)** model, applying layered security measures across the full tech stack. Using Naviant's cybersecurity recommendations [linked here](https://naviant.com/resource/defense-in-depth-7-key-layers-of-cloud-security/), this approach is also aligned with AWS’s Shared Responsibility Model for cloud security. The goal of this document is to provide transparency about the security measures integrated throughout the application lifecycle and to offer a platform for collaborative feedback and continuous improvement.

## Theoretical Framework

- Why not OWASP?

The Open Web Application Security Project (OWASP) provides essential guidance for web application security with the Top 10 Web Application Risks ncluding threats like cross-site scripting (XSS), broken authentication and sensitive data exposure. While OWASP is a valuable reference for security the application layer, it focuses specifically on web application vulnerabilities and doesn't provide a multi-layer security framework across the entire tech stack. The DiD model, on the other hand, extends beyond the application layer to ensure security is addressed across infrastructure, network and cloud environments.the cloud.

- Why not NIST CSF?

NIST's (National Institute of Standards and Technology) Cybersecurity Framework (CSF) is US government-backed and adopted for managing cybersecurity at a strategic organizational level in public and private sectors. While highly comprehensive for identifying, detecting and responding to risks, it is more focused on organizational security management than practical implementation of security controls during the development of cloud-based applications. The DiD model is a better fit for this project, as it offers technical guidance throughout the development process.o security-first development.

- Why not Security Control Types?

Security Controls are often classified as Physical, Administrative and Technical measures. While these are foundational categories for protecting a system, these can be too board to guide technical security in a development project.

- Why Defense-in-Depth (DiD)? Why Naviant?

The Defense-in-Depth (DiD) model, combined with the OWASP Top 10 Web Application Risks, strikes the right balance between security-first actionable technical measures and high-level security practices incorporating the application's ecosystem. Naviant is primarily a business consulting firm, its cybersecurity recommendations offer a solid framework for implementing DiD in cloud-based environments. While some implementations of DiD exclude critical policy and organizational considerations, their model effectively integrates AWS's Shared Responsibility Model. The framework [outlined here](https://naviant.com/wp-content/uploads/2021/03/cloud-ebook-defense-in-depth-small.pdf) serves as a practical guide that can evolve alongside the application.

---

## Defense-in-Depth Model
| Layer | Description |
|-------|-------------|
| **Layer 1: Policies, Procedures, and Awareness** | Establishes organizational security policies, employee training, and awareness of security protocols to minimize human error. |
| **Layer 2: Physical Security** | Physical controls like surveillance, locked server rooms, and guards to prevent unauthorized access to hardware. |
| **Layer 3: Perimeter Defense** | Utilizes firewalls, penetration testing, SIEM and network security controls to protect against external threats. |
| **Layer 4: Internal Network Security** | Secures communication within internal networks, focusing on sensitive data isolation, high availability, network segmentation and traffic monitoring. |
| **Layer 5: Host Security** | Protects the operating system and virtualized infrastructure from unauthorized access and vulnerabilities with steps like regular patching, removing unnecessary services and enforcing least privilege (e.g. sudo restrictions).
| **Layer 6: Application Security** | Implements security practices like input validation, secure coding, logging and regular patching to mitigate software vulnerabilities. |
| **Layer 7: Data Security** | Ensures the confidentiality, integrity, and availability of data through encryption, access controls, and backups.  |

### Sources:
- [Naviant - Defense-in-Depth Model](https://naviant.com/wp-content/uploads/2021/03/cloud-ebook-defense-in-depth-small.pdf)
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [NIST Cybersecurity Framework](https://www.nist.gov/cyberframework)
---

## Layer 1: Policies, Procedures, and Awareness

This section ensures that all security processes are understood and followed throughout the development cycle. The following items highlight key areas under this layer:


- **Certificates and Training**: I have completed certifications and training in AWS and system security, ensuring foundational awareness before building this system. This includes the AWS Cloud Practitioner Certificate, edX CyberSecurity Bootcamp, Harvard Full-Stack Coding Bootcamp and enrolled in AWS Developer Associate and AWS DevOps Professional Certificate study programs.


- **Pre-Development Security Checklist**: Every stage of the development was designed with security-first principles. This includes using Multi-Factor Authentication to log into AWS when accessing EC2 instances for development.

- **Avoiding Unsecure Public Wi-Fi**: Accessing AWS from unsecured public Wi-Fi such as airports and cafés was avoided entirely. Some risk was introduced with accessing AWS from Airbnbs but it was determined to be mitigated with other measures put in place.

- **Security Documentation**: This SECURITY.md file during early development phases ensures that security considerations are embedded into the development lifecycle. This living document reflects a commitment to continuous security monitoring and organizational awareness, aligning with best practices for ensuring evolving threats are addressed throughout the project.

---

## Layer 2: Physical Security

This section reviews physical security measure compliance is considered during development and practice day-to-day work involved.

- **AWS Data Center Security**: AWS data centers adhere to best-in-class physical security measures, including security guards, access controls, surveillance, and environmental safeguards for secure infrastructure hosting.

- **Device Security Practices**: While working remotely, devices are not left unattended and are secured with password authentication to prevent unauthorized physical access.

- **Private Workspace**: Work for this project has been conducted in a secure, private setting to prevent unauthorized physical access or viewing of sensitive information. This ensures that confidential data is not exposed in shared or public environments.

---

## Layer 3: Perimeter Defense

Perimeter defense typically refers to the boundary between a secure system and an unsecure external environment (ex. the public Internet).

### Development Server Perimeter

For the development server, perimeter is being defined as protections to the server itself. 

- **AWS Security Groups**: AWS Security Groups have been applied that restrict incoming traffic to the necessary ports (ex. 4000 for the backend API, 3000 for the frontend). Traffic during development has also been restricted to the public IPs of the development team's LANs.

### Cloud-Hosted Application Perimeter

For the sake of the application, perimeter is defined as the edge protections for AWS cloud services.

- **CloudFront**: AWS CloudFront will serve as a shield for incoming traffic, using HTTPS for secure communication as well as following content delivery policies and geo-restrictions. CloudFront has protections against cache poisoning such as managing headers and validating responses. Cache control headers can be configured to set short cache expiration times.

- **S3**: S3 bucket policies and access controls will restrict access to specific origins (ex. CloudFront).

- **API Gateway**: API Gateway will ensure that incoming requests are controlled via rate limiting and throttling.

---

## Layer 4: Internal Network Security

### AWS Internal Security

- **Virtual Private Cloud (VPC) Isolation**: The application will run inside an isolated VPC. This VPC is logically separated from other AWS customers’ VPCs, ensuring that internal communication and resources remain secure.

- **Private Subnets**: EC2 instances and backend services will use private subnets, meaning they are not directly accessible from the public internet. However, during development, the default VPC allows internet access for external interactions (e.g., accessing the CodeServer). When the application is live, specific services (e.g., frontend and API Gateway) will also have controlled internet exposure, while sensitive internal traffic remains within the VPC. Communication is currently unencrypted using HTTP, but the risk is considered low  due to the non-sensitive nature of the data.

### Container-Level Security

- **Intra-Container Communication**: Docker’s internal networking allows containers to communicate securely within the stack using private internal IPs. The backend fetches data from the dummy container over a private network. Communication between containers is unencrypted using HTTP, but given the internal nature of the network and the lack of sensitive data, the risk is deemed low.

- **Network Isolation and Port Binding**: Containers are isolated from external networks, with explicit port-binding rules controlling which ports (e.g., 80 for HTTP, 443 for HTTPS) are accessible from outside. Only necessary ports are exposed, minimizing the attack surface.

---

## Layer 5: Host Security

### **Layer 5: Host Security**

- **Use of Docker Containers**: Docker isolates the application and its dependencies, ensuring a clean and controlled environment for both the frontend and backend.
- **Dummy Container**: All system stats are gathered from a dummy container, isolating sensitive operations from public access.
- **Package Audits**: Regular use of `npm audit` will monitor for package vulnerabilities, with prioritization based on severity and traffic levels. The low-traffic nature of this project allows flexibility in addressing non-critical issues.
    - **Audit Severity Levels**:
      | Severity  | Attention Level     |
      |-----------|---------------------|
      | Critical  | Immediate attention |
      | High      | Immediate attention |
      | Moderate  | Address if time allows, but monitor |
      | Low       | Defer unless usage increases |
- **Security Groups**: Strict security group rules restrict traffic to only necessary ports, minimizing exposure.
- **OS Patching**: The EC2 instance will be refreshed monthly by tearing down the existing instance and spinning up a new one using the latest AMI, ensuring the latest security patches are applied.
- **Platform Tool Version**: Given the low traffic, low visibility, and non-sensitive nature of the data, it is acceptable to rely on Yum for platform tools like Node.js, Docker and Git, provided any known security vulnerabilities are monitored. Documentation of current versions will be maintained in this **SECURITY.md** file, and explicit migration to newer versions will follow regular testing and validation using updated user data scripts.
    - **Version Table**:
      | Tool        | Latest Stable    | Dev Server | Live Server |
      |-------------|-------------------|--------------------|---------------------|
      | **Node.js** | 18.x| 18.x | LTS Alpine (front/back) or apt-get via Debian (dummy) |
      | **Docker**  | 24.x| Yum-managed | Yum-managed  |
      | **Git**     | 2.x | Yum-managed  | N/A    |
      | **CodeServer** | 4.x| Installed via official URL | N/A                 |
- **Regular Manual Review**: Version checking and OS AMI refreshes will occur manually at a regular monthly cadence to ensure that critical packages and components remain up-to-date.

---

## Layer 6: Application Security

- **MERN Stack Overview**: The MERN (MongoDB, Express.js, React, Node.js) stack is a commonly used technology stack in web development, known for its open-source collaboration and established security practices. This ensures that applications built with MERN benefit from high-quality, community-vetted security measures. The stack’s components are frequently updated to address emerging security concerns.
  
- **Logging**: Given the low-traffic nature of this project, logging will not be a major integration at this time. However, the MERN stack provides various logging features (e.g., Winston, Morgan) should they be required in future iterations.

- **Authorization and Authentication**: Given the low sensitivity of the data (container statistics, at times dummy statistics), the current iteration of the project will not include authentication or authorization mechanisms. If deemed necessary, the MERN stack has a variety of offerings to integrate this securely, following the latest best practices.

### **Back-End Security**

- **Rate-Limiting**: Implements rate limiting on all API requests to avoid abuse and protect against brute-force or DoS attacks.

- **Disabling Introspection in Production**: GraphQL introspection is disabled in production to prevent attackers from easily discovering the structure of your API.

- **Injection Prevention (Mongoose)**: Mongoose schema validation enforces strict validation rules (e.g., data types, string lengths) to prevent NoSQL injection attacks. Parameterized queries ensure data is handled securely before reaching the database.

- **Error Information Leakage via FormatError**: The GraphQL middleware formatError is being leveraged to standardize the GraphQL error messages and ensure that a controlled response is sent to the front-end.

##### **Input Validation**

Given that GraphQL queries are executed using POST requests and can carry complex payloads, input validation is essential to ensure that only safe and expected data is processes by the server.

- **Built-In GraphQL Schema Validation**: The Apollo Server will perform an initial layer of input validation by comparing the incoming request against the schema in the TypeDefs before being sent to the resolver functions. If the query structure does not match the schema (such as asking for a non-existing field), the request will be rejected. 

- **GraphQL Shield**: While authentication and authorization mechanisms from GraphQL Shield will not be leveraged at this time, there are additional steps that can be taken such as blocking all other queries besides those explicitly allowed.

- **GraphQL Depth Limiting**: GraphQL Depth Limiting, like complexity limiting, is set at the Apollo Server level to prevent excessive nesting that could degrade server performance. This helps ensure that limits to the level of nested objects are set and queries exceeding a set threshold are rejected prior to further processing. The graphql-depth-limit package will be used for this.

##### **Deferred or Limited Risk**:
- **Custom Input Validation**: While custom input validation is critical, the first iteration of the application will not be receiving or processing any arguments from the query. While this reduces the attack surface, given input validation's integral role in request processing, any usage of the args parameter or functionality beyond predefined data retrieval will require co-occurring built-in mitigation such as validating input types and expected values.

- **GraphQL Complexity/Cost Limiting**: GraphQL Complexity Limiting limits the complexity of GraphQL queries, mitigating potential DoS attacks by preventing overly complex requests. The tool GraphQL Armor provides a structured way to perform complexity analysis and throw an error if a threshold is reached. As the project grows, this may be reconsidered for integration.

##### **Currently Below Risk Threshold**:
- **Parameter Injection**: While arbitrary query parameters are not allowed by GraphQL, variables passed into queries could be a potential attack vector. Since query variables are not currently being used, the risk is on the minimal side.

- **Excessive Data Retrieval**: Data is currently limited to a dummy container, in future considerations with databases, this will be addressed via pagination or data limits.

- **User Input**: For the first iterations of this project, no user input will be received directly by the user, which will help mitigate a significant portion of injection attacks. If user input is going to be handled at any point, then this will need to be addressed.

### **Front-End Security**
- **Protection Against DOM-based XSS**: Built using React, the front-end benefits from built-in protections against DOM-based XSS attacks. React escapes dynamic content in JSX, preventing malicious scripts from being injected. The use of `dangerouslySetInnerHTML` is minimized, and raw HTML inputs are manually sanitized, aligning with OWASP Top 10 security practices.
- **Input Validation**: User inputs on the front-end (controlled radio buttons) are sanitized and validated to prevent injection attacks. Although minimal input is expected, validation ensures that any potential front-end manipulation is caught and sanitized before reaching the back-end.
- **XSS via Reflected Data**: Front-end data rendered will need to be escaped or sanitized. Packages such as DOMPurify or sanitize-html can researched further to prevent this.

### **Application Functionality**

**Features Integrated into the Application:**
The following methods and commands are considered sufficiently low-risk and have been integrated into the application for system administration tasks. These commands are primarily focused on operational functionality within a dummy container and will be further secured with the usage of the npm package systeminformation and fs methods:

**First Iteration**:

- **top/si.currentLoad**: System load information.
- **ps/si.processes**: Lists running processes, offering insights without modifying the system.
- **df/si.fsSize**: Checks disk usage, showing filesystem space.
- **chmod/fs.chmod**: Change file permissions (safe in an isolated container).
- **free/si.mem**: Displays memory usage statistics, which is read-only.

**Second Iteration**:

- **systemctl status**: Safely checks the status of services without modifications.
- **journalctl**: Reads system logs for insights without making changes.
- **du**: Analyzes disk usage per directory, which is informational only.
- **lsof**: Lists open files, revealing active processes and file descriptors.

**Third Iteration**:

- **chown**: Change ownership of files (dummy-safe with isolated files).
- **uname**: Display system information.
- **date**: Show current date/time.
- **lscpu**: Show CPU architecture details.
- **hostname**: Display system hostname.
- **env**: Display environment variables.

These operations have been selected because they involve monitoring and status commands that do not alter the system and pose minimal risk to security.

**Commands Excluded:**
The following commands have been excluded from the current project scope as they require further vetting due to higher risk, even in a controlled environment:
- **kill**, **aureport**, **adduser/useradd**, **passwd**, **groupmod**, **groupadd**, **route**, **chage**, **auditctl**, **pgrep**, **pkill**, **stress**, **sysctl**, **ifconfig**, **netstat**, **ip**, and others in higher-risk categories.

---

## Layer 7: Data Security

- **No External User Data**: This application does not handle or store external user data, reducing the attack surface significantly.
- **Encryption**: Data transfers between the frontend and backend are secured using HTTPS (via Let’s Encrypt SSL certificates).
- **MongoDB Security**: MongoDB is secured with authentication and SSL, ensuring that even internal application data is protected.
Here’s the breakdown for **Layer 6 (Application Security)** and **Layer 7 (Data Security)** based on your request to focus on safe operations and exclude moderate or high-risk commands.

**Data-Related Commands Integrated:**
These commands focus on managing and monitoring data usage within the dummy container and do not pose significant security risks:
- **du**: Provides information about disk space usage, useful for monitoring available storage.
- **df**: Monitors file system disk space usage and is non-invasive.
- **lsof**: Lists open files, offering insight into active data connections without modifying the system.

These commands have been integrated because they read data rather than modify it, making them safe to include within the scope of the application.

**Excluded Commands:**
The following commands have been excluded from data security considerations due to their potential risks in accessing or modifying sensitive system data:
- **auditctl**, **logrotate**, **ausearch**, **syslog**, and others related to system logging and audit controls.

---

## Acknowledgements

This README was developed with the assistance of OpenAI’s ChatGPT for verification of information, grammar, and content.

---

## Conclusion

This document outlines how the **Defense-in-Depth** model has been applied to each layer of this project’s security architecture. From policies and procedures to data protection, every layer is fortified to protect against modern threats. By aligning with industry standards and best practices, this application demonstrates a comprehensive approach to security, ensuring a secure environment for future deployments.

---

## Additional Considerations

password on admin account?
password on code-server?