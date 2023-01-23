<?php

namespace App\Http\Controllers;

use App\Models\BookStore;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class BookStoreController extends Controller
{
    /**
     * @return Response
     */
    public function index(): Response
    {
        $bookStoreList = BookStore::latest()->paginate(5);

        return Inertia::render('BookStore/Index', [
            'bookStoreList' => $bookStoreList
        ]);
    }

    /**
     * @return Response
     */
    public function create(): Response
    {
        return Inertia::render('BookStore/Create');
    }

    /**
     * @param Request $request
     * @return RedirectResponse
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required',
            'ISBN' => 'numeric',
            'value' => 'between:0,99.99',
        ]);

        BookStore::create($request->all());

        return Redirect::route('bookstore.index');
    }

    /**
     * @param int $id
     * @return Response
     */
    public function show(int $id): Response
    {
        $bookStore = BookStore::find($id);

        return Inertia::render('BookStore/Edit', compact('bookStore'));
    }

    /**
     * @param int $id
     * @return Response
     */
    public function edit(int $id): Response
    {
        $bookStore = BookStore::find($id);
        return Inertia::render('BookStore/Edit', compact('bookStore'));
    }

    /**
     * @param Request $request
     * @param int $id
     * @return Response
     */
    public function update(Request $request, int $id): Response
    {
        $request->validate([
            'name' => 'required',
            'ISBN' => 'numeric',
            'value' => 'numeric|between:0,99.99',
        ]);

        $bookStore = BookStore::find($id);
        $bookStore->fill($request->post())->save();

        return Inertia::render('BookStore/Edit', compact('bookStore'));
    }

    /**
     * @param int $id
     * @return RedirectResponse
     */
    public function destroy(int $id): RedirectResponse
    {
        $stock = BookStore::find($id);
        $stock->delete();

        return Redirect::route('bookstore.index')->with('success', 'Book removed.');
    }
}
