import { FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useFormContext, type FieldValues, type Path } from "react-hook-form";
import { useState } from "react";

type FormDatePickerProps<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  placeholder?: string;
};

export function FormDatePicker<T extends FieldValues>({
  name,
  label,
  placeholder = "Pick a date",
}: FormDatePickerProps<T>) {
  const form = useFormContext<T>();
  const [open, setOpen] = useState(false);

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>{label}</FormLabel>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full pl-3 text-left font-normal",
                  !field.value && "text-muted-foreground",
                )}
              >
                {field.value ? (
                  format(new Date(field.value), "PPP")
                ) : (
                  <span>{placeholder}</span>
                )}
                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
              </Button>
            </PopoverTrigger>

            <PopoverContent
              className="w-auto p-0 overflow-hidden"
              align="start"
            >
              <Calendar
                mode="single"
                selected={field.value ? new Date(field.value) : undefined}
                onSelect={(date) => {
                  field.onChange(date?.toISOString() ?? "");
                  setOpen(false);
                }}
              />
            </PopoverContent>
          </Popover>

          <FormMessage />
        </FormItem>
      )}
    />
  );
}
