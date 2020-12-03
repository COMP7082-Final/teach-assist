pipeline {
    agent any
    tools {
        nodejs 'node'
    }
    
    stages {
        stage("Build") {
            steps {
                script {
                  sh 'npm install'
                }
            }
        }

        stage("Test") {
            steps {
                script {
                  sh 'npm run test'
                }
            }
        }
    }
}