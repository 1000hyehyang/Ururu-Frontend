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
import { AlertTriangle } from 'lucide-react';
import { FORM_STYLES } from '@/constants/form-styles';

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'default' | 'danger';
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = '확인',
  cancelText = '취소',
  variant = 'default',
}) => {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-primary-300" />
            <DialogTitle className="text-text-100">{title}</DialogTitle>
          </div>
          <DialogDescription className="whitespace-pre-line text-left text-text-200">
            {message}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={onClose} variant="outline" className={FORM_STYLES.button.dialog}>
            {cancelText}
          </Button>
          <Button onClick={handleConfirm} className={FORM_STYLES.button.dialog}>
            {confirmText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
