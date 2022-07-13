import { useState } from 'react';
import { useAsyncDebounce } from "react-table";

function Filter({ preGlobalFilteredRows, globalFilter, setGlobalFilter }: any) {
    const totalCarsAvailable = preGlobalFilteredRows.length;
    const [value, setValue] = useState(globalFilter);

    const onFilterChange = useAsyncDebounce(
        (value: any) => setGlobalFilter(value || undefined),
        200
    );

    const handleInputChange = (e: any) => {
        setValue(e.target.value);
        onFilterChange(e.target.value);
    };

    return (
        <span className="cars-filter">
            Buscar bloques
            <input
                size={50}
                value={value || ""}
                onChange={handleInputChange}
                placeholder={`${totalCarsAvailable} bloques disponibles...`}
            />
        </span>
    );
}

export default Filter;
