<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\FromCollection;

class SubscriberExport implements FromCollection
{
    public function __construct(private $data)
    {
    }
    /**
     * @return \Illuminate\Support\Collection
     */
    public function collection()
    {
        return collect($this->data);
    }
}