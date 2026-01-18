import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { useFilterStore } from "@/store/filterStore";

export const SearchFilter = () => {
  const filters = useFilterStore((state) => state.filters);
  const setSearchQuery = useFilterStore((state) => state.setSearchQuery);

  return (
    <div className="relative flex-1">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        placeholder="Search tasks..."
        value={filters.searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="pl-9"
        aria-label="Search tasks"
      />
    </div>
  );
};
