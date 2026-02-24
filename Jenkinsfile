pipeline {
    agent any

    tools {
        nodejs 'NodeJS20'
    }

    stages {
        stage('Clone Repository') {
            steps {
                git branch: 'master',
                credentialsId: 'github-token',
                url: 'https://github.com/anastasiiaMirovska/JokeGame.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage ('Prepare secrets'){
            steps{
                withCredentials([file(credentialsId: 'backend-env', variable: 'BACKEND_ENV'),
                file(credentialsId: 'backend-docker-env', variable: 'BACKEND_DOCKER_ENV')]){
                    sh 'cat $BACKEND_ENV > backend/.env'
                    sh 'cat $BACKEND_DOCKER_ENV > backend/.env.docker'
                }
            }
        }
        stage ('Run tests'){
            steps {
                sh 'ls -R backend/.dataBase/'

                sh 'docker compose -f docker-compose.test.yml up --build --abort-on-container-exit'
            }
            post {
                failure {
                    sh 'docker compose -f docker-compose.test.yml logs'
                }
                always {
                    sh 'docker compose -f docker-compose.test.yml down'
                }
            }
        }

        stage('Build Frontend') {
            steps {
                dir('frontend') {
                    withCredentials([file(credentialsId: 'frontend-docker-env', variable: 'FRONTEND_DOCKER_ENV')]) {
                        sh 'cat $FRONTEND_DOCKER_ENV > .env.docker'
                        sh 'npm install'
                        sh 'npm run build'
                    }
                }
            }
            post {
                success {
                    archiveArtifacts artifacts: 'client/**/*', fingerprint: true
                }
            }
        }
    }

    post {
        always {
            echo 'Clearing the workspace'
            sh 'rm -f backend/.env backend/.env.docker frontend/.env'
        }
    }
}
