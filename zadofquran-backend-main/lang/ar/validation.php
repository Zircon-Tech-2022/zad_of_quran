<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Validation Language Lines
    |--------------------------------------------------------------------------
    |
    | The following language lines contain the default error messages used by
    | the validator class. Some of these rules have multiple versions such
    | as the size rules. Feel free to tweak each of these messages here.
    |
    */

    'accepted' => 'يجب قبول حقل :attribute.',
    'accepted_if' => 'يجب قبول حقل :attribute عندما يكون :other هو :value.',
    'active_url' => 'يجب أن يكون حقل :attribute عنوان URL صالحًا.',
    'after' => 'يجب أن يكون حقل :attribute تاريخًا بعد :date.',
    'after_or_equal' => 'يجب أن يكون حقل :attribute تاريخًا بعد أو يساوي :date.',
    'alpha' => 'يجب أن يحتوي حقل :attribute على أحرف فقط.',
    'alpha_dash' => 'يجب أن يحتوي حقل :attribute على أحرف وأرقام وشرطات وشرطات سفلية فقط.',
    'alpha_num' => 'يجب أن يحتوي حقل :attribute على أحرف وأرقام فقط.',
    'array' => 'يجب أن يكون حقل :attribute مصفوفة.',
    'ascii' => 'يجب أن يحتوي حقل :attribute على أحرف أبجدية أو أرقام أحادية البايت ورموز فقط.',
    'before' => 'يجب أن يكون حقل :attribute تاريخًا قبل :date.',
    'before_or_equal' => 'يجب أن يكون حقل :attribute تاريخًا قبل أو يساوي :date.',
    'between' => [
        'array' => 'يجب أن يحتوي حقل :attribute على بين :min و :max عنصرًا.',
        'file' => 'يجب أن يكون حجم حقل :attribute بين :min و :max كيلوبايت.',
        'numeric' => 'يجب أن يكون حقل :attribute بين :min و :max.',
        'string' => 'يجب أن يكون حقل :attribute بين :min و :max حرفًا.',
    ],
    'boolean' => 'يجب أن يكون حقل :attribute صحيحًا أو خاطئًا فقط.',
    'can' => 'يحتوي حقل :attribute على قيمة غير مصرح بها.',
    'confirmed' => 'لا يتطابق حقل :attribute مع حقل التأكيد.',
    'current_password' => 'كلمة المرور غير صحيحة.',
    'date' => 'يجب أن يكون حقل :attribute تاريخًا صالحًا.',
    'date_equals' => 'يجب أن يكون حقل :attribute تاريخًا يساوي :date.',
    'date_format' => 'يجب أن يتطابق حقل :attribute مع التنسيق :format.',
    'decimal' => 'يجب أن يحتوي حقل :attribute على :decimal أماكن عشرية.',
    'declined' => 'يجب رفض حقل :attribute.',
    'declined_if' => 'يجب رفض حقل :attribute عندما يكون :other هو :value.',
    'different' => 'يجب أن يكون حقل :attribute مختلفًا عن حقل :other.',
    'digits' => 'يجب أن يحتوي حقل :attribute على :digits أرقام.',
    'digits_between' => 'يجب أن يحتوي حقل :attribute على بين :min و :max أرقام.',
    'dimensions' => 'يحتوي حقل :attribute على أبعاد صورة غير صالحة.',
    'distinct' => 'يحتوي حقل :attribute على قيمة مكررة.',
    'doesnt_end_with' => 'يجب أن لا ينتهي حقل :attribute بأحد القيم التالية: :values.',
    'doesnt_start_with' => 'يجب أن لا يبدأ حقل :attribute بأحد القيم التالية: :values.',
    'email' => 'يجب أن يكون حقل :attribute عنوان بريد إلكتروني صالحًا.',
    'ends_with' => 'يجب أن ينتهي حقل :attribute بأحد القيم التالية: :values.',
    'enum' => 'القيمة المحددة :attribute غير صالحة.',
    'exists' => 'القيمة المحددة :attribute غير صالحة.',
    'file' => 'يجب أن يكون حقل :attribute ملفًا.',
    'filled' => 'يجب أن يحتوي حقل :attribute على قيمة.',
    'gt' => [
        'array' => 'يجب أن يحتوي حقل :attribute على أكثر من :value عنصرًا.',
        'file' => 'يجب أن يكون حجم حقل :attribute أكبر من :value كيلوبايت.',
        'numeric' => 'يجب أن يكون حقل :attribute أكبر من :value.',
        'string' => 'يجب أن يكون حقل :attribute أكبر من :value حرفًا.',
    ],
    'gte' => [
        'array' => 'يجب أن يحتوي حقل :attribute على :value عنصرًا أو أكثر.',
        'file' => 'يجب أن يكون حجم حقل :attribute أكبر من أو يساوي :value كيلوبايت.',
        'numeric' => 'يجب أن يكون حقل :attribute أكبر من أو يساوي :value.',
        'string' => 'يجب أن يكون حقل :attribute أكبر من أو يساوي :value حرفًا.',
    ],
    'image' => 'يجب أن يكون حقل :attribute صورة.',
    'in' => 'القيمة المحددة :attribute غير صالحة.',
    'in_array' => 'يجب أن يحتوي حقل :attribute على قيمة موجودة في :other.',
    'integer' => 'يجب أن يكون حقل :attribute عددًا صحيحًا.',
    'ip' => 'يجب أن يكون حقل :attribute عنوان IP صالحًا.',
    'ipv4' => 'يجب أن يكون حقل :attribute عنوان IPv4 صالحًا.',
    'ipv6' => 'يجب أن يكون حقل :attribute عنوان IPv6 صالحًا.',
    'json' => 'يجب أن يكون حقل :attribute سلسلة JSON صالحة.',
    'lowercase' => 'يجب أن يكون حقل :attribute حروفًا صغيرة فقط.',
    'lt' => [
        'array' => 'يجب أن يحتوي حقل :attribute على أقل من :value عنصرًا.',
        'file' => 'يجب أن يكون حجم حقل :attribute أقل من :value كيلوبايت.',
        'numeric' => 'يجب أن يكون حقل :attribute أقل من :value.',
        'string' => 'يجب أن يكون حقل :attribute أقل من :value حرفًا.',
    ],
    'lte' => [
        'array' => 'يجب أن يحتوي حقل :attribute على :value عنصرًا أو أقل.',
        'file' => 'يجب أن يكون حجم حقل :attribute أقل من أو يساوي :value كيلوبايت.',
        'numeric' => 'يجب أن يكون حقل :attribute أقل من أو يساوي :value.',
        'string' => 'يجب أن يكون حقل :attribute أقل من أو يساوي :value حرفًا.',
    ],
    'mac_address' => 'يجب أن يكون حقل :attribute عنوان MAC صالحًا.',
    'max' => [
        'array' => 'يجب أن لا يحتوي حقل :attribute على أكثر من :max عنصرًا.',
        'file' => 'يجب أن لا يكون حجم حقل :attribute أكبر من :max كيلوبايت.',
        'numeric' => 'يجب أن لا يكون حقل :attribute أكبر من :max.',
        'string' => 'يجب أن لا يكون حقل :attribute أكبر من :max حرفًا.',
    ],
    'max_digits' => 'يجب أن لا يحتوي حقل :attribute على أكثر من :max أرقام.',
    'mimes' => 'يجب أن يكون حقل :attribute ملفًا من النوع: :values.',
    'mimetypes' => 'يجب أن يكون حقل :attribute ملفًا من النوع: :values.',
    'min' => [
        'array' => 'يجب أن يحتوي حقل :attribute على الأقل على :min عنصرًا.',
        'file' => 'يجب أن يكون حجم حقل :attribute على الأقل :min كيلوبايت.',
        'numeric' => 'يجب أن يكون حقل :attribute على الأقل :min.',
        'string' => 'يجب أن يكون حقل :attribute على الأقل :min حرفًا.',
    ],
    'min_digits' => 'يجب أن يحتوي حقل :attribute على الأقل على :min أرقام.',
    'missing' => 'يجب أن يكون حقل :attribute مفقودًا.',
    'missing_if' => 'يجب أن يكون حقل :attribute مفقودًا عندما يكون :other هو :value.',
    'missing_unless' => 'يجب أن يكون حقل :attribute مفقودًا ما لم يكن :other هو :value.',
    'missing_with' => 'يجب أن يكون حقل :attribute مفقودًا عندما يكون :values موجودًا.',
    'missing_with_all' => 'يجب أن يكون حقل :attribute مفقودًا عندما تكون :values موجودة.',
    'multiple_of' => 'يجب أن يكون حقل :attribute مضاعفًا لـ :value.',
    'not_in' => 'القيمة المحددة :attribute غير صالحة.',
    'not_regex' => 'تنسيق حقل :attribute غير صالح.',
    'numeric' => 'يجب أن يكون حقل :attribute رقمًا.',
    'password' => [
        'letters' => 'يجب أن يحتوي حقل :attribute على حرف واحد على الأقل.',
        'mixed' => 'يجب أن يحتوي حقل :attribute على حرف كبير وحرف صغير ورقم ورمز واحد على الأقل.',
        'numbers' => 'يجب أن يحتوي حقل :attribute على رقم واحد على الأقل.',
        'symbols' => 'يجب أن يحتوي حقل :attribute على رمز واحد على الأقل.',
        'uncompromised' => 'تم العثور على :attribute المعطى في تسريب بيانات. يرجى اختيار :attribute مختلف.',
    ],
    'present' => 'يجب أن يكون حقل :attribute موجودًا.',
    'prohibited' => 'يحظر حقل :attribute.',
    'prohibited_if' => 'يحظر حقل :attribute عندما يكون :other هو :value.',
    'prohibited_unless' => 'يحظر حقل :attribute ما لم يكن :other موجودًا في :values.',
    'prohibits' => 'يحظر حقل :attribute من وجود :other.',
    'phone_number' => 'يجب أن يكون حقل :attribute رقم هاتف صالح.',
    'regex' => 'تنسيق حقل :attribute غير صالح.',
    'required' => 'يجب تقديم حقل :attribute.',
    'required_array_keys' => 'يجب أن يحتوي حقل :attribute على مدخلات لـ :values.',
    'required_if' => 'يجب تقديم حقل :attribute عندما يكون :other هو :value.',
    'required_if_accepted' => 'يجب تقديم حقل :attribute عندما يتم قبول :other.',
    'required_unless' => 'يجب تقديم حقل :attribute ما لم يكن :other موجودًا في :values.',
    'required_with' => 'يجب تقديم حقل :attribute عندما يكون :values موجودًا.',
    'required_with_all' => 'يجب تقديم حقل :attribute عندما تكون :values موجودة.',
    'required_without' => 'يجب تقديم حقل :attribute عندما لا يكون :values موجودًا.',
    'required_without_all' => 'يجب تقديم حقل :attribute عندما لا تكون أيًا من :values موجودة.',
    'same' => 'يجب أن يتطابق حقل :attribute مع :other.',
    'size' => [
        'array' => 'يجب أن يحتوي حقل :attribute على :size عنصرًا.',
        'file' => 'يجب أن يكون حجم حقل :attribute :size كيلوبايت.',
        'numeric' => 'يجب أن يكون حقل :attribute :size.',
        'string' => 'يجب أن يكون حقل :attribute :size حرفًا.',
    ],
    'starts_with' => 'يجب أن يبدأ حقل :attribute بأحد القيم التالية: :values.',
    'string' => 'يجب أن يكون حقل :attribute سلسلة نصية.',
    'timezone' => 'يجب أن يكون حقل :attribute منطقة زمنية صالحة.',
    'unique' => 'تم استخدام :attribute من قبل.',
    'uploaded' => 'فشل تحميل حقل :attribute.',
    'uppercase' => 'يجب أن يكون حقل :attribute حروفًا كبيرة فقط.',
    'url' => 'يجب أن يكون حقل :attribute عنوان URL صالحًا.',
    'ulid' => 'يجب أن يكون حقل :attribute ULID صالحًا.',
    'uuid' => 'يجب أن يكون حقل :attribute UUID صالحًا.',
    'min_words' => 'يجب أن يحتوي حقل :attribute على الأقل على :min كلمات.',

    /*
    |--------------------------------------------------------------------------
    | Custom Validation Language Lines
    |--------------------------------------------------------------------------
    |
    | Here you may specify custom validation messages for attributes using the
    | convention "attribute.rule" to name the lines. This makes it quick to
    | specify a specific custom language line for a given attribute rule.
    |
    */

    'custom' => [
        'attribute-name' => [
            'rule-name' => 'custom-message',
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Custom Validation Attributes
    |--------------------------------------------------------------------------
    |
    | The following language lines are used to swap our attribute placeholder
    | with something more reader friendly such as "E-Mail Address" instead
    | of "email". This simply helps us make our message more expressive.
    |
    */

    'attributes' => [
        'email' => 'البريد الإلكتروني',
        'password' => 'كلمة المرور',
        'name' => 'الاسم',
        'phone' => 'رقم الهاتف',
        'image' => 'الصورة',
        'qualifications' => 'المؤهلات',
        'question' => 'السؤال',
        'answer' => 'الإجابة',
        'is_active' => 'الحالة',
        'locale' => 'اللغة',
        'content' => 'المحتوى',
        'title' => 'العنوان',
        'description' => 'الوصف',
        'short_description' => 'الوصف المختصر',
        'price' => 'السعر',
        'currency' => 'العملة',
        'discount' => 'الخصم',
        'monthly_sessions' => 'الجلسات الشهرية',
        'weekly_sessions' => 'الجلسات الأسبوعية',
        'session_duration' => 'مدة الجلسة',
        'slug' => 'الرابط',
        'published_at' => 'تاريخ النشر',
        'publish' => 'نشر',
        'type' => 'النوع',
        'age' => 'العمر',
        'gender' => 'الجنس',
        'persons_count' => 'عدد الأشخاص',
        'appointments' => 'المواعيد',
        'plan_id' => 'الباقة',
        'blog' => 'المدونة',
        'approved' => 'الموافقة',
    ],

];
