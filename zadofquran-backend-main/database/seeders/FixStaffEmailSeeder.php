<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Staff;

class FixStaffEmailSeeder extends Seeder
{
    public function run(): void
    {
        Staff::with('details')
            ->whereNull('email')
            ->orWhere('email', '')
            ->chunk(100, function ($staffList) {
                foreach ($staffList as $staff) {
                    $detailsEmail = $staff->details?->email;

                    if (!empty($detailsEmail)) {
                        $staff->update([
                            'email' => $detailsEmail,
                        ]);
                    }
                }
            });
    }
}