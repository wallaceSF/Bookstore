import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, useForm} from '@inertiajs/react';
import DangerButton from "@/Components/DangerButton";
import {Transition} from "@headlessui/react";

export default function Index(props) {
    const teste = useForm().delete;

    /**
     * @param bookStoreListParams
     * @returns {*|*[]}
     */
    const bookStoreListRender = (bookStoreListParams) => {
        if (bookStoreListParams == null) {
            return [];
        };

        return bookStoreListParams.map(book => (
            <tr key={book.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {book.name}
                </th>
                <td className="px-6 py-4">
                    {book.ISBN}
                </td>
                <td className="px-6 py-4">
                    {book.value}
                </td>
                <td className="px-6 py-4">
                    <a href={route('bookstore.edit', book.id)} className="inline-flex items-center px-4 py-2 bg-gray-800 border
                                     border-transparent rounded-md font-semibold text-xs text-white
                                      uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700
                                       active:bg-gray-900 focus:outline-none focus:ring-2
                                       focus:ring-indigo-500 focus:ring-offset-2 transition
                                       ease-in-out duration-150">Edit</a>
                </td>
                <td className="px-6 py-4">


                    <button onClick={() => deleteBook(book.id)}  className="inline-flex items-center px-4 py-2 bg-red-600 border
                                    border-transparent rounded-md font-semibold text-xs text-white
                                    uppercase tracking-widest hover:bg-red-500 active:bg-red-700
                                    focus:outline-none focus:ring-2 focus:ring-red-500
                                    focus:ring-offset-2 transition ease-in-out duration-150">Delete
                    </button>
                </td>
            </tr>
        ));
    };

    const deleteBook = (e) => {
        console.log('jdhdkjhdjkdhjkd')

        teste(route('bookstore.destroy', e))
    };

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={<h2
                className="font-semibold text-xl text-gray-800 leading-tight">Bookstore</h2>}
        >
            <Head title="Bookstore"/>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="relative overflow-x-auto">
                        <div style={{
                            float: 'right',
                            margin: '0px 0px 10px 0px'
                        }}>
                            <a href={route('bookstore.create')} className="inline-flex items-center px-3 py-2 border
                                    border-transparent text-sm leading-4
                                    font-medium rounded-md text-gray-500 bg-white hover:text-gray-700
                                    focus:outline-none transition ease-in-out duration-150">Create
                            </a>
                        </div>

                        <table
                            className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead
                                className="bg-gray-900  text-xs text-white-700 uppercase
                        bg-white-50 dark:bg-white-700 dark:text-white-400">
                            <tr>
                                <th scope="col" className="px-6 py-4">
                                    Name
                                </th>
                                <th scope="col" className="px-6 py-4">
                                    ISBN
                                </th>
                                <th scope="col" className="px-6 py-4">
                                    Value
                                </th>
                                <th scope="col" className="px-6 py-4">
                                </th>
                                <th scope="col" className="px-6 py-4">
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            {bookStoreListRender(props.bookStoreList.data)}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
