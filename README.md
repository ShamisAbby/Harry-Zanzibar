# Harry – Deutscher Reiseleiter Zanzibar

Premium, German-language luxury tourism website and custom CMS for **Harry Deutscher Reiseleiter Zanzibar** — a German-speaking tour guide offering premium Zanzibar tours, day trips, and multi-day experiences.

## Architecture

This is a monorepo containing two independently deployable applications:

```
harry-zanzibar/
├── backend/    Laravel 12 (PHP 8.2+) — REST API + custom CMS + admin dashboard
├── frontend/   Next.js 15 (React 19, TypeScript) — public-facing website
```

The **Laravel backend** is API-only (Sanctum-authenticated) and owns the custom CMS: tours, bookings, blog, media, SEO settings, users/roles, analytics config, etc. The **Next.js frontend** consumes that API (SSR/ISR) to render the public site with server-side rendering for SEO.

## Tech Stack

**Frontend:** Next.js 15, React 19, TypeScript, Tailwind CSS v4, shadcn/ui, GSAP, Framer Motion, Three.js, Swiper, Lenis, Lottie, React Hook Form + Zod

**Backend:** Laravel 12, PHP 8.2+, Sanctum, Spatie Permission, Spatie Media Library, Spatie Sluggable, Spatie Sitemap, Spatie Activitylog, Spatie Backup

**Database:** MySQL (`harry_zanzibar`)

## Prerequisites

- XAMPP (Apache + MySQL/MariaDB) running
- PHP 8.2+ and Composer
- Node.js 20+ and npm
- Git

## Local Setup

### macOS

```bash
# 1. Clone (if not already in place)
git clone https://github.com/ShamisAbby/Harry-Zanzibar.git harry-zanzibar
cd harry-zanzibar

# 2. Start XAMPP Apache + MySQL (via XAMPP Control Panel or)
sudo /Applications/XAMPP/xamppfiles/xampp start

# 3. Create the database
/Applications/XAMPP/xamppfiles/bin/mysql -u root -e "CREATE DATABASE IF NOT EXISTS harry_zanzibar CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"

# 4. Backend (Laravel)
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
# Generates Filament Shield's permissions/policies. Must run before
# seeding: RoleSeeder grants super_admin every permission that exists
# at seed time, so if you skip this step super_admin ends up with zero
# permissions and can't access the CMS (its "super admin" bypass is a
# real permission grant in the DB, not a code-level gate - see
# database/seeders/RoleSeeder.php).
php artisan shield:generate --all --panel=admin --no-interaction
php artisan db:seed
php artisan storage:link
cd ..

# 5. Frontend (Next.js)
cd frontend
npm install
cp .env.local.example .env.local
cd ..
```

### Windows

```bat
:: 1. Clone (if not already in place)
git clone https://github.com/ShamisAbby/Harry-Zanzibar.git harry-zanzibar
cd harry-zanzibar

:: 2. Start XAMPP Apache + MySQL via XAMPP Control Panel

:: 3. Create the database (XAMPP MySQL bin, adjust path as needed)
"C:\xampp\mysql\bin\mysql.exe" -u root -e "CREATE DATABASE IF NOT EXISTS harry_zanzibar CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"

:: 4. Backend (Laravel)
cd backend
composer install
copy .env.example .env
php artisan key:generate
php artisan migrate
:: Must run before seeding - see the macOS steps above for why.
php artisan shield:generate --all --panel=admin --no-interaction
php artisan db:seed
php artisan storage:link
cd ..

:: 5. Frontend (Next.js)
cd frontend
npm install
copy .env.local.example .env.local
cd ..
```

## Running in Development

Two dev servers run side by side:

```bash
# Terminal 1 — Laravel API (http://localhost:8000)
cd backend && php artisan serve

# Terminal 2 — Queue worker (bookings, emails, notifications)
cd backend && php artisan queue:listen

# Terminal 3 — Next.js frontend (http://localhost:3000)
cd frontend && npm run dev
```

> The backend can alternatively be served through XAMPP's Apache by pointing a virtual host's document root at `backend/public` (recommended for testing production-like Apache behavior). See `docs/apache-vhost.md` for the vhost snippet and `/etc/hosts` entry — this is optional; `php artisan serve` is sufficient for day-to-day development.

## Building for Production

```bash
# Backend
cd backend
composer install --optimize-autoloader --no-dev
php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan migrate --force

# Frontend
cd frontend
npm run build
npm run start
```

## Project Status

This project is being built in sequential phases. See open issues / project board for current phase status:

1. Architecture & Project Setup
2. Authentication & CMS
3. Homepage
4. Tour Management
5. Booking System
6. Blog
7. SEO
8. Animations
9. Performance
10. Security
11. Analytics
12. Testing
13. Deployment

## License

Proprietary — all rights reserved.
