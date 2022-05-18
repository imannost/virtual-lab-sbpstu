FROM openjdk:11-slim
COPY mon-service-0.1.0.jar /usr/local/lib/demo.jar

ENTRYPOINT ["java","-jar","/usr/local/lib/demo.jar"]
