import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { useFormContext, type FieldValues, type Path } from "react-hook-form";

type FormInputProps<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  placeholder?: string;
  autoFocus?: boolean;
};

export function FormInput<T extends FieldValues>({
  name,
  label,
  placeholder,
  autoFocus,
}: FormInputProps<T>) {
  const form = useFormContext<T>();

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input {...field} placeholder={placeholder} autoFocus={autoFocus} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
