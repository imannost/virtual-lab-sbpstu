FROM openjdk:11-slim
COPY demo-0.0.13.jar /usr/local/lib/demo.jar

ENTRYPOINT ["java","-jar","/usr/local/lib/demo.jar"]
