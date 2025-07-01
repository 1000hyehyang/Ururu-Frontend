import React from 'react';
import { FORM_STYLES } from '@/constants/form-styles';
import { HelperTextType } from '@/types/form';

interface FormFieldProps {
  label: string;
  required?: boolean;
  children: React.ReactNode;
  helperText?: string;
  helperTextType?: HelperTextType;
  characterCount?: { current: number; max: number };
  className?: string;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  required = false,
  children,
  helperText,
  helperTextType = 'base',
  characterCount,
  className = '',
}) => {
  return (
    <div className={className}>
      <label className={FORM_STYLES.label.base}>
        {label} {required && <span className={FORM_STYLES.label.required}>*</span>}
      </label>
      {children}
      {(helperText || characterCount) && (
        <div className="mt-1 flex items-center justify-between">
          {helperText ? (
            <span className={FORM_STYLES.helperText[helperTextType]}>{helperText}</span>
          ) : (
            <div className="flex-1" />
          )}
          {characterCount && (
            <span className={FORM_STYLES.helperText.base}>
              {characterCount.current}/{characterCount.max}자
            </span>
          )}
        </div>
      )}
    </div>
  );
};
