FROM maven:3.8.5-jdk-11-slim AS build
COPY src .
COPY pom.xml .
RUN mvn -f pom.xml clean package

FROM openjdk:11-slim
COPY --from=build demo-0.0.1-SNAPSHOT.jar /usr/local/lib/demo.jar

ENTRYPOINT ["java","-jar","/usr/local/lib/demo.jar"]
