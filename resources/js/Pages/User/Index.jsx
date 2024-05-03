import { FaEdit } from "react-icons/fa";
import { GoTrash } from "react-icons/go";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import Pagination from "@/Components/Pagination";
import TextInput from "@/Components/TextInput";
import TableHeading from "@/Components/TableHeading";
import toast from "react-hot-toast";

const Index = ({ auth, users, queryParams = null, success }) => {
    queryParams = queryParams || {};
    success && toast.success(success);
    const searchFieldChanged = (name, value) => {
        if (value) {
            queryParams[name] = value;
        } else {
            delete queryParams[name];
        }
        router.get(route("user.index"), queryParams);
    };

    const handleOnKeyPress = (name, e) => {
        if (e.key !== "Enter") return;
        searchFieldChanged(name, e.target.value);
    };

    const sortChanged = (name) => {
        if (name === queryParams.sort_field) {
            if (queryParams.sort_direction == "asc") {
                queryParams.sort_direction = "desc";
            } else {
                queryParams.sort_direction = "asc";
            }
        } else {
            queryParams.sort_field = name;
            queryParams.sort_direction = "asc";
        }
        router.get(route("user.index"), queryParams);
    };

    const deleteUser = (id) => {
        if (!window.confirm("Are you sure you want to delete this user?"))
            return;
        router.delete(route("user.destroy", id));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Users
                    </h2>
                    <Link
                        href={route("user.create")}
                        className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600"
                    >
                        Add new
                    </Link>
                </div>
            }
        >
            <Head title="Users" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-4">
                        <div className="overflow-auto">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b-2 border-gray-500">
                                    <tr className="text-nowrap">
                                        <TableHeading
                                            name="id"
                                            sortChanged={sortChanged}
                                            sort_field={queryParams.sort_field}
                                            sort_direction={
                                                queryParams.sort_direction
                                            }
                                        >
                                            id
                                        </TableHeading>
                                        <TableHeading
                                            name="name"
                                            sortChanged={sortChanged}
                                            sort_field={queryParams.sort_field}
                                            sort_direction={
                                                queryParams.sort_direction
                                            }
                                        >
                                            name
                                        </TableHeading>
                                        <TableHeading
                                            name="email"
                                            sortChanged={sortChanged}
                                            sort_field={queryParams.sort_field}
                                            sort_direction={
                                                queryParams.sort_direction
                                            }
                                        >
                                            Email
                                        </TableHeading>
                                        <TableHeading
                                            name="created_at"
                                            sortChanged={sortChanged}
                                            sort_field={queryParams.sort_field}
                                            sort_direction={
                                                queryParams.sort_direction
                                            }
                                        >
                                            Created date
                                        </TableHeading>
                                        <th className="px-3 py-3 text-right">
                                            actions
                                        </th>
                                    </tr>
                                </thead>
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b-2 border-gray-500">
                                    <tr className="text-nowrap">
                                        <th className="px-3 py-3"></th>
                                        <th className="px-3 py-3">
                                            <TextInput
                                                className="w-full"
                                                placeholder="Enter user name..."
                                                defaultValue={queryParams.name}
                                                onBlur={(e) =>
                                                    searchFieldChanged(
                                                        "name",
                                                        e.target.value
                                                    )
                                                }
                                                onKeyPress={(e) =>
                                                    handleOnKeyPress("name", e)
                                                }
                                            />
                                        </th>
                                        <th className="px-3 py-3">
                                            <TextInput
                                                className="w-full"
                                                placeholder="Enter email..."
                                                defaultValue={queryParams.email}
                                                onBlur={(e) =>
                                                    searchFieldChanged(
                                                        "email",
                                                        e.target.value
                                                    )
                                                }
                                                onKeyPress={(e) =>
                                                    handleOnKeyPress("email", e)
                                                }
                                            />
                                        </th>
                                        <th className="px-3 py-3"></th>
                                        <th className="px-3 py-3"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.data.map(
                                        ({
                                            id,
                                            image_path,
                                            name,
                                            email,
                                            created_at,
                                            due_date,
                                            createdBy,
                                        }) => (
                                            <tr
                                                className="bg-white border-b"
                                                key={id}
                                            >
                                                <th className="px-3 py-2">
                                                    {id}
                                                </th>
                                                <th className="px-3 py-2 text-gray-700 text-nowrap">
                                                    {name}
                                                </th>
                                                <td className="px-3 py-2">
                                                    {email}
                                                </td>
                                                <td className="px-3 py-2 text-nowrap">
                                                    {created_at}
                                                </td>
                                                <td className="px-3 py-2 flex items-center gap-3">
                                                    <Link
                                                        href={route(
                                                            "user.edit",
                                                            id
                                                        )}
                                                        className="flex items-center gap-2 border border-cyan-500 py-1 px-2 rounded-md"
                                                    >
                                                        <FaEdit
                                                            size={18}
                                                            className="text-cyan-500"
                                                        />
                                                        Edit
                                                    </Link>
                                                    <button
                                                        onClick={() =>
                                                            deleteUser(id)
                                                        }
                                                        className="flex items-center gap-2 border border-red-500 py-1 px-2 rounded-md"
                                                    >
                                                        <GoTrash
                                                            size={18}
                                                            className="text-red-500"
                                                        />
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                    )}
                                </tbody>
                            </table>
                        </div>
                        <Pagination links={users.meta.links} />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Index;
