<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use App\Http\Requests\Blog\StoreBlogRequest;
use App\Http\Requests\Blog\UpdateBlogRequest;
use App\Models\Comment;
use Arr;
use Illuminate\Support\Facades\Storage;

class BlogController extends Controller
{
    public function __construct()
    {
        $this->middleware('permission:blogs.list')->only('index');
        $this->middleware('permission:blogs.create')->only('store');
        $this->middleware('permission:blogs.view')->only('show');
        $this->middleware('permission:blogs.update')->only('update');
        $this->middleware('permission:blogs.softDelete')->only('destroy');
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $blogs = Blog::when(request('q'), fn($query, $q) => $query->search($q))
            ->select(['id', 'title', 'slug', 'content', 'description', 'short_description', 'image', 'published_at','locale'])
            ->orderBy(request('orderBy', 'id'), request('orderDir', 'desc'))
            ->paginate(request('limit', 25));

        return apiSuccessResponse(__('messages.data_retrieved_successfully'), $blogs);
    }

    /**
     * Display a listing of the resource.
     */
    public function blogs()
    {
        $blogs = Blog::when(request('q'), fn($query, $q) => $query->search($q))
            ->select(['id', 'title', 'slug', 'content', 'description', 'short_description', 'image', 'published_at','locale'])
            ->orderBy(request('orderBy', 'id'), request('orderDir', 'desc'))
            ->where('locale', app()->getLocale())
            ->paginate(request('limit', 6));

        return apiSuccessResponse(__('messages.data_retrieved_successfully'), $blogs);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreBlogRequest $request)
    {
        $data = $request->validated();
        $blog = Blog::create($data);
        $blog = $blog->only('id', 'title', 'slug', 'content', 'description', 'short_description', 'image', 'published_at','locale');
        return apiSuccessResponse(__('messages.added_success'), $blog);
    }

    /**
     * Display the specified resource.
     */
    public function show(Blog $blog)
    {
        $blog = $blog->only('id', 'title', 'slug', 'content', 'description', 'short_description', 'image', 'published_at','locale');
        return apiSuccessResponse(__('messages.data_retrieved_successfully'), $blog);
    }

    /**
     * Display the specified resource.
     */
    public function blog(Blog $blog)
    {
        return apiSuccessResponse(__('messages.data_retrieved_successfully'), $blog);
    }

    /**
     * Display Blog Comments.
     */
    public function comments(Blog $blog)
    {
        $limit = request('limit', 3);
        $comments = Comment::where('blog_id', $blog->id)
            ->where('approved', true)
            ->with('user:id,name')
            ->select(['id', 'content', 'user_id'])
            ->orderBy(request('orderBy', 'id'), request('orderDir', 'desc'))
            ->limit($limit)
            ->offset((request('page', 1) - 1) * $limit)
            ->get();

        return apiSuccessResponse(__('messages.data_retrieved_successfully'), $comments);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateBlogRequest $request, Blog $blog)
    {
        $data = $request->validated();
        $blog->update($data);
        $blog = $blog->only('id', 'title', 'slug', 'content', 'description', 'short_description', 'image', 'published_at','locale');
        return apiSuccessResponse(__('messages.updated_success'), $blog);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Blog $blog)
    {
        $blog->delete();
        return apiSuccessResponse(__('messages.deleted_success'));
    }
}
