Kubernetes Deployment – Calculator Microservice  
SIT737 – Cloud-Native Application Development
Task 6 – Deploying Dockerized Microservice to Kubernetes Cluster

---

 Overview  
In this task, we deployed our existing calculator microservice (from Task 5.1P) onto a **Kubernetes cluster** using Docker, Kubernetes deployment/service manifests, and the Kubernetes CLI (`kubectl`).  
Kubernetes acts as a **container orchestration platform**, automating the deployment, scaling, and management of our containerized Node.js microservice.

The goal was to:
- Set up a Kubernetes deployment for our microservice
- Expose the service via NodePort
- Interact with the application using Kubernetes commands

---

## 🛠️ Technologies & Tools  
- **Node.js** – Application runtime  
- **Docker** – Containerization platform  
- **Kubernetes** – Container orchestration  
- **kubectl** – Kubernetes command-line tool  
- **Docker Hub / GCR** – For storing container images  
- **Visual Studio Code** – For code editing



## ⚙️ Step-by-Step Setup

### ✅ Step 1: Build and Push Docker Image
docker build -t calculator-microservice .
docker tag calculator-microservice your-dockerhub-username/calculator-microservice
docker push your-dockerhub-username/calculator-microservice

Step 2: Create Kubernetes Deployment
Step 3: Create Kubernetes Service
 Step 4: Test the Service
  Summary
By completing this task, we demonstrated how to:

Deploy a containerized Node.js app using Kubernetes

Expose it using a NodePort service

Interact with the app from the browser

Manage and scale microservices using Kubernetes CLI
