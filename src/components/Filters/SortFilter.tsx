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
import type { SortField, SortOrder } from "@/types/common";

interface SortFilterProps {
  sortField: SortField;
  sortOrder: SortOrder;
  onSortFieldChange: (field: SortField) => void;
  toggleSortOrder: () => void;
  resetFilters: () => void;
  hasFiltersApplied: boolean;
}

export const SortFilter = ({
  sortField,
  sortOrder,
  onSortFieldChange,
  toggleSortOrder,
  resetFilters,
  hasFiltersApplied,
}: SortFilterProps) => {
  const SortOrderIcon = sortOrder === "asc" ? ArrowUp : ArrowDown;

  return (
    <div className="flex items-center gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="gap-2">
            <ArrowUpDown className="h-4 w-4" />
            <span className="hidden sm:inline">
              {SORT_FIELD_LABELS[sortField]}
            </span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuLabel>Sort by</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup
            value={sortField}
            onValueChange={(value) => onSortFieldChange(value as SortField)}
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
        aria-label={`Sort ${sortOrder === "asc" ? "descending" : "ascending"}`}
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
