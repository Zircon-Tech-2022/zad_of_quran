<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\Contact\ContactRequest;
use App\Mail\Contact;
use Illuminate\Support\Facades\Mail;

class ContactController extends Controller
{
    public function sendMail(ContactRequest $request)
    {
        $data = $request->validated();
        Mail::send(new Contact($data));
        return apiSuccessResponse(__('messages.mail_sent'));
    }
}
