# Use an official OpenJDK runtime as a parent image
FROM openjdk:17-jdk-slim

# Set the working directory
WORKDIR /app

# Copy the packaged Spring Boot JAR file into the container
COPY files/flash-cards-*.jar app.jar

# Expose the port your Spring Boot app listens on
EXPOSE 8080

# Command to run the application
CMD ["java", "-jar", "app.jar"]