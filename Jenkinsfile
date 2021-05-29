pipeline {
    agent any
    environment { 
        CI = 'false'
    }
    stages {
        stage('Build') {
            steps {
                sh 'cd ./frontend'
                sh 'npm install'
                sh 'cd ../'
            }
        }
        stage('Deploy') {
            steps {
                sh "chmod +x -R ./build-scripts"
                sh './build-scripts/deploy.sh'
            }
        }
    }
}