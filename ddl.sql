CREATE TABLE IF NOT EXISTS `categories`
(
    `id`         INTEGER     NOT NULL auto_increment,
    `name`       VARCHAR(45) NOT NULL,
    `parent_id`  INTEGER,
    `created_at` DATETIME    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `deleted_at` DATETIME,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`parent_id`) REFERENCES `categories` (`id`)
    ) ENGINE = InnoDB
    DEFAULT CHARSET = utf8mb4
    COLLATE utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `products`
(
    `id`          INTEGER      NOT NULL auto_increment,
    `name`        VARCHAR(45)  NOT NULL,
    `image_uri`   VARCHAR(255) NOT NULL,
    `category_id` INTEGER,
    `created_at`  DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at`  DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `deleted_at`  DATETIME,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`)
    ) ENGINE = InnoDB
    DEFAULT CHARSET = utf8mb4
    COLLATE utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `providers`
(
    `id`         INTEGER     NOT NULL auto_increment,
    `name`       VARCHAR(45) NOT NULL,
    `created_at` DATETIME    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `deleted_at` DATETIME,
    PRIMARY KEY (`id`)
    ) ENGINE = InnoDB
    DEFAULT CHARSET = utf8mb4
    COLLATE utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `providers`
(
    `id`          INTEGER        NOT NULL auto_increment,
    `name`        VARCHAR(45)    NOT NULL,
    `price`       DECIMAL(10, 2) NOT NULL,
    `available`   TINYINT(1)              DEFAULT false,
    `provider_id` INTEGER        NOT NULL,
    `product_id`  INTEGER        NOT NULL,
    `created_at`  DATETIME       NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at`  DATETIME       NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `deleted_at`  DATETIME,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`provider_id`) REFERENCES `providers` (`id`),
    FOREIGN KEY (`product_id`) REFERENCES `products` (`id`)
    ) ENGINE = InnoDB
    DEFAULT CHARSET = utf8mb4
    COLLATE utf8mb4_unicode_ci;

