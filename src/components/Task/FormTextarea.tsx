import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../ui/form";
import { useFormContext, type FieldValues, type Path } from "react-hook-form";
import { Textarea } from "../ui/textarea";

type FormTextareaProps<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  placeholder?: string;
  className?: string;
};

export function FormTextarea<T extends FieldValues>({
  name,
  label,
  placeholder,
  className,
}: FormTextareaProps<T>) {
  const form = useFormContext<T>();

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Textarea
              {...field}
              placeholder={placeholder}
              className={className}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
