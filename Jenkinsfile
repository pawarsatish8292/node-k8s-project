pipeline {
    agent any

    environment {
        IMAGE_NAME = "pawarsatish8292/node-app"
        IMAGE_TAG = "${BUILD_NUMBER}"
    }

    stages {

        stage('Checkout') {
            steps {
                git 'https://github.com/pawarsatish8292/node-k8s-project.git'
            }
        }

        stage('Build') {
            steps {
                sh 'docker build -t $IMAGE_NAME:$IMAGE_TAG .'
            }
        }

        stage('Login DockerHub') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-creds',
                    usernameVariable: 'USER',
                    passwordVariable: 'PASS'
                )]) {
                    sh 'echo $PASS | docker login -u $USER --password-stdin'
                }
            }
        }

        stage('Push') {
            steps {
                sh 'docker push $IMAGE_NAME:$IMAGE_TAG'
            }
        }

        stage('Deploy with Helm') {
            steps {
                sh '''
                helm upgrade --install node-app ./node-app \
                --set image.repository=$IMAGE_NAME \
                --set image.tag=$IMAGE_TAG
                '''
            }
        }
    }
}