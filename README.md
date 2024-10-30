# Calculator Project

## Overview

This is a web-based calculator built with a React frontend and a Spring Boot backend. The calculator allows users to build mathematical expressions using buttons and keyboard keydown listeners and then evaluates the expression using a backend API.

![WhatsApp Image 2024-10-30 at 03 54 37_31df2f77](https://github.com/user-attachments/assets/0614f237-28f3-490a-9af9-58ccbb981c54)


## Project Structure

- **Frontend**: Created using `npm create vite@latest`, the frontend uses React for rendering the calculator interface. Users can input expressions via buttons or keyboard keys, which are then sent to the backend for evaluation.
- **Backend**: Set up using Spring Initializr, the backend handles the evaluation of mathematical expressions through a REST API endpoint using the `exp4j` library.

## How It Works

1. **Building Expressions**: The React frontend captures user input from buttons or keyboard keydown events to build a mathematical expression.
2. **Sending Request to Backend**: Once the user is ready to calculate, the expression is sent to the backend via an Axios GET request.
3. **Evaluation**: The Spring Boot backend receives the request at `{localhost}/api/calculate`. The controller processes the expression using `exp4j` to evaluate it.
4. **Returning the Result**: The evaluated result is returned to the frontend, where it is displayed on the calculator screen.

## Setup Instructions

### Prerequisites

- **Node.js** (for running the frontend)
- **Java 17** (for running the backend)
- **Maven** (for managing dependencies in the backend)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Michael23Magdy/Calculator-React-SprintBoot.git
   cd calculator-project
   ```

2. **Frontend Setup**:
   - Navigate to the `front-end` directory:
     ```bash
     cd front-end
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Run the frontend:
     ```bash
     npm run dev
     ```

3. **Backend Setup**:
   - Navigate to the `back-end` directory:
     ```bash
     cd ../back-end
     ```
   - Build the backend using Maven:
     ```bash
     mvn clean install
     ```
   - Run the Spring Boot application:
     ```bash
     mvn spring-boot:run
     ```

   The backend will start on `http://localhost:8080` by default.

## Usage

1. **Enter Expressions**: Use the calculator buttons or your keyboard to enter mathematical expressions.
2. **Calculate**: Press `=` or the Calculate button to evaluate the expression.
3. **Backend Processing**: The expression is sent to `{localhost}/api/calculate` for evaluation.
4. **Results Displayed**: The result of the calculation is displayed on the calculator screen.

## Technologies Used

- **Frontend**: React, Vite, Axios for HTTP requests.
- **Backend**: Spring Boot, `exp4j` library for expression evaluation.
  
## Troubleshooting

- **Frontend Errors**: Make sure all dependencies are installed and that you are running the frontend and backend on compatible ports.
- **Backend Errors**: Check if the backend server is running on the correct port (`8080`) and confirm that all dependencies are correctly installed via Maven.
