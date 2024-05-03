import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextAreaInput from "@/Components/TextAreaInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";

const Edit = ({ auth, project }) => {
    const { id, name, status, description, due_date, image_path } =
        project.data;
    const { data, setData, errors, reset, post } = useForm({
        image: "",
        name: name || "",
        status: status || "",
        description: description || "",
        due_date: due_date || "",
        _method: "PUT",
    });
    const onSubmit = (e) => {
        e.preventDefault();

        post(route("project.update", id));
    };
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Edit project: {name}
                </h2>
            }
        >
            <Head title="Edit" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {image_path && (
                        <div>
                            <img
                                src={image_path}
                                alt={name}
                                className="w-full h-48 object-cover"
                            />
                        </div>
                    )}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-4">
                        <form
                            onSubmit={onSubmit}
                            className="p-4 sm:p-8 bg-white shadow sm:rounded-lg"
                        >
                            <div>
                                <InputLabel
                                    value="Project Image"
                                    htmlFor="project_image_path"
                                />
                                <TextInput
                                    id="project_image_path"
                                    type="file"
                                    name="image"
                                    className="mt-1 block w-full"
                                    onChange={(e) =>
                                        setData("image", e.target.files[0])
                                    }
                                />
                                <InputError
                                    message={errors.image}
                                    className="mt-2"
                                />
                            </div>
                            <div className="mt-4">
                                <InputLabel
                                    htmlFor="project_name"
                                    value="Project Name"
                                />
                                <TextInput
                                    id="project_name"
                                    type="text"
                                    name="name"
                                    value={data.name}
                                    className="mt-1 block w-full"
                                    isFocused={true}
                                    onChange={(e) =>
                                        setData("name", e.target.value)
                                    }
                                />
                                <InputError
                                    message={errors.name}
                                    className="mt-2"
                                />
                            </div>
                            <div className="mt-4">
                                <InputLabel
                                    htmlFor="project_description"
                                    value="Project Description"
                                />
                                <TextAreaInput
                                    id="project_description"
                                    name="description"
                                    value={data.description}
                                    className="mt-1 block w-full"
                                    onChange={(e) =>
                                        setData("description", e.target.value)
                                    }
                                />
                                <InputError
                                    message={errors.description}
                                    className="mt-2"
                                />
                            </div>
                            <div className="mt-4">
                                <InputLabel
                                    htmlFor="project_due_date"
                                    value="Project Deadline"
                                />
                                <TextInput
                                    id="project_due_date"
                                    type="date"
                                    name="due_date"
                                    value={data.due_date}
                                    className="mt-1 block w-full"
                                    onChange={(e) =>
                                        setData("due_date", e.target.value)
                                    }
                                />
                                <InputError
                                    message={errors.due_date}
                                    className="mt-2"
                                />
                            </div>
                            <div className="mt-4">
                                <InputLabel
                                    htmlFor="project_status"
                                    value="Project Status"
                                />
                                <SelectInput
                                    name="status"
                                    id="project_status"
                                    className="mt-1 block w-full"
                                    onChange={(e) =>
                                        setData("status", e.target.value)
                                    }
                                >
                                    <option value="">Select Status</option>
                                    <option value="pending">Pending</option>
                                    <option value="in_progress">
                                        In Progress
                                    </option>
                                    <option value="completed">Completed</option>
                                </SelectInput>
                                <InputError
                                    message={errors.status}
                                    className="mt-2"
                                />
                            </div>
                            <div className="mt-4 text-right">
                                <Link
                                    href={route("project.index")}
                                    className="bg-gray-100 py-2 px-3 text-gray-800 rounded shadow transition-all duration-300 hover:bg-gray-200 mr-2 border"
                                >
                                    Cancel
                                </Link>
                                <button className="bg-emerald-500 py-2 px-3 text-white rounded shadow transition-all duration-300 hover:bg-emerald-600">
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Edit;
