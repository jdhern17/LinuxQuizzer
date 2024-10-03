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

- **AWS Security Groups**: AWS Security Groups have been applied that restrict incoming traffic to the necessary ports (ex. 4000 for the backend API, 3000 for the frontendj). Traffic during development has also been restricted to the public IPs of the development team's LANs.

### Cloud-Hosted Application Perimeter

For the sake of the application, perimeter is defined as the edge protections for AWS cloud services.

- **CloudFront**: AWS CloudFront will serve as a shield for incoming traffic, using HTTPS for secure communication as well as following content delivery policies and geo-restrictions.

- **S3**: S3 bucket policies and access controls will restrict access to specific origins (ex. CloudFront).

- **API Gateway**: API Gateway will ensure that incoming requests are controlled via rate limiting and throttling.

---

## Layer 4: Internal Network Security

- **Intra-Container Communication**: Docker internal networking allows containers to communicate securely within the stack. The backend fetches data from the dummy container over a private network.
- **Container Network Isolation**: Ensures that containers cannot interact with outside networks except through explicitly allowed rules.

---

## Layer 5: Host Security

- **Use of Docker Containers**: Docker isolates the application and its dependencies, ensuring a clean and controlled environment for both the frontend and backend.
- **Dummy Container**: All system stats are gathered from a dummy container, isolating sensitive operations from public access.
- **Package Audits**: Regular use of `npm audit` to monitor for package vulnerabilities, ensuring up-to-date security practices.

---

## Layer 6: Application Security

- **GraphQL Input Validation**: The backend performs server-side validation on incoming GraphQL requests to prevent injection attacks.
- **GraphQL Complexity Limiting**: Restricts the depth and complexity of GraphQL queries, mitigating potential DoS attacks.
- **Rate-Limiting**: Implements rate limiting on all API requests to prevent abuse.
- **Disabling Introspection in Production**: Once deployed, GraphQL introspection is disabled to prevent attackers from discovering API structure.

- use OWASP here:

add this:

Protection Against DOM-based XSS

This application is built using React, which provides built-in protections against DOM-based XSS attacks, aligning with the OWASP Top 10 vulnerabilities list. React automatically escapes dynamic content in JSX, preventing malicious scripts from being injected into the DOM. Additionally, the use of dangerouslySetInnerHTML is minimized and, when necessary, any raw HTML input is manually sanitized to mitigate potential security risks. This approach helps protect against client-side XSS vulnerabilities, which are a critical area highlighted by OWASP.


---

## Layer 7: Data Security

- **No External User Data**: This application does not handle or store external user data, reducing the attack surface significantly.
- **Encryption**: Data transfers between the frontend and backend are secured using HTTPS (via Let’s Encrypt SSL certificates).
- **MongoDB Security**: MongoDB is secured with authentication and SSL, ensuring that even internal application data is protected.


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