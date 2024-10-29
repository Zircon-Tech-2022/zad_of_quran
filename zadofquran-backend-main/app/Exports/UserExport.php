<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\FromCollection;

class UserExport implements FromCollection
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