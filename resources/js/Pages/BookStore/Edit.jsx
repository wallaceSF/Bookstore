import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, Link, useForm} from '@inertiajs/react';
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import {Transition} from "@headlessui/react";
import React, {Component} from 'react';


export default function Edit({auth, mustVerifyEmail, status, bookStore}) {
    const {
        invokeModal,
        reset,
        data,
        setData,
        post,
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

    console.log(data);

    function handleChange(event) {
        this.setState({value: event.target.value});
    }

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
                                    className="mt-1 block w-full"
                                    value={bookStore.ISBN}
                                    handleChange={(e) => {
                                        setData('ISBN', e.target.value)
                                        bookStore.ISBN = e.target.value
                                    }}
                                    required
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
                                    type="text"
                                    className="mt-1 block w-full"
                                    value={bookStore.value}
                                    handleChange={(e) => {
                                        setData('value', e.target.value)
                                        bookStore.value = e.target.value
                                    }}
                                    required
                                    autoComplete="value"
                                />
                                <InputError className="mt-2"
                                            message={errors.Value}/>


                                {/*<InputError className="mt-2" message={errors.email} />*/}
                            </div>

                            {/*{mustVerifyEmail && user.email_verified_at === null && (*/}
                            {/*    <div>*/}
                            {/*        <p className="text-sm mt-2 text-gray-800">*/}
                            {/*            Your email address is unverified.*/}
                            {/*            <Link*/}
                            {/*                href={route('verification.send')}*/}
                            {/*                method="post"*/}
                            {/*                as="button"*/}
                            {/*                className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"*/}
                            {/*            >*/}
                            {/*                Click here to re-send the verification email.*/}
                            {/*            </Link>*/}
                            {/*        </p>*/}

                            {/*        {status === 'verification-link-sent' && (*/}
                            {/*            <div className="mt-2 font-medium text-sm text-green-600">*/}
                            {/*                A new verification link has been sent to your email address.*/}
                            {/*            </div>*/}
                            {/*        )}*/}
                            {/*    </div>*/}
                            {/*)}*/}

                            <div className="flex items-center gap-4">
                                <PrimaryButton
                                    processing={processing}>Save</PrimaryButton>

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
