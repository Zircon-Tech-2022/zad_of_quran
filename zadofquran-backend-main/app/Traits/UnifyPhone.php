<?php

namespace App\Traits;

trait UnifyPhone
{
  public function unifyPhone($phone): ?string
  {
    if (!$phone) {
      return null;
    }

    $phone = preg_replace('/[\s\-\(\)\/]/', '', $phone);

    if (substr($phone, 0, 1) !== '+') {
      $phone = '+' . $phone;
    }

    return $phone;
  }
}
