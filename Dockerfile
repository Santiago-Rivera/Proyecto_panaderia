FROM java:8

WORKDIR /usr/src/app

COPY . .

RUN openjdk8-jre \
    && apt-get update \
    && apt-get install -y maven \
    && mvn clean package -DskipTests


CMD ["java", "projecto_panaderia""]
