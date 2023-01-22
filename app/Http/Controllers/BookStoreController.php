<?php

namespace App\Http\Controllers;

use App\Models\BookStore;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Contracts\View\Factory;
use Illuminate\Contracts\View\View;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class BookStoreController extends Controller
{
    public function index(): Response
    {
        $bookStoreList = BookStore::latest()->paginate(5);

        return Inertia::render('BookStore/Index', [
            'bookStoreList' => $bookStoreList
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('BookStore/Create');
    }

    public function store(Request $request): \Illuminate\Http\RedirectResponse
    {
        $request->validate([
            'name' => 'required',
            'ISBN' => 'required',
            'value' => 'required',
        ]);

        BookStore::create($request->all());

        return Redirect::route('bookstore.index');
    }

    /**
     * @param $id
     * @return Response
     */
    public function show($id)
    {
        $bookStore = BookStore::find($id);
        return Inertia::render('BookStore/Edit', compact('bookStore'));
    }


    public function edit($id)
    {
        $bookStore = BookStore::find($id);
        return Inertia::render('BookStore/Edit', compact('bookStore'));
    }

    /**
     * @param Request $request
     * @param $id
     * @return Response
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required',
            'ISBN' => 'required',
            'value' => 'required',
        ]);

        $bookStore = BookStore::find($id);

        $bookStore->fill($request->post())->save();
        return Inertia::render('BookStore/Edit', compact('bookStore'));
    }

    /**
     * @param $id
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy($id)
    {
        $stock = BookStore::find($id);
        $stock->delete();

        return Redirect::route('bookstore.index')->with('success', 'Book removed.');
    }
}
