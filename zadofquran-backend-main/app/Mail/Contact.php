<?php

namespace App\Mail;

use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Address;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class Contact extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     */
    public function __construct(private array $data)
    {
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: $this->data['subject'],
            from: new Address($this->data['email'], $this->data['name']),
            to: User::query()
                ->whereHas('roles.permissions', fn($q) => $q->where('name', 'mails.system.contact.recieve'))
                ->orWhereHas('permissions', fn($q) => $q->where('name', 'mails.system.contact.recieve'))
                ->pluck('email')
                ->toArray(),
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        if (isset($this->data['phone'])) {
            $this->data['content'] .= "<br><br>" . 'Phone Number: ' . $this->data['phone'];
        }
        return new Content(
            htmlString: $this->data['content'],
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
