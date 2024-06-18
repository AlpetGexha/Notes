---
title: "Deploying a Laravel App on DigitalOcean: Step-by-Step Guide"
date: 2024-06-01
postLayout: simple
draft: false
summary: A detailed overview of new features in Laravel 9
tags: [laravel]
---

# Deploying a Laravel App on DigitalOcean: Step-by-Step Guide

So you've built an amazing Laravel application and now it's time to deploy it on DigitalOcean. Here's a detailed guide to help you through the process:

### 1. Clone the Project

Begin by cloning your Laravel project into your desired directory. Let's assume you want it in `/etc/www/`.

```bash
git clone https://<TOKEN>@github.com/<USERNAME>/<REPO>.git /etc/www/
```

Navigate into the repository and sync the files to your server:

```bash
cd /etc/www/<REPO>
rsync -avzh ./ /var/www/laravel
```

Feel free to delete the cloned repository once the files are synced (opsional):

```bash
rm -rf /etc/www/<REPO>
```

### 2. Check PHP Extensions

Before proceeding, ensure that all necessary PHP extensions are installed. Run:

```bash
composer check-platform-reqs
```

Based on the requirements, install the required PHP extensions. For example:

```bash
sudo apt-get update
sudo apt-get install -y php8.2-cli php8.2-fpm php8.2-mysql php8.2-curl php8.2-xml php8.2-mbstring php8.2-zip php8.2-bcmath php8.2-intl php8.2-soap php8.2-xmlrpc php8.2-gd php8.2-common
```

### 3. Restart Nginx

After installing the necessary extensions, restart the Nginx server for the changes to take effect:

```bash
sudo systemctl restart nginx
```

### 4. Install Composer Dependencies

Install Composer dependencies with the following command:

```bash
composer install --no-ansi --no-dev --no-interaction --no-plugins --no-progress --no-scripts --optimize-autoloader
```

- **--no-ansi**: Use if you don't need colored output.
- **--no-dev**: Highly recommended for production to exclude development dependencies.
- **--no-interaction**: Useful for automated environments where user interaction is not possible.
- **--no-plugins**: Use if you don't rely on any Composer plugins.
- **--no-progress**: Useful for CI/CD pipelines to reduce unnecessary output.
- **--no-scripts**: Use with caution. Only if you are sure that no scripts are needed for your application to function correctly.
- **--optimize-autoloader**: Highly recommended for production to improve autoloading performance.

### 5. Set File Permissions (if needed)

Ensure that the web server has appropriate permissions to access necessary directories. Execute the following commands:

```bash
sudo mkdir -p /var/www/laravel/bootstrap/cache
sudo chmod -R 775 /var/www/laravel/storage
sudo chown -R www-data:www-data /var/www/laravel/bootstrap/cache
sudo chown -R www-data:www-data /var/www/laravel/storage
sudo chmod -R 775 /var/www/laravel/bootstrap/cache
sudo systemctl restart nginx
```

Finally, restart Nginx one more time to ensure all changes are applied:

```bash
sudo systemctl restart nginx
```

### Optimize Laravel App

Optimize your Laravel application for better performance:

```bash
php artisan optimize
php artisan view:cache
php artisan event:cache
php artisan icons:cache
```

And that's it! Your Laravel application should now be up and running on DigitalOcean. Don't forget to configure your Nginx server block to point to your Laravel application's public directory. Happy coding!

```bash
git clone https:/<TOKEN>@github.com/AlpetGexha/dueDate.git /var/www/dueDate
rsync -avzh /var/www/dueDate/ /var/www/laravel

sudo apt-get update
sudo apt-get install -y php8.2-cli php8.2-fpm php8.2-mysql php8.2-curl php8.2-xml php8.2-mbstring php8.2-zip php8.2-bcmath php8.2-intl php8.2-soap php8.2-xmlrpc php8.2-gd php8.2-common

cd /var/www/laravel

composer update

npm install
npm run build

php artisan migrate --seed

sudo chown -R www-data:www-data /var/www/laravel/storage
sudo chmod -R 775 /var/www/laravel/storage
sudo chmod -R 775 /var/www/laravel/bootstrap/cache
mkdir -p /var/www/laravel/bootstrap/cache
chmod -R 775 /var/www/laravel/bootstrap/cache
chown -R www-data:www-data /var/www/laravel/bootstrap/cache
sudo systemctl restart nginx

php artisan storage:link

php artisan optimize:clear
php artisan optimize
php artisan view:cache
php artisan event:cache
php artisan icons:cache
```


### SSL Configurate

we need to change the domain name on 

```bash
nano /etc/nginx/sites-enabled/laravel
```

and we run certbot

```bash
certbot
```

or

```bash
sudo certbot --nginx -d DOMAIN -d www.DOMAIN
```

### Queue Worker

To have queue worker on our server we need a service which can allow to run queue:work all the time. So we need a supervisor

**Supervisor** is a process monitor for the Linux Operating System, and it will automatically restart queue:work process if it fails

To install Supervisor on Ubuntu, you may use the following command:

```bash 
sudo apt-get install supervisor
```

After installing Supervisor on our server we need to go to conf.d directory

```bash
cd /etc/supervisor/conf.d
```

Create ne file .conf 

```bash
touch queue-worker.conf 
```

and this is the script u need to put in the file

```bash
[program:queue-worker]

process_name=%(program_name)s_%(process_num)02d

command=php /var/www/laravel/artisan queue:work

autostart=true

autorestart=true

user=root

numprocs=4

redirect_stderr=true

stdout_logfile=/var/www/laravel/storage/logs/worker.log
```

Those are the basic configurations for the queue worker. You can change the number of processes, the user, and the path to the log file:

- **process_name**: The name of the process. (This sets the naming pattern for the processes. %(program_name)s is a placeholder for the program name (queue-worker), and %(process_num)02d is a placeholder for the process number, formatted as a two-digit number (e.g., 00, 01, 02, etc.). So, the process names will be queue-worker_00, queue-worker_01, and so on.)

- **command**: The command to run. (This is the command that will be executed to start the queue worker. In this case, it is php /var/www/laravel/artisan queue:work.)

- **autostart**: This means the process will be automatically started when Supervisor starts.

- **autorestart**: This means the process will be automatically restarted if it exits unexpectedly.

- **user**: The user that the process will run as. (In this case, it is root.)

- **numprocs**: This specifies the number of process instances to start. In this case, 4 instances of the queue worker will be started.

- **redirect_stderr**: This means that the standard error stream will be redirected to the location specified by the stdout_logfile parameter.

- **stdout_logfile**: The path to the log file for the process. (In this case, it is /var/www/laravel/storage/logs/worker.log.)


Also dont forget to restart the supervisor if you have made any changes

```bash
sudo supervisorctl reread
sudo supervisorctl update
sudo supervisorctl reload
```
