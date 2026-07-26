<x-mail::message>
# Vielen Dank für Ihre Anfrage, {{ $booking->customer_name }}!

Ihre Anfrage ist bei uns eingegangen und wird persönlich von Harry bearbeitet. Sie erhalten
innerhalb von 24 Stunden eine Rückmeldung.

<x-mail::panel>
**Referenz:** {{ $booking->reference }}<br>
@if ($booking->tour)
**Tour:** {{ $booking->tour->title }}<br>
@endif
@if ($booking->preferred_date)
**Wunschdatum:** {{ $booking->preferred_date->format('d.m.Y') }}<br>
@endif
@if ($booking->travelers_count)
**Personen:** {{ $booking->travelers_count }}<br>
@endif
</x-mail::panel>

Bei dringenden Fragen erreichen Sie uns jederzeit auch direkt per WhatsApp.

Herzliche Grüße,<br>
{{ config('app.name') }}
</x-mail::message>
