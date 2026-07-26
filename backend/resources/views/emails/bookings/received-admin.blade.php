<x-mail::message>
# Neue Buchungsanfrage: {{ $booking->reference }}

<x-mail::panel>
**Kunde:** {{ $booking->customer_name }}<br>
**E-Mail:** {{ $booking->customer_email }}<br>
@if ($booking->customer_phone)
**Telefon:** {{ $booking->customer_phone }}<br>
@endif
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

@if ($booking->message)
**Nachricht:**

{{ $booking->message }}
@endif

<x-mail::button :url="config('app.url') . '/admin/bookings/' . $booking->id . '/edit'">
Buchung im Adminbereich öffnen
</x-mail::button>
</x-mail::message>
