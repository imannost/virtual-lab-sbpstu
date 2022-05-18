FROM openjdk:11-slim
COPY tokenizator-0.0.1.jar /usr/local/lib/demo.jar

ENTRYPOINT ["java","-jar","/usr/local/lib/demo.jar"]
