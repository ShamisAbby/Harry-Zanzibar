# Deployment Guide

This project is a monorepo with two independently deployable apps: the
Laravel API/CMS (`backend/`) and the Next.js public site (`frontend/`).
They can live on the same server or be split across two (e.g. backend on a
VPS, frontend on Vercel) - adjust the steps below accordingly.

## Server prerequisites

- PHP 8.2+ with the usual Laravel extensions (mbstring, pdo_mysql, bcmath,
  intl, gd or imagick, zip)
- Composer 2.x
- MySQL 8 (or MariaDB 10.4+)
- Node.js 20+ and npm
- A process manager for the queue worker (Supervisor) and, if not using a
  platform like Vercel for the frontend, one for the Next.js server too (PM2)
- Nginx or Apache as a reverse proxy / web server
- Redis (optional but recommended over the `database` cache/session/queue
  driver at any real traffic volume)

## 1. Environment variables

Copy `.env.example` to `.env` on the server and set at minimum:

```
APP_ENV=production
APP_DEBUG=false
APP_URL=https://your-domain.tld
FRONTEND_URL=https://your-domain.tld
SANCTUM_STATEFUL_DOMAINS=your-domain.tld

DB_CONNECTION=mysql
DB_HOST=...
DB_DATABASE=...
DB_USERNAME=...
DB_PASSWORD=...

MAIL_MAILER=smtp   # or ses/postmark/resend - never "log" in production
MAIL_HOST=...
MAIL_USERNAME=...
MAIL_PASSWORD=...
MAIL_FROM_ADDRESS=...
ADMIN_NOTIFICATION_EMAIL=...

# Recommended once Redis is available:
CACHE_STORE=redis
SESSION_DRIVER=redis
QUEUE_CONNECTION=redis
REDIS_HOST=...
REDIS_PASSWORD=...

# Only if using S3 or R2 for media storage instead of local disk:
FILESYSTEM_DISK=s3   # or r2
```

For the frontend, set in its own `.env.production` or your hosting
platform's environment settings:

```
NEXT_PUBLIC_API_URL=https://api.your-domain.tld/api
NEXT_PUBLIC_SITE_URL=https://your-domain.tld
```

**Never commit real production secrets.** `.env` files are gitignored;
keep production values in your host/platform's secret manager.

## 2. Backend deploy steps

```bash
cd backend
composer install --optimize-autoloader --no-dev
php artisan key:generate --force   # only on first deploy
php artisan migrate --force
# Only needed the first time, or after adding new Filament resources:
php artisan shield:generate --all --panel=admin --no-interaction
php artisan db:seed --force        # only on first deploy - seeds demo content, roles, admin user
php artisan storage:link
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

> **Important:** change the seeded admin password (`admin@harry-zanzibar.test`
> / `password`) immediately after the first deploy, or better, create a real
> admin user via `php artisan tinker` and delete the seeded one.

### Queue worker

Booking/contact/newsletter emails are queued, not sent inline - nothing
gets emailed unless a worker is running. Use the provided
`backend/deploy/supervisor-queue-worker.conf` as a starting point:

```bash
sudo cp backend/deploy/supervisor-queue-worker.conf /etc/supervisor/conf.d/harry-zanzibar-worker.conf
sudo supervisorctl reread && sudo supervisorctl update
sudo supervisorctl start harry-zanzibar-worker:*
```

### Scheduler

`routes/console.php` schedules nightly backups, backup cleanup, and
periodic log pruning - none of it runs unless cron calls Laravel's
scheduler every minute:

```
* * * * * cd /var/www/harry-zanzibar/backend && php artisan schedule:run >> /dev/null 2>&1
```

## 3. Frontend deploy steps

```bash
cd frontend
npm ci
npm run build
```

Then either:

- **Vercel (or similar):** point it at the `frontend/` directory as the
  project root and set the env vars above - it handles the Node process,
  ISR revalidation, and CDN for you.
- **Self-hosted Node server:** run `npm run start` behind a reverse proxy,
  kept alive with the provided `frontend/ecosystem.config.js`:

  ```bash
  npm install -g pm2
  pm2 start ecosystem.config.js
  pm2 save
  ```

## 4. Reverse proxy (Nginx example)

```nginx
# Next.js frontend
server {
    listen 443 ssl http2;
    server_name your-domain.tld;
    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}

# Laravel API
server {
    listen 443 ssl http2;
    server_name api.your-domain.tld;
    root /var/www/harry-zanzibar/backend/public;
    index index.php;
    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }
    location ~ \.php$ {
        fastcgi_pass unix:/var/run/php/php8.2-fpm.sock;
        fastcgi_index index.php;
        include fastcgi_params;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
    }
}
```

Use `certbot --nginx` (or your platform's managed TLS) for both hosts.

## 5. Backups

`spatie/laravel-backup` is installed and scheduled nightly
(`config/backup.php`). By default it backs up to the `local` disk - for a
real deployment, add `s3` or `r2` to the `destination.disks` array in that
config so backups don't live only on the same server they're protecting.

## 6. Pre-launch checklist

- [ ] Real business details filled into `/impressum`, and `/agb` reviewed
      by someone qualified to confirm German legal compliance (these ship
      as clearly-marked templates, not final legal text)
- [ ] `admin@harry-zanzibar.test` password changed or account replaced
- [ ] Analytics/tracking IDs entered at `/admin/manage-site-settings`
      (GA4, GTM, Meta Pixel, etc.) - nothing fires until you do, and even
      then only after visitor consent
- [ ] Google Search Console + Bing Webmaster verification codes set in the
      same settings page, sitemap (`/sitemap.xml`) submitted to both
- [ ] Real tour/blog photography uploaded via the Media Library (the
      gradient placeholders are intentional stand-ins, not final assets)
- [ ] WhatsApp number in `frontend/src/config/site.ts` and the CMS
      settings page updated to the real business number
- [ ] SMTP credentials configured (`MAIL_MAILER` is `log` by default -
      no real emails send until this is changed)
- [ ] `APP_DEBUG=false` confirmed in production `.env`
