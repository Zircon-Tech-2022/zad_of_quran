<?php

namespace App\Http\Controllers;

use App\Http\Requests\Comment\StoreCommentRequest;
use App\Http\Requests\Comment\UpdateCommentRequest;
use App\Models\Blog;
use App\Models\Comment;
use Arr;

class CommentController extends Controller
{
    public function __construct()
    {
        $this->middleware('permission:comments.list')->only('index');
        $this->middleware('permission:comments.create')->only('store');
        $this->middleware('permission:comments.view')->only('show');
        $this->middleware('permission:comments.update')->only('update');
        $this->middleware('permission:comments.softDelete')->only('destroy');
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $comments = Comment::when(request('q'), fn($query, $q) => $query->search($q))
            ->select(['id', 'content', 'approved', 'approved_by', 'approved_at', 'user_id', 'blog_id'])
            ->orderBy(request('orderBy', 'id'), request('orderDir', 'asc'))
            ->paginate(request('limit', 25));

        return apiSuccessResponse(__('messages.data_retrieved_successfully'), $comments);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCommentRequest $request)
    {
        $data = $request->validated();
        $data['blog_id'] = Blog::where('slug', $data['blog'])->value('id');
        $comment = Comment::create([
            'user_id' => auth()->id(),
            'content' => $data['content'],
            'blog_id' => $data['blog_id'],
        ]);
        return apiSuccessResponse(__('messages.added_success'), $comment->only('id', 'content'));
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCommentRequest $request, Comment $comment)
    {
        $data = $request->validated();
        if ($data['approved']):
            $data['approved_by'] = auth()->id();
            $data['approved_at'] = now();
        endif;
        $comment->update($data);
        return apiSuccessResponse(__('messages.updated_success'), $comment->only('id', 'content', 'approved', 'approved_by', 'approved_at'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Comment $comment)
    {
        if (auth()->user()?->can('comments.delete') || auth()->id() === $comment->user_id):
            if ($comment->delete()):
                return apiSuccessResponse(__('messages.deleted_success'));
            else:
                return apiErrorResponse(__('messages.deleted_failed'), 500);
            endif;
        else:
            return apiErrorResponse(__('messages.unauthorized'), 403);
        endif;
    }
}
