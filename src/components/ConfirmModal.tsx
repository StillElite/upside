import { FormModal } from './FormModal';

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  confirmLabel?: string;
  cancelLabel?: string;
  message: React.ReactNode;
}

export const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  message,
}: ConfirmModalProps) => {
  return (
    <FormModal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      cancelLabel={cancelLabel}
      submitLabel={confirmLabel}
      onSubmit={onConfirm}
    >
      <div className='space-y-4'>{message}</div>
    </FormModal>
  );
};
