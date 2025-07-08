import { useState, useRef, useEffect } from 'react';
import { MoreHorizontal, Eye, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FORM_STYLES } from '@/constants/form-styles';
import { cn } from '@/lib/utils';

interface ActionItem {
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
  variant?: 'default' | 'danger';
}

interface ActionMenuProps {
  actions: ActionItem[];
  className?: string;
}

export function ActionMenu({ actions, className = '' }: ActionMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleActionClick = (action: ActionItem) => {
    action.onClick();
    setIsOpen(false);
  };

  return (
    <div className={cn(FORM_STYLES.seller.actionMenu.container, className)} ref={menuRef}>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className={FORM_STYLES.seller.actionMenu.button}
      >
        <MoreHorizontal className="h-4 w-4" />
      </Button>

      {isOpen && (
        <div className={FORM_STYLES.seller.actionMenu.dropdown}>
          {actions.map((action, index) => (
            <button
              key={index}
              onClick={() => handleActionClick(action)}
              className={cn(
                FORM_STYLES.seller.actionMenu.item,
                action.variant === 'danger' && FORM_STYLES.seller.actionMenu.danger,
              )}
            >
              {action.icon}
              {action.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// 기본 액션들을 위한 헬퍼 함수들
export const createViewAction = (onView: () => void): ActionItem => ({
  label: '보기',
  icon: <Eye className="h-4 w-4" />,
  onClick: onView,
});

export const createEditAction = (onEdit: () => void): ActionItem => ({
  label: '수정',
  icon: <Edit className="h-4 w-4" />,
  onClick: onEdit,
});

export const createDeleteAction = (onDelete: () => void): ActionItem => ({
  label: '삭제',
  icon: <Trash2 className="h-4 w-4" />,
  onClick: onDelete,
  variant: 'danger',
});
