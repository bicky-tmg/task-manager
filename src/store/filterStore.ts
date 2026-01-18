import type { FilterState, FilterTaskStatus, SortField, SortOrder } from "@/types/common";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type FilterStore = {
    filters: FilterState;
    setStatusFilter: (status: FilterTaskStatus) => void;
    setSearchQuery: (query: string) => void;
    setSortField: (field: SortField) => void;
    setSortOrder: (order: SortOrder) => void;
    resetFilters: () => void;
}

const defaultFilters: FilterState = {
    status: "all",
    searchQuery: "",
    sortField: "createdAt",
    sortOrder: "desc",
};

export const useFilterStore = create<FilterStore>()(
    persist((set) => ({
        filters: defaultFilters,

        setStatusFilter: (status) => {
            set((state) => {
                const newFilters = { ...state.filters, status };
                return { filters: newFilters };
            });
        },
        setSearchQuery: (searchQuery) => {
            set((state) => {
                const newFilters = { ...state.filters, searchQuery };
                return { filters: newFilters };
            });
        },
        setSortField: (sortField) => {
            set((state) => {
                const newFilters = { ...state.filters, sortField };
                return { filters: newFilters };
            });
        },
        setSortOrder: (sortOrder) => {
            set((state) => {
                const newFilters = { ...state.filters, sortOrder };
                return { filters: newFilters };
            });
        },
        resetFilters: () => {
            set({ filters: defaultFilters });
        },
    }), {
        name: 'filters-storage', storage: createJSONStorage(() => sessionStorage), partialize: (state) => ({ filters: state.filters })
    }));