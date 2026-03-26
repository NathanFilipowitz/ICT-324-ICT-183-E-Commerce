# 1. ICT-324-ICT-183-E-Commerce

## 1.1. Description

This project is designed to create an e-commerce platform that allows users to browse products, 
add them to a shopping cart, and complete purchases securely. The application will feature user authentication, 
product management, order processing, and payment integration.

## 1.2. Getting Started

### 1.2.1. Prerequisites

List all dependencies and their version needed by the project as :

* DataBase Engine: SQLite
* IDE used: JetBrains IntelliJ
* Package manager: bun
* OS supported: all (web)

### 1.2.2. Configuration
#### Environment

To install dependencies:
```bash
bun install
```
To start a development server:

```bash
bun dev
```

#### Github Actions
The project utilizes GitHub Actions for CI/CD. Ensure the following are configured in your repository settings:
- **Permissions**: The GITHUB_TOKEN must have packages: write permissions to push to GHCR.
- **Triggers**:
  - **Push**: Triggers on main branch updates or tags matching v*.
  - **Pull Request**: Triggers on main branch targets.
  - **Manual**: Can be initiated via workflow_dispatch.

## 1.3. Deployment

#### Github Actions
Deployment is automated via a Docker-based workflow. The process follows these stages:
  1. **Validation**: Runs Linter on modified files and executes a Bun build to ensure compilation integrity.
  2. **Authentication**: Authenticates with the GitHub Container Registry (ghcr.io) using the repository's credentials.
  3. **Distribution**: Builds the Docker image from root and pushes it to the registry.
Registry Path: ghcr.io/<OWNER>/<REPOSITORY>

## 1.4. Directory structure

```shell
├───.github
│   └───workflows
├───docs
└───src
    ├───controllers
    ├───frontend
    │   └───components
    └───models
```

# 1.5. Security

All security measures are documented on the Wiki

## 1.6. Contact

* Gaëtan: gaetan.gendroz@eduvaud.ch
* Nathan: nathan.filipowitz@eduvaud.ch
* Fabian: fabian.rostello@eduvaud.ch
