# User Authentication App

This is a simple User Authentication App built using React, where users can sign up, sign in, and view a welcome page after logging in. The app includes various components, pages, services, and utils for managing users and their authentication flow.

## Table of Contents
- [Folder Structure](#folder-structure)
- [Components](#components)
- [Pages](#pages)
- [Utils](#utils)
- [Services](#services)
- [Models](#models)

## Folder Structure

The application is organized into the following folder structure:

### Components
- **Button**: A reusable button component.
- **ErrorMessage**: A component to display error messages.
- **Input**: A generic input component for text, email, and password fields.
- **SignUpForm**: The sign-up form component where users can register.
- **SignInForm**: The sign-in form component where users can log in.

### Pages
- **Home**: The landing page of the app.
- **SignUp**: The page where users can create a new account.
- **SignIn**: The page where users can sign in to their existing account.

### Models
- **FormData**: Defines the structure of the form data (username, email, password, repassword) for both sign-up and sign-in forms.
- **User**: Defines the structure of a user (username, email, password).

### Services
- **userService**: Contains functions like `createUser` to register a new user and `getAllUsers` to fetch all registered users from the backend or mock data. It uses the `apiFetch` utility for making requests to the backend.

### Utils
- **apiFetch**: A utility function that performs a `fetch` request and handles errors. It returns the parsed JSON response if the request is successful. This function is used in `getAllUsers` and other API calls.
- **errorHandler**: Contains functions to handle errors throughout the app.
- **validation**: Contains helper functions for validating email, password, and matching passwords for sign-up and sign-in forms.

## How the App Works

1. **Sign Up Flow**:
   - The user is prompted to enter a username, email, password, and confirm the password in the sign-up form.
   - The form data is validated to ensure all fields are filled out correctly.
   - If the user is not already registered, a new user is created.
   - If the user is successfully registered, they are redirected to the homepage.

2. **Sign In Flow**:
   - The user is prompted to enter their email and password.
   - If the entered credentials match a registered user, they are redirected to a welcome page.
   - If the credentials are incorrect, an error message is displayed.

