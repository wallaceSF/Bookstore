import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, Link, useForm} from '@inertiajs/react';
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import {Transition} from "@headlessui/react";
import React from 'react';


export default function Edit({auth, bookStore}) {
    const {
        data,
        setData,
        patch,
        errors,
        processing,
        recentlySuccessful
    } = useForm({
        name: bookStore.name,
        ISBN: bookStore.ISBN,
        value: bookStore.value,
    });

    const submit = (e) => {
        e.preventDefault();
        patch(route('bookstore.update', bookStore.id));
    };

    return (
        <AuthenticatedLayout
            auth={auth}
            header={<h2
                className="font-semibold text-xl text-gray-800 leading-tight">Profile</h2>}
        >
            <Head title="Profile"/>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <form onSubmit={submit} className="mt-6 space-y-6">
                            <div>
                                <InputLabel for="name" value="Name"/>
                                <TextInput
                                    id="name"
                                    className="mt-1 block w-full"
                                    value={bookStore.name}
                                    handleChange={(e) => {
                                        setData('name', e.target.value)
                                        bookStore.name = e.target.value
                                    }}
                                    required
                                    isFocused
                                    autoComplete="name"
                                />
                                <InputError className="mt-2"
                                            message={errors.name}/>
                            </div>
                            <div>
                                <InputLabel for="isbn" value="ISBN"/>
                                <TextInput
                                    id="isbn"
                                    type="number"
                                    className="mt-1 block w-full"
                                    value={bookStore.ISBN}
                                    handleChange={(e) => {
                                        setData('ISBN', e.target.value)
                                        bookStore.ISBN = e.target.value
                                    }}
                                    isFocused
                                    autoComplete="isbn"
                                />
                                <InputError className="mt-2"
                                            message={errors.ISBN}/>
                            </div>
                            <div>
                                <InputLabel for="value" value="Value"/>

                                <TextInput
                                    id="value"
                                    type="number"
                                    className="mt-1 block w-full"
                                    value={bookStore.value}
                                    handleChange={(e) => {
                                        setData('value', e.target.value)
                                        bookStore.value = e.target.value
                                    }}
                                    autoComplete="value"
                                />
                                <InputError className="mt-2"
                                            message={errors.value}/>
                            </div>

                            <div className="flex items-center gap-4">
                                <PrimaryButton
                                    processing={processing}>Save</PrimaryButton>

                                <a href={route('bookstore.index')}
                                   className="iinline-flex items-center px-4 py-2 bg-gray-800 border
                                   border-transparent rounded-md font-semibold text-xs text-white
                                    uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700
                                     active:bg-gray-900 focus:outline-none focus:ring-2
                                     focus:ring-indigo-500 focus:ring-offset-2
                                      transition ease-in-out duration-150 false ">Return
                                </a>

                                <Transition
                                    show={recentlySuccessful}
                                    enterFrom="opacity-0"
                                    leaveTo="opacity-0"
                                    className="transition ease-in-out"
                                >
                                    <p className="text-sm text-gray-600">Saved.</p>
                                </Transition>
                            </div>
                        </form>



                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
