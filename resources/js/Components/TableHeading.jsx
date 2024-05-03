import { PiSortAscendingBold, PiSortDescendingBold } from "react-icons/pi";

const TableHeading = ({
    name,
    children,
    sortable = true,
    sort_field = null,
    sort_direction = null,
    sortChanged = () => {},
}) => {
    return (
        <th onClick={(e) => sortChanged(name)}>
            <div className="px-3 py-3 cursor-pointer flex items-center gap-2">
                {children}
                {sortable && (
                    <div>
                        {sort_direction == "desc" && sort_field == name ? (
                            <PiSortDescendingBold
                                size={16}
                                className="fill-gray-500"
                            />
                        ) : (
                            <PiSortAscendingBold
                                size={16}
                                className="fill-gray-500"
                            />
                        )}
                    </div>
                )}
            </div>
        </th>
    );
};

export default TableHeading;
