import { Link } from "@inertiajs/react";

const Pagination = ({ links }) => {
    return (
        <nav className="text-center mt-4">
            {links.map((link) => (
                <Link
                    key={link.label}
                    href={link.url || ""}
                    preserveScroll
                    className={
                        "inline-block py-2 px-3 mx-1 rounded-lg text-gray-900 text-xs bg-gray-200 hover:bg-gray-100 hover:border transition-all duration-300 ease-in-out " +
                        (link.active
                            ? "bg-gray-950 text-white hover:bg-gray-800 "
                            : " ") +
                        (!link.url ? "!text-gray-500 cursor-not-allowed " : "")
                    }
                    dangerouslySetInnerHTML={{ __html: link.label }}
                ></Link>
            ))}
        </nav>
    );
};

export default Pagination;
