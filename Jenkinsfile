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
                    sh 'npm install --save react react-dom react-scripts'
                    sh 'npm run test'
                }
            }
        }
    }
}