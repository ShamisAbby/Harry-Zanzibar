<x-mail::message>
# Neue Kontaktanfrage

<x-mail::panel>
**Name:** {{ $contactMessage->name }}<br>
**E-Mail:** {{ $contactMessage->email }}<br>
@if ($contactMessage->subject)
**Betreff:** {{ $contactMessage->subject }}<br>
@endif
</x-mail::panel>

{{ $contactMessage->message }}

<x-mail::button :url="config('app.url') . '/admin/contact-messages'">
Im Adminbereich öffnen
</x-mail::button>
</x-mail::message>
