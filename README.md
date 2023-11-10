# Bulk Email Tool - Backend

## Description

The Bulk Email Tool Backend is a powerful system designed to handle bulk email processing. It provides functionalities for sending emails in bulk, managing email templates, and monitoring email delivery status.

## Table of Contents
  - [Installation](#installation)
  
  - [Usage](#usage) 
    - [API Endpoints](#api-endpoints)
    - [Database Schema](#database-schema)

  - [Postman API Documentation](postman-api-documentation)

  - [Configuration](configuration)

  - [Contributing](#contributing)
  
  - [License](#license)

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Arafath100/CAPSTONE-BACKEND.git
   cd BACKEND

2. **Install dependencies:**
   ```bash
   npm install

3. **Configure environment variables:**
   Create a .env file based on .env.example and provide the necessary configuration settings,
   including database connection details and email service API keys.

4. **Run the application:**
   ```bash
   npm start

#  Usage
### API Endpoints:

   /api/settings: Handle email settings, including email, password, and user details.
   /api/getCredential: Get user credentials from the database.
   /api/getMailSendToday: Get the count of emails sent today.
   /api/sendEmails: Send emails in bulk.
   /api/deleteCred: Delete user credentials from the database.
   /api/getLogDetailsData: Get log details from the database.
   /api/getGraphData: Get graph data based on a date range.
   
### Database Schema:

   The application uses MongoDB for storing user data, email credentials, and email log details.

## Postman API Documentation

   Explore the detailed API documentation using Postman [here](https://documenter.getpostman.com/view/28864237/2s9YXiZgp4).

## Configuration

   Ensure to update the configuration in the `.env` file with the appropriate values for your environment.

    ```dotenv
    PORT=3000
    MONGO_URL=mongodb://localhost:27017/bulk_email_tool
    EMAIL_API_KEY=your_email_api_key

## Contributing

   Contributions are welcome! Please follow our [contribution guidelines](CONTRIBUTING.md).

## License

   This project is licensed under the [MIT License](LICENSE).
