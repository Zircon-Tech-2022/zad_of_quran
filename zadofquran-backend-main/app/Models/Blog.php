<?php

namespace App\Models;

use App\Casts\TranslatedDateTime;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class Blog extends Model
{
    use HasFactory, SoftDeletes;

    protected static function boot()
    {
        parent::boot();

        static::creating(fn($blog) => self::titleSlugification($blog));
        static::updating(fn($blog) => self::titleSlugification($blog));

        static::creating(fn($blog) => self::uploadImage($blog));
        static::updating(fn($blog) => self::uploadImage($blog));

        static::creating(fn($blog) => self::publishBlog($blog));
        static::updating(fn($blog) => self::publishBlog($blog));

        static::creating(fn($blog) => self::setlocale($blog));
        static::updating(fn($blog) => self::setlocale($blog));

        static::forceDeleted(fn($blog) => deleteFile($blog->image));
    }
    private static function titleSlugification($blog)
    {
        $slug = Str::slug($blog->title);

        // Check if the slug already exists in the database
        $count = DB::table((new self)->getTable())->where('slug', 'LIKE', "$slug%")->where('id', '!=', $blog->id ?? 0)->count();
        if ($count > 0) {
            $uniqueId = strtotime($blog->created_at);
            $slug .= '-' . ($uniqueId ? $uniqueId : strtotime('now'));
        }

        $blog->slug = $slug;
    }

    private static function uploadImage($blog)
    {
        $blog->image = uploadFile('image', 'blogs', $blog->getOriginal('image'), asset('assets/blog.png'));
    }

    private static function publishBlog($blog)
    {
        if ($blog->publish):
            $blog->published_at = now();
        else:
            $blog->published_at = null;
        endif;
        unset($blog->publish);
    }

    private static function setlocale($blog)
    {
        $blog->locale = $blog->locale ?? app()->getLocale();
    }

    protected $guarded = [];

    protected $casts = [
        'published_at' => 'datetime:Y-m-d H:i:s',
        'created_at' => TranslatedDateTime::class,
        'updated_at' => TranslatedDateTime::class
    ];

    public function scopeSearch($query, $q)
    {
        return $query->where('title', 'like', "%$q%")
            ->orWhere('content', 'like', "%$q%")
            ->orWhere('description', 'like', "%$q%")
            ->orWhere('short_description', 'like', "%$q%")
            ->orWhere('image', 'like', "%$q%");
    }

    public function scopePublished($query)
    {
        return $query->whereNotNull('published_at');
    }

    public function scopeUnpublished($query)
    {
        return $query->whereNull('published_at');
    }

    public function comments()
    {
        return $this->hasMany(Comment::class);
    }
}
