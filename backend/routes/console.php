<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schedule;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

// Nightly database + media backup (spatie/laravel-backup, configured in
// config/backup.php). Requires the scheduler to actually be running - see
// docs/deployment.md for the cron entry.
Schedule::command('backup:run')->daily()->at('02:00')->onOneServer();

// Keep only recent backups per config/backup.php's cleanup strategy.
Schedule::command('backup:clean')->daily()->at('02:30')->onOneServer();

// Prune activity log entries older than 6 months so the audit trail table
// doesn't grow unbounded.
Schedule::command('activitylog:clean --days=180')->weekly()->onOneServer();

// Trim old failed-job records periodically.
Schedule::command('queue:prune-failed --hours=720')->weekly()->onOneServer();
