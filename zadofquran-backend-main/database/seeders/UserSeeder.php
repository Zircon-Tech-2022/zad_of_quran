<?php

namespace Database\Seeders;

use App\Models\User;
use Hash;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $superAdmins = [
            [
                'name' => 'Ahmed Aymen Tarboush',
                'email' => "ahmedaymantarboush@outlook.sa",
                'email_verified_at' => now(),
                'password' => "123456789",
                'phone' => '+201069512633',
            ],
            [
                'name' => 'م. عبدالرحمن مصطفى',
                'email' => "abdelrahmanmostafa785@gmail.com",
                'email_verified_at' => now(),
                'password' => "123456789",
                'phone' => '+201097887410',
            ],
            [
                'name' => 'د. علي علاء',
                'email' => "alialaa932003@gmail.com",
                'email_verified_at' => now(),
                'password' => "123456789",
                'phone' => '+201279643526',
            ],
        ];

        foreach ($superAdmins as $superAdmin) {
            User::create($superAdmin)->assignRole('super-admin');
        }
        if (config('app.env') === 'production') {
            $admins = [
                // admin@zadofquran.com => dUi35$%dR06f
                [
                    'name' => 'Admin',
                    'email' => "admin@zadofquran.com",
                    'email_verified_at' => now(),
                    'password' => Hash::make('dUi35$%dR06f'),
                    'phone' => '+000000000000',
                ],
                // support@zadofquran.com => dUi35$%dR06f
                [
                    'name' => 'Support',
                    'email' => "support@zadofquran.com",
                    'email_verified_at' => now(),
                    'password' => Hash::make('dUi35$%dR06f'),
                    'phone' => '+000000000000',
                ],

                // Abdel-Rahman@zadofquran.com => #MHY1OH7HUEt
                [
                    'name' => 'Abdel-Rahman',
                    'email' => "Abdel-Rahman@zadofquran.com",
                    'email_verified_at' => now(),
                    'password' => Hash::make('#MHY1OH7HUEt'),
                    'phone' => '+201050097160',
                ],

                // Anas@zadofquran.com => #MHY1OH7HUEt
                [
                    'name' => 'Anas',
                    'email' => "Anas@zadofquran.com",
                    'email_verified_at' => now(),
                    'password' => Hash::make('#MHY1OH7HUEt'),
                    'phone' => '+201008581646',
                ],

                // Karim@zadofquran.com => #MHY1OH7HUEt
                [
                    'name' => 'Karim',
                    'email' => "Karim@zadofquran.com",
                    'email_verified_at' => now(),
                    'password' => Hash::make('#MHY1OH7HUEt'),
                    'phone' => '+201559944206',
                ],
            ];

            foreach ($admins as $admin) {
                User::create($admin)->assignRole('admin');
            }
        }

        if (config('app.debug'))
            User::factory(50)->create();
    }
}
