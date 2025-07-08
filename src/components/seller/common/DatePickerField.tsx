import React from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { FormField } from '@/components/form/FormField';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { FORM_STYLES } from '@/constants/form-styles';

interface DatePickerFieldProps {
  label: string;
  required?: boolean;
  value: Date | undefined;
  onSelect: (date: Date | undefined) => void;
  placeholder?: string;
  disabled?: (date: Date) => boolean;
}

export function DatePickerField({
  label,
  required = false,
  value,
  onSelect,
  placeholder = '날짜 선택',
  disabled,
}: DatePickerFieldProps) {
  return (
    <FormField label={label} required={required}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={
              FORM_STYLES.input.base + ' flex w-full items-center justify-between font-normal'
            }
          >
            {value ? (
              format(value, 'yyyy-MM-dd')
            ) : (
              <span className="text-text-300">{placeholder}</span>
            )}
            <CalendarIcon className="ml-2 h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={value}
            onSelect={onSelect}
            captionLayout="dropdown"
            disabled={disabled}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </FormField>
  );
}
