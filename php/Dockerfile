FROM php:8.3-fpm-alpine

RUN apk add --no-cache \
    bash \
    git \
    curl \
    unzip \
    icu-dev \
    libzip-dev \
    oniguruma-dev \
    postgresql-dev \
    linux-headers \
    autoconf \
    g++ \
    make

RUN docker-php-ext-install \
    pdo \
    pdo_pgsql \
    intl \
    zip \
    mbstring \
    opcache

RUN pecl install redis && docker-php-ext-enable redis

COPY --from=composer:2.7 /usr/bin/composer /usr/bin/composer
COPY php.ini /usr/local/etc/php/conf.d/custom.ini

WORKDIR /var/www/backend