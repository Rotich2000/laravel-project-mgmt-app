import Pagination from "@/Components/Pagination";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import { TASK_STATUS_CLASS_MAP, TASK_STATUS_TEXT_MAP } from "@/constants.jsx";
import TableHeading from "@/Components/TableHeading";
import { FaEdit } from "react-icons/fa";
import { GoTrash } from "react-icons/go";
import { Link, router } from "@inertiajs/react";
import toast from "react-hot-toast";

const TasksTable = ({
    tasks,
    queryParams = null,
    hideProjectColumn = false,
    success,
}) => {
    queryParams = queryParams || {};
    success && toast.success(success);
    const searchFieldChanged = (name, value) => {
        if (value) {
            queryParams[name] = value;
        } else {
            delete queryParams[name];
        }
        router.get(route("task.index"), queryParams);
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
        router.get(route("task.index"), queryParams);
    };

    const deleteTask = (id) => {
        if (!window.confirm("Are you sure you want to delete the project")) {
            return;
        }
        router.delete(route("task.destroy", id));
    };

    return (
        <>
            <div className="overflow-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b-2 border-gray-500">
                        <tr className="text-nowrap">
                            <TableHeading
                                name="id"
                                sortChanged={sortChanged}
                                sort_field={queryParams.sort_field}
                                sort_direction={queryParams.sort_direction}
                            >
                                id
                            </TableHeading>
                            <th className="px-3 py-3">image</th>
                            {!hideProjectColumn && (
                                <th className="px-3 py-3">Project Name</th>
                            )}
                            <TableHeading
                                name="name"
                                sortChanged={sortChanged}
                                sort_field={queryParams.sort_field}
                                sort_direction={queryParams.sort_direction}
                            >
                                name
                            </TableHeading>
                            <TableHeading
                                name="status"
                                sortChanged={sortChanged}
                                sort_field={queryParams.sort_field}
                                sort_direction={queryParams.sort_direction}
                            >
                                Status
                            </TableHeading>
                            <TableHeading
                                name="created_at"
                                sortChanged={sortChanged}
                                sort_field={queryParams.sort_field}
                                sort_direction={queryParams.sort_direction}
                            >
                                Created date
                            </TableHeading>
                            <TableHeading
                                name="due_date"
                                sortChanged={sortChanged}
                                sort_field={queryParams.sort_field}
                                sort_direction={queryParams.sort_direction}
                            >
                                Due date
                            </TableHeading>
                            <th className="px-3 py-3">created by</th>
                            <th className="px-3 py-3 text-right">actions</th>
                        </tr>
                    </thead>
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b-2 border-gray-500">
                        <tr className="text-nowrap">
                            <th className="px-3 py-3"></th>
                            <th className="px-3 py-3"></th>
                            <th className="px-3 py-3"></th>
                            <th className="px-3 py-3">
                                <TextInput
                                    className="w-full"
                                    placeholder="Enter task name..."
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
                                <SelectInput
                                    className="w-full"
                                    defaultValue={queryParams.status}
                                    onChange={(e) =>
                                        searchFieldChanged(
                                            "status",
                                            e.target.value
                                        )
                                    }
                                >
                                    <option value="">Select Status</option>
                                    <option value="pending">Pending</option>
                                    <option value="in_progress">
                                        In Progress
                                    </option>
                                    <option value="completed">Completed</option>
                                </SelectInput>
                            </th>
                            <th className="px-3 py-3"></th>
                            <th className="px-3 py-3"></th>
                            <th className="px-3 py-3"></th>
                            <th className="px-3 py-3 text-right"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.data.map(
                            ({
                                id,
                                image_path,
                                project,
                                name,
                                status,
                                created_at,
                                due_date,
                                createdBy,
                            }) => (
                                <tr className="bg-white border-b" key={id}>
                                    <th className="px-3 py-2">{id}</th>
                                    <td className="px-3 py-2">
                                        <img
                                            src={image_path}
                                            alt={name}
                                            className="h-6 w-6 rounded-full"
                                        />
                                    </td>
                                    {!hideProjectColumn && (
                                        <td className="px-3 py-2">
                                            {project.name}
                                        </td>
                                    )}
                                    <th className="px-3 py-2">
                                        <Link
                                            href={route("task.show", id)}
                                            className="hover:underline text-gray-700"
                                        >
                                            {name}
                                        </Link>
                                    </th>
                                    <td className="px-3 py-2">
                                        <span
                                            className={
                                                "px-2 py-1 rounded text-nowrap text-white " +
                                                TASK_STATUS_CLASS_MAP[status]
                                            }
                                        >
                                            {TASK_STATUS_TEXT_MAP[status]}
                                        </span>
                                    </td>
                                    <td className="px-3 py-2 text-nowrap">
                                        {created_at}
                                    </td>
                                    <td className="px-3 py-2 text-nowrap">
                                        {due_date}
                                    </td>
                                    <td className="px-3 py-2">
                                        {createdBy.name}
                                    </td>
                                    <td className="px-3 py-2 flex items-center gap-3">
                                        <Link
                                            href={route("task.edit", id)}
                                            className="flex items-center gap-2 border border-cyan-500 py-1 px-2 rounded-md"
                                        >
                                            <FaEdit
                                                size={18}
                                                className="text-cyan-500"
                                            />
                                            Edit
                                        </Link>
                                        <button
                                            onClick={() => deleteTask(id)}
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
            <Pagination links={tasks.meta.links} />
        </>
    );
};

export default TasksTable;
