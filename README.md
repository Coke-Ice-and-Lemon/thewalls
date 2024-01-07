# Getting Started with the walls

Welcome to the walls! This guide will walk you through the steps to get started with the walls project.

## Prerequisites

Before you begin, make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/en/download/): Make sure to install the LTS version of Node.js.

## Contribution Guidelines

To ensure a smooth and collaborative development process, please follow these guidelines:

1. Fork the project repository on GitHub.
2. Clone your forked repository to your local machine using the following command:
    
    ```bash
    git clone <https://github.com/your-username/thewalls.git>
    
    ```
    
3. Create a new branch for your contribution using a descriptive name:
    
    ```bash
    git checkout -b feature/your-feature-name
    
    ```
    
4. Make your desired changes or additions to the project codebase.
5. Test your changes locally to ensure they work as intended.
6. Commit your changes with a clear and descriptive commit message:
    
    ```bash
    git commit -m "Add your commit message here"
    
    ```
    
7. Push your changes to your forked repository:
    
    ```bash
    git push origin feature/your-feature-name
    
    ```
    
8. Open a pull request from your forked repository to the main project repository.
9. Provide a detailed description of your changes and the rationale behind them in the pull request.
10. Ensure that your contribution adheres to the project's code style and guidelines.
11. Be responsive to any feedback or questions from the project maintainers during the review process.
12. Once your pull request is approved and merged, your contribution will become part of the project.

# How to Create a Developer Account on Spotify

If you're interested in integrating Spotify features into your applications or projects, you'll need to create a developer account on Spotify. Follow the steps below to get started:

1. Go to the [Spotify Developer Dashboard](https://developer.spotify.com/) in your web browser.
2. Click on the "Log In" button located in the top-right corner of the page.
3. If you already have a Spotify account, you can log in using your existing credentials. Otherwise, click on the "Sign Up" button to create a new account.
4. Once you're logged in, you'll be redirected to the Spotify Developer Dashboard. Here, you'll find various tools and resources for developing with Spotify's APIs.
    ![image](https://github.com/cokelemonice/thewalls/assets/58532371/df93210a-c497-4f7a-b8c6-c88a72ffd4e4)

5. To create a new app, click on the "Create an App" button. You'll be prompted to provide some details about your app, such as its name and description.
    
    ![image](https://github.com/cokelemonice/thewalls/assets/58532371/c2f3624a-7e9d-443b-9259-692f6b86b664)

    
    NOTE - for the walls to work on your local machine, the redirect URI should be  **http://localhost:3000/api/auth/callback/spotify**
    
    This is done to make sure we can use Next Auth with the Spotify OAuth.
    
    To ensure proper functionality, please make sure to enable the **Spotify Web API** in your Spotify Developer App settings.
    
6. After filling out the necessary information, click on the "Create" button to complete the app creation process.
7. Once your app is created, you'll be taken to its dashboard. Here, you can find your app's Client ID and Client Secret, which you'll need for authentication and API usage.

That's it! You've successfully created a developer account on Spotify and created your first app. You can now explore the various APIs and features available to developers and start integrating Spotify into your projects.

Remember, when using Spotify's APIs, make sure to comply with their terms of service and API usage guidelines.

## Running the app locally

To clone the project from GitHub and run it locally, follow these steps:

1. Open your terminal or command prompt.
2. Navigate to the directory where you want to clone the project.
3. Run the following command to clone the project repository:
    
    ```bash
    git clone https://github.com/cokelemonice/thewalls.git
    ```
    
4. Once the cloning process is complete, navigate into the project directory:
    
    ```bash
    cd thewalls
    ```
    
5. Install the project dependencies by running the following command:
    
    ```bash
    npm install
    ```
    
    This command will install all the required packages and dependencies specified in the project's `package.json` file.
    
6. Create a `.env` file, you can use the provided sample `.env.example` file as a template. Copy the contents of the `.env.example` file and create a new `.env` file in the project directory.
7. Open the `.env` file in a text editor and replace the placeholder values with the appropriate credentials from your Spotify app. For example, replace `YOUR_CLIENT_ID` with your actual Client ID and `YOUR_CLIENT_SECRET` with your actual Client Secret.
8. We recommend using [`http://localhost:3000`](http://localhost:3000/) as the value for `NEXTAUTH_URL` in order to run the project locally
9. After the installation is complete, start the local development server by running the following command:
    
    ```bash
    npm run dev
    ```
    
    This command will start the Next.js development server, and you should see output indicating that the server is running.
    
10. Open your web browser and visit `http://localhost:3000` to access the locally running Next.js application.

That's it! You have successfully cloned a Next.js project from GitHub and are running it locally on your machine. You can now make changes to the project, experiment, and test it as needed.

Remember to refer to the project's documentation or README file for any specific instructions or additional setup steps that may be required.

Thank you for choosing the walls! We hope you enjoy using it and look forward to your contributions.

---

*This getting started guide is inspired by the [Appwrite](https://github.com/appwrite/appwrite) project's README.md file.*
