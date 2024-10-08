FROM php:8.3-fpm

WORKDIR /usr/src/api

COPY src .

RUN apt-get update

RUN apt-get install -y libpq-dev

RUN docker-php-ext-install pdo pdo_pgsql

