import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';
import { FORM_STYLES } from '@/constants/form-styles';

interface ErrorDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  errorDetails?: string;
}

export const ErrorDialog: React.FC<ErrorDialogProps> = ({
  isOpen,
  onClose,
  title,
  message,
  errorDetails,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-primary-300" />
            <DialogTitle className="text-text-100">{title}</DialogTitle>
          </div>
          <DialogDescription className="text-left text-text-200">
            {message}
            {errorDetails && (
              <div className="mt-2 rounded bg-bg-100 p-2 text-xs text-text-300">
                <strong>상세 오류:</strong> {errorDetails}
              </div>
            )}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={onClose} className={FORM_STYLES.button.dialog}>
            확인
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
