import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { useDebounce } from "@/hooks/useDebounce";
import { useEffect, useState } from "react";
import { useFilterActions } from "@/hooks/useFilterActions";

export const SearchFilter = () => {
  const [search, setSearch] = useState("");
  const { setSearchQuery } = useFilterActions();
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
