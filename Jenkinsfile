pipeline {
     agent any

     stages {
        stage("Build") {
            steps {
                nodejs('node'){
                   sh 'npm config ls -l'
                }
            }
        }

        stage("Test") {
            steps {
                nodejs('node'){
                   sh 'npm run test'
                }
            }
        }
    }
}