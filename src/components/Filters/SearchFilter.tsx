import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { useDebounce } from "@/hooks/useDebounce";
import { useEffect, useState } from "react";

export const SearchFilter = ({
  onSearch,
}: {
  onSearch: (query: string) => void;
}) => {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    if (!debouncedSearch) return;
    onSearch(search);
  }, [debouncedSearch, search, onSearch]);

  return (
    <div className="relative md:w-100 w-full">
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
