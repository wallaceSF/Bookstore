<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @template T of Model
 * @mixin T
 * @mixin Builder
 */
class BookStore extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'ISBN', 'value'];
}
