import { SearchFilter } from "./SearchFilter";
import { SortFilter } from "./SortFilter";
import { StatusFilter } from "./StatusFilter";

export const FilterControls = () => {
  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <SearchFilter />
        <SortFilter />
      </div>
      <StatusFilter />
    </div>
  );
};
