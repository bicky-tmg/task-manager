import { getTaskCounts } from "@/lib/utils";
import { useFilterStore } from "@/store/filterStore";
import { useTaskStore } from "@/store/taskStore";
import { useCallback, useMemo } from "react";

export function useFilterActions() {
    const allTasks = useTaskStore((state) => state.tasks);
    const { searchQuery, sortField, sortOrder, status } = useFilterStore((state) => state.filters);
    const setSortField = useFilterStore((state) => state.setSortField);
    const setSortOrder = useFilterStore((state) => state.setSortOrder);
    const setSearchQuery = useFilterStore((state) => state.setSearchQuery);
    const setStatusFilter = useFilterStore((state) => state.setStatusFilter);
    const resetFilters = useFilterStore((state) => state.resetFilters);

    const counts = useMemo(() => getTaskCounts(allTasks), [allTasks]);

    const hasFiltersApplied = useMemo(
        () =>
            status !== "all" ||
            searchQuery.trim() !== "" ||
            sortField !== "createdAt" ||
            sortOrder !== "desc",
        [searchQuery, sortField, sortOrder, status],
    );

    const toggleSortOrder = useCallback(() => {
        setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    }, [sortOrder, setSortOrder]);

    return {
        searchQuery, sortField, sortOrder, status,
        hasFiltersApplied,
        counts,
        toggleSortOrder,
        resetFilters,
        setSortField,
        setSearchQuery,
        setStatusFilter,
    }
}
