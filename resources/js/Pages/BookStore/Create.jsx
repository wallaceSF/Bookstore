import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, useForm} from '@inertiajs/react';
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import {Transition} from "@headlessui/react";

export default function Create({auth}) {
    const {
        setData,
        post,
        errors,
        processing,
        recentlySuccessful
    } = useForm();

    const submit = (e) => {
        e.preventDefault();
        post(route('bookstore.store'));
    };

    return (
        <AuthenticatedLayout
            auth={auth}
            header={<h2
                className="font-semibold text-xl text-gray-800 leading-tight">Profile</h2>}
        >
            <Head title="Bookstore Create"/>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <form onSubmit={submit} className="mt-6 space-y-6">
                            <div>
                                <InputLabel for="name" value="Name"/>
                                <TextInput
                                    id="name"
                                    className="mt-1 block w-full"

                                    handleChange={(e) => setData('name', e.target.value)}
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
                                    type="number"
                                    pattern="[0-9]"
                                    handleChange={(e) => {
                                        setData('ISBN', e.target.value)
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
                                    className="mt-1 block w-full"
                                    type="number"
                                    handleChange={(e) => setData('value', e.target.value)}
                                    required
                                    autoComplete="value"
                                />
                                <InputError className="mt-2"
                                            message={errors.Value}/>
                            </div>

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
