pipeline {
     agent any
     tools {nodejs "node"}
     stages {
        stage("Build") {
            nodejs('node'){
               npm install
            }
        }
    }
}