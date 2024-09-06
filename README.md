# Studymate - AI-powered Student Academia Copilot

## Overview

Studymate is an AI-powered web app designed to assist students in learning from any document or web page. It offers personalized guidance via AI conversations (powered by GPT-3.5), helps with summarizations, prompt writing, and can analyze web pages based on provided URLs. The app includes user authentication, profile management, and themed UI support (dark/light mode).

## Features

- AI-powered chat and summarization
- URL-based document learning
- User authentication (Firebase)
- Profile management with Firestore
- Responsive design with Tailwind CSS
- Dark/light mode toggle
- SVG-based icons for design consistency

## Tech Stack

- **React.js** for front-end UI
- **Tailwind CSS** for styling
- **Firebase** for authentication and database (Firestore)
- **OpenAI API** for AI-powered conversations and processing
- **nvm** (Node Version Manager) to manage Node.js versions
- **Node.js v18** for the backend and development environment
- **Langchain** for the backend and development environment and AI response processing and feedback generation

## Prerequisites

- **Node.js v18.x.x** (Install using [nvm](https://github.com/nvm-sh/nvm))
- **npm** (Node Package Manager)
- **Firebase account** with Firestore setup
- **OpenAI API key**
- **Langchain.js**(https://js.langchain.com/v0.2/docs/introduction/))

## Getting Started

```bash
### Step 1: Clone the repository

git clone https://github.com/adu-steve/Studymate-App.git
cd studymate-academia-copilot


### Step 2: Use Node.js version 18
nvm use 18

### If you don’t have Node.js 18 installed, run:
nvm install 18
nvm use 18

### Step 3: Install dependencies
npm install

```

### Step 4: Set up environment variables

Create a .env file in the root directory and add your environment variables for Firebase and OpenAI API:

### Set the firebase variables in a .env file separately in the frontend folder.

REACT_APP_FIREBASE_API_KEY=your-firebase-api-key
REACT_APP_FIREBASE_AUTH_DOMAIN=your-firebase-auth-domain
REACT_APP_FIREBASE_PROJECT_ID=your-firebase-project-id
REACT_APP_FIREBASE_STORAGE_BUCKET=your-firebase-storage-bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your-firebase-messaging-sender-id
REACT_APP_FIREBASE_APP_ID=your-firebase-app-id

### Set the openai api key separately in the server folder as well in another .env file plus a tavily api key.

For you Tavily link = `(https://app.tavily.com)`
REACT_APP_OPENAI_API_KEY="your-openai-api-key"
TAVILY_API_KEY= "your-tavily-api-key"

### Step 5: Start the development server for the frontend React App

cd frontend
npm start
This will run the app in development mode on `http://localhost:3000.`

### Step 6: Start the server for the backend processing as well

cd server
npm run dev
This will run the server`http://localhost:5000.`

### Step 7: Build for production

To build the app for production:
npm run build

**_Contributing_**
If you wish to contribute to the project, feel free to fork the repository and submit a pull request.

This `README.md` provides a clear overview of the project, installation instructions, and usage of `nvm` for managing Node.js versions. You can customize the project-specific details as needed.
