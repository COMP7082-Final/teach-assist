pipeline {
     agent any
     tools {nodejs "node"}
     stages {
        stage("Build") {
            steps {
                nodejs('node'){
                   npm install
                }
            }
        }
    }
}