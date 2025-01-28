<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>New Subscriber</title>
</head>
<body>
    <h1>I Want To Subscribe</h1>
    <p>Hi, Admin</p>
    <p>I want to subscribe in your website With {{ DB::table('plans')->where('id',$plan_id)->value('name') }} Plan.</p>
    {{--
        {
            "name":"Ahmed Ayman Mahmoud Tarboush",
            "age": 20,
            "gender":"male",
            "persons_count":1,
            "phone":"+201069512633",
            "appointments":"Every Day At Every Time"
        }
    --}}
    <p>My Name: {{ $name }}</p>
    <p>My Email: {{ $email }}</p>
    <p>My Age: {{ $age }}</p>
    <p>My Gender: {{ $gender }}</p>
    <p>Persons Count: {{ $persons_count }}</p>
    <p>My Phone: {{ $phone }}</p>
    <p>My Avilable Appointments: {{ $appointments }}</p>

    <p>Thank you</p>
</body>
</html>
