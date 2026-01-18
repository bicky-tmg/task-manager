import type { SelectOption } from "@/types/common";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useFormContext, type FieldValues, type Path } from "react-hook-form";

type FormSelectProps<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  placeholder?: string;
  options: SelectOption[];
  className?: string;
};

export function FormSelect<T extends FieldValues>({
  name,
  label,
  placeholder = "Select an option",
  options,
  className,
}: FormSelectProps<T>) {
  const form = useFormContext<T>();

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>

          <Select value={field.value ?? ""} onValueChange={field.onChange}>
            <FormControl>
              <SelectTrigger className={className}>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>

            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <FormMessage />
        </FormItem>
      )}
    />
  );
}
