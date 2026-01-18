import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { ArrowDown, ArrowUp, ArrowUpDown, RotateCcw } from "lucide-react";
import { SORT_FIELD_LABELS } from "@/constant/common";
import type { SortField } from "@/types/common";
import { useMemo } from "react";
import { useFilterStore } from "@/store/filterStore";

export const SortFilter = () => {
  const filters = useFilterStore((state) => state.filters);
  const setSortField = useFilterStore((state) => state.setSortField);
  const setSortOrder = useFilterStore((state) => state.setSortOrder);
  const resetFilters = useFilterStore((state) => state.resetFilters);

  const hasFiltersApplied = useMemo(
    () =>
      filters.status !== "all" ||
      filters.searchQuery.trim() !== "" ||
      filters.sortField !== "createdAt" ||
      filters.sortOrder !== "desc",
    [filters],
  );

  const toggleSortOrder = () => {
    setSortOrder(filters.sortOrder === "asc" ? "desc" : "asc");
  };

  const SortOrderIcon = filters.sortOrder === "asc" ? ArrowUp : ArrowDown;

  return (
    <div className="flex items-center gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="gap-2">
            <ArrowUpDown className="h-4 w-4" />
            <span className="hidden sm:inline">
              {SORT_FIELD_LABELS[filters.sortField]}
            </span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuLabel>Sort by</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup
            value={filters.sortField}
            onValueChange={(value) => setSortField(value as SortField)}
          >
            {Object.entries(SORT_FIELD_LABELS).map(([value, label]) => (
              <DropdownMenuRadioItem key={value} value={value}>
                {label}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <Button
        variant="outline"
        size="icon"
        onClick={toggleSortOrder}
        aria-label={`Sort ${filters.sortOrder === "asc" ? "descending" : "ascending"}`}
      >
        <SortOrderIcon className="h-4 w-4" />
      </Button>

      {hasFiltersApplied && (
        <Button
          variant="ghost"
          size="icon"
          onClick={resetFilters}
          aria-label="Reset filters"
        >
          <RotateCcw className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
};
