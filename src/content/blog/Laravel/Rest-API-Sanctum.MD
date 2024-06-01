---
title: Building a REST API with Laravel Sanctum
date: 2024-02-12
postLayout: simple
draft: false
summary: Learn how to set up a RESTful API with Laravel Sanctum for authentication and authorization.
tags: [laravel, api]
---

# Installation

First, install Laravel Sanctum via Composer:

```
composer require laravel/sanctum
```

Publish the Sanctum configuration:

```
php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"
```

Add the Sanctum middleware to the $middleware property of your app/Http/Kernel.php file:

on `app/Http/Kernel.php` add

```
  \Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful::class,
```

# Configure User Model

Make sure your User model uses the `HasApiTokens` trait, which comes by default with the latest versions of Laravel.

# Make API CRUD

    - Make Product Model
    - Make Producut Controller (use --api)
    - Make Auth Controller
    - Configurate Routes

- Model is on `app\Models\Api\Product.php`
- Controlles in on `app\Https\Api\ProductController.php` AND `app\Https\Api\AuthController.php`
- Routes `routes\api.php`

# I use Postman as API

- If u want to get respone on `Headers` add
  `Accept` as a KEY AND
  `application/json` as VALUE

- U can Request Value on Body

- For Authorization go on `auth`
  We use `Bearer Token` and u can past your auth token form login or register

### Import API Colection

#### On Main folder u see `API CRUD.json` Take this file and import on Postman

[LINK](https://github.com/AlpetGexha/Code-Leason/tree/main/Laravel/Rest-API-Sanctum)
