import { FormEvent, useEffect, useState } from "react";
import { EventSearchFilters } from "../types/event";

const categories = [
    { value: "", label: "All categories" },
    { value: "music", label: "Music" },
    { value: "sports", label: "Sports" },
    { value: "theatre", label: "Theatre" },
    { value: "film", label: "Film" },
    { value: "arts", label: "Arts" },
    { value: "family", label: "Family" },
    { value: "festival", label: "Festival" },
    { value: "comedy", label: "Comedy" },
    { value: "other", label: "Other" },
];

type EventFiltersProps = {
    filters: EventSearchFilters;
    onSearch: (filters: EventSearchFilters) => void;
    isLoading?: boolean;
};

export default function EventFilters({
    filters,
    onSearch,
    isLoading = false,
}: EventFiltersProps) {
    const [localFilters, setLocalFilters] = useState(filters);

    useEffect(() => {
        setLocalFilters(filters);
    }, [filters]);

    function updateField(name: keyof EventSearchFilters, value: string) {
        setLocalFilters((current) => ({
            ...current,
            [name]: value,
        }));
    }

    function handleSubmit(event: FormEvent) {
        event.preventDefault();
        onSearch(localFilters);
    }

    return (
        <form className="filters-card" onSubmit={handleSubmit}>
            <div className="filter-grid">
                <label>
                    <span>City</span>
                    <input
                        value={localFilters.city}
                        onChange={(event) => updateField("city", event.target.value)}
                        placeholder="London"
                    />
                </label>

                <label>
                    <span>Country</span>
                    <input
                        value={localFilters.countryCode}
                        onChange={(event) => updateField("countryCode", event.target.value)}
                        placeholder="GB"
                    />
                </label>

                <label>
                    <span>Keyword</span>
                    <input
                        value={localFilters.keyword}
                        onChange={(event) => updateField("keyword", event.target.value)}
                        placeholder="concert, festival..."
                    />
                </label>

                <label>
                    <span>Category</span>
                    <select
                        value={localFilters.category}
                        onChange={(event) => updateField("category", event.target.value)}
                    >
                        {categories.map((category) => (
                            <option key={category.value} value={category.value}>
                                {category.label}
                            </option>
                        ))}
                    </select>
                </label>

                <label>
                    <span>From</span>
                    <input
                        type="date"
                        value={localFilters.startDate}
                        onChange={(event) => updateField("startDate", event.target.value)}
                    />
                </label>

                <label>
                    <span>To</span>
                    <input
                        type="date"
                        value={localFilters.endDate}
                        onChange={(event) => updateField("endDate", event.target.value)}
                    />
                </label>
            </div>

            <button className="btn btn-primary btn-wide" type="submit" disabled={isLoading}>
                {isLoading ? "Searching..." : "Search events"}
            </button>
        </form>
    );
}