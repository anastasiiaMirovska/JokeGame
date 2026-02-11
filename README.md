# About
This project is a small web app where you can:
- Read jokes
- React to them with emojis
- Edit jokes
- Load new jokes from the database

## Running with Docker
1. **Install prerequisites:** Download and install Docker Desktop and npm.

2. **Install dependencies:** Open the project folder in your terminal and run:

    ```bash
    npm install
    ```

3. **Build the frontend:**

    ```bash
    cd frontend
    npm run build
    ```

4. **Start the application:**

    ```bash
    docker compose up --build
    ```

## Running Locally
### 1. Backend
1. Go to the backend folder:

    ```bash
    cd backend
    ```

2. Start the backend:

    ```bash
    npm run start
    ```

### 2. Frontend
1. Go to the frontend folder:

    ```bash
    cd frontend
    ```

2. Build the frontend:

    ```bash
    npm run build
    ```

3. Start the frontend:

    ```bash
    npm run start
    ```
