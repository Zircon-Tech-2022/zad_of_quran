<?php

namespace App\Enums;

enum LessonStatus: string
{
    case NOT_ADDED = 'not_added';
    case WAITING   = 'waiting';
    case CONFIRMED = 'confirmed';

    public static function getValues(): array
    {
        $values = array_map(fn ($case) => $case->value, self::cases());
        // Sort alphabetically (case-insensitive)
        sort($values, SORT_FLAG_CASE | SORT_STRING);
    
        return $values;
    }

}
