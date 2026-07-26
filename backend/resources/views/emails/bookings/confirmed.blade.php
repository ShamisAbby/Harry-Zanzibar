<x-mail::message>
# Ihre Buchung ist bestätigt, {{ $booking->customer_name }}!

Wir freuen uns, Ihnen mitzuteilen, dass Ihre Buchung bestätigt wurde.

<x-mail::panel>
**Referenz:** {{ $booking->reference }}<br>
@if ($booking->tour)
**Tour:** {{ $booking->tour->title }}<br>
@endif
@if ($booking->preferred_date)
**Datum:** {{ $booking->preferred_date->format('d.m.Y') }}<br>
@endif
@if ($booking->travelers_count)
**Personen:** {{ $booking->travelers_count }}<br>
@endif
</x-mail::panel>

<x-mail::button :url="rtrim(config('services.frontend.url'), '/') . '/buchung-bestaetigung?ref=' . $booking->reference">
Buchungsdetails ansehen
</x-mail::button>

Wir freuen uns auf Sie!

Herzliche Grüße,<br>
{{ config('app.name') }}
</x-mail::message>
