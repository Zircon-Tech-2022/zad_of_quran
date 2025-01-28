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

class NewSubscriber extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     */
    public function __construct(private $data) {}

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'New Subscriber',
            to: User::query()
                ->whereHas('roles.permissions', fn($q) => $q->where('name', 'mails.system.subscribe.recieve'))
                ->orWhereHas('permissions', fn($q) => $q->where('name', 'mails.system.subscribe.recieve'))
                ->pluck('email')
                ->toArray(),
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            // view: 'view.name',
            view: 'emails.new-subscriber',
            with: $this->data
            //             htmlString: <<<HTML

            // <h1>hello</h1>
            // <p>New Subscriber named: {$this->data['name']}</p>

            // HTML,
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
