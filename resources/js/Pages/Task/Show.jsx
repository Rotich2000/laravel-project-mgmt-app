import {
    TASK_PRIORITY_CLASS_MAP,
    TASK_PRIORITY_TEXT_MAP,
    TASK_STATUS_CLASS_MAP,
    TASK_STATUS_TEXT_MAP,
} from "@/constants";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { FaEdit } from "react-icons/fa";

const Show = ({ auth, task }) => {
    const {
        id,
        name,
        image_path,
        status,
        priority,
        createdBy,
        due_date,
        created_at,
        updatedBy,
        assignedUser,
        project,
        description,
    } = task.data;
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex items-center justify-between">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        {`Task: "${name}"`}
                    </h2>
                    <Link
                        href={route("task.edit", id)}
                        className="flex items-center gap-2 border border-cyan-500 py-1 px-2 rounded-md"
                    >
                        <FaEdit size={18} className="text-cyan-500" />
                        Edit
                    </Link>
                </div>
            }
        >
            <Head title={name} />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div>
                            <img
                                src={image_path}
                                alt={name}
                                className="w-full h-64 object-cover"
                            />
                        </div>
                        <div className="p-4 text-gray-900">
                            <div className="grid grid-cols-2 gap-2 mt-2">
                                <div className="p-3 rounded-lg bg-gray-100 text-gray-800 border">
                                    <div>
                                        <label className="font-bold text-lg">
                                            Task ID
                                        </label>
                                        <p className="mt-1">{id}</p>
                                    </div>
                                    <div className="mt-4">
                                        <label className="font-bold text-lg">
                                            Task Name
                                        </label>
                                        <p className="mt-1">{name}</p>
                                    </div>
                                    <div className="mt-4">
                                        <label className="font-bold text-lg">
                                            Task Status
                                        </label>
                                        <p className="mt-1">
                                            <span
                                                className={
                                                    "px-2 py-1 rounded text-white " +
                                                    TASK_STATUS_CLASS_MAP[
                                                        status
                                                    ]
                                                }
                                            >
                                                {TASK_STATUS_TEXT_MAP[status]}
                                            </span>
                                        </p>
                                    </div>

                                    <div className="mt-4">
                                        <label className="font-bold text-lg">
                                            Task Priority
                                        </label>
                                        <p className="mt-1">
                                            <span
                                                className={
                                                    "px-2 py-1 rounded text-white " +
                                                    TASK_PRIORITY_CLASS_MAP[
                                                        priority
                                                    ]
                                                }
                                            >
                                                {
                                                    TASK_PRIORITY_TEXT_MAP[
                                                        priority
                                                    ]
                                                }
                                            </span>
                                        </p>
                                    </div>

                                    <div className="mt-4">
                                        <label className="font-bold text-lg">
                                            Created By
                                        </label>
                                        <p className="mt-1">{createdBy.name}</p>
                                    </div>
                                </div>
                                <div className="p-3 rounded-lg bg-gray-100 text-gray-800 border">
                                    <div>
                                        <label className="font-bold text-lg">
                                            Due Date
                                        </label>
                                        <p className="mt-1">{due_date}</p>
                                    </div>
                                    <div className="mt-4">
                                        <label className="font-bold text-lg">
                                            Created Date
                                        </label>
                                        <p className="mt-1">{created_at}</p>
                                    </div>
                                    <div className="mt-4">
                                        <label className="font-bold text-lg">
                                            Updated By
                                        </label>
                                        <p className="mt-1">{updatedBy.name}</p>
                                    </div>
                                    <div className="mt-4">
                                        <label className="font-bold text-lg">
                                            Project
                                        </label>
                                        <p className="mt-1">
                                            <Link
                                                href={route(
                                                    "project.show",
                                                    project.id
                                                )}
                                                className="text-gray-600 hover:underline hover:text-gray-700"
                                            >
                                                {project.name}
                                            </Link>
                                        </p>
                                    </div>
                                    <div className="mt-4">
                                        <label className="font-bold text-lg">
                                            Assigned User
                                        </label>
                                        <p className="mt-1">
                                            {assignedUser.name}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-4 p-3 rounded-lg bg-gray-100 text-gray-800 border">
                                <label className="font-bold text-lg">
                                    Task Description
                                </label>
                                <p className="mt-1">{description}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Show;
