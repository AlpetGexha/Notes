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

### 5. Set File Permissions (if needed)

Ensure that the web server has appropriate permissions to access necessary directories. Execute the following commands:

```bash
sudo chown -R www-data:www-data /var/www/laravel/storage
sudo chmod -R 775 /var/www/laravel/storage
sudo chmod -R 775 /var/www/laravel/bootstrap/cache
```

Finally, restart Nginx one more time to ensure all changes are applied:

```bash
sudo systemctl restart nginx
```

And that's it! Your Laravel application should now be up and running on DigitalOcean. Don't forget to configure your Nginx server block to point to your Laravel application's public directory. Happy coding!
