import { useFilterActions } from "@/hooks/useFilterActions";
import { SearchFilter } from "./SearchFilter";
import { SortFilter } from "./SortFilter";
import { StatusFilter } from "./StatusFilter";

export const FilterControls = () => {
  const {
    setSearchQuery,
    sortField,
    sortOrder,
    setSortField,
    toggleSortOrder,
    resetFilters,
    hasFiltersApplied,
    counts,
    setStatusFilter,
    status,
  } = useFilterActions();

  return (
    <div className="space-y-4">
      <StatusFilter
        counts={counts}
        onStatusChange={setStatusFilter}
        status={status}
      />
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <SearchFilter onSearch={setSearchQuery} />
        <SortFilter
          sortField={sortField}
          sortOrder={sortOrder}
          onSortFieldChange={setSortField}
          toggleSortOrder={toggleSortOrder}
          resetFilters={resetFilters}
          hasFiltersApplied={hasFiltersApplied}
        />
      </div>
    </div>
  );
};
