import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { useFilterStore } from "@/store/filterStore";
import { useDebounce } from "@/hooks/useDebounce";
import { useEffect, useState } from "react";

export const SearchFilter = () => {
  const [search, setSearch] = useState("");
  const setSearchQuery = useFilterStore((state) => state.setSearchQuery);
  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    if (!debouncedSearch) return;
    setSearchQuery(search);
  }, [debouncedSearch, search, setSearchQuery]);

  return (
    <div className="relative flex-1">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        placeholder="Search tasks..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="pl-9"
        aria-label="Search tasks"
      />
    </div>
  );
};
