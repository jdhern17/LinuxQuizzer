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

This project follows a security approach modeled after the  **Defense-in-Depth (DiD)** model, applying layered security measures across all layers of the tech stack. The DiD model is referenced from Naviant’s cybersecurity recommendations, and closely aligns with AWS’s Shared Responsibility Model for cloud security.


## Theoretical Framework

- Why not OWASP?

The Open Web Application Security Project (OWASP) is a non-profit that provides a framework for the Top 10 Web Application Risks for assessing the security of applications exposed on the World Wide Web. These threats include cross-site scripting (XSS), 

- Why not NIST CSF?
- Why not Security Control Types?
- Why Defense-in-Depth (DiD)? 
- Why Naviant?




---

## Defense-in-Depth Model

| Layer | Description |
|-------|-------------|
| **Layer 1: Policies, Procedures, and Awareness** | Ensuring security awareness and best practices, including certificates and training completed in preparation for building the system. |
| **Layer 2: Physical Security** | AWS data center physical security measures. |
| **Layer 3: Perimeter Defense** | AWS security groups and firewall settings to restrict external access. |
| **Layer 4: Internal Network Security** | Intra-container communication and Docker’s internal networking. |
| **Layer 5: Host Security** | The use of Docker containers, with focus on securing the backend and dummy containers. |
| **Layer 6: Application Security** | Implementing server-side validation, rate-limiting, disabling GraphQL introspection, and securing the MongoDB database. |
| **Layer 7: Data Security** | Ensuring data encryption, integrity, and access controls. |

### Reference:
- [Navian's Defense-in-Depth PDF](your-link-here)

---

## Layer 1: Policies, Procedures, and Awareness

This section ensures that all security processes are understood and followed throughout the development cycle. The following items highlight key areas under this layer:
- **Certificates and Training**: I have completed several certifications and training in AWS and system security, ensuring foundational awareness before building this system.
- **Pre-Development Security Checklist**: Every stage of the development was designed with security-first principles.

---

## Layer 2: Physical Security

AWS handles the physical security of its data centers, ensuring high standards such as ISO/IEC 27001 and SOC 2 compliance.
- **Security Measures**: Includes multi-factor authentication, controlled physical access, and constant monitoring at AWS data centers.

---

## Layer 3: Perimeter Defense

This focuses on securing the external perimeter of the system, ensuring that access points are tightly controlled.
- **AWS Security Groups**: Applied to restrict incoming traffic to the necessary ports (e.g., 4000 for the backend API, 3000 for the frontend).
- **Firewall**: Ensuring only legitimate IPs have access during development and production.

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

---

## Layer 7: Data Security

- **No External User Data**: This application does not handle or store external user data, reducing the attack surface significantly.
- **Encryption**: Data transfers between the frontend and backend are secured using HTTPS (via Let’s Encrypt SSL certificates).
- **MongoDB Security**: MongoDB is secured with authentication and SSL, ensuring that even internal application data is protected.

---

## Conclusion

This document outlines how the **Defense-in-Depth** model has been applied to each layer of this project’s security architecture. From policies and procedures to data protection, every layer is fortified to protect against modern threats. By aligning with industry standards and best practices, this application demonstrates a comprehensive approach to security, ensuring a secure environment for future deployments.