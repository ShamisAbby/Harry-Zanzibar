# Optional: Serve the Laravel backend through XAMPP's Apache

Day-to-day development only needs `php artisan serve` (see main [README](../README.md)). If you want the backend served by Apache instead (closer to a production Apache setup), add a virtual host.

## macOS

1. Edit `/Applications/XAMPP/xamppfiles/etc/extra/httpd-vhosts.conf` and add:

   ```apacheconf
   <VirtualHost *:80>
       ServerName harry-zanzibar.test
       DocumentRoot "/Applications/XAMPP/xamppfiles/htdocs/harry-zanzibar/backend/public"
       <Directory "/Applications/XAMPP/xamppfiles/htdocs/harry-zanzibar/backend/public">
           AllowOverride All
           Require all granted
       </Directory>
   </VirtualHost>
   ```

2. Make sure `httpd-vhosts.conf` is included from the main `httpd.conf` (XAMPP enables this by default — look for the `Include etc/extra/httpd-vhosts.conf` line).

3. Add the host to `/etc/hosts`:

   ```
   127.0.0.1 harry-zanzibar.test
   ```

4. Restart Apache from the XAMPP control panel.

5. Visit `http://harry-zanzibar.test`.

## Windows

1. Edit `C:\xampp\apache\conf\extra\httpd-vhosts.conf` and add the equivalent block, pointing `DocumentRoot` at `C:/xampp/htdocs/harry-zanzibar/backend/public`.
2. Add `127.0.0.1 harry-zanzibar.test` to `C:\Windows\System32\drivers\etc\hosts` (requires admin rights).
3. Restart Apache via the XAMPP Control Panel.
