import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Modal from 'react-modal';
import { Button } from './Button';

export interface FormModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title: string;
  cancelLabel: string;
  submitLabel: string;
  onSubmit: () => void;
}

export const FormModal = ({
  isOpen,
  onClose,
  children,
  title,
  cancelLabel,
  submitLabel,
  onSubmit,
}: FormModalProps) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit();
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleClose}
      contentLabel={title}
      role='dialog'
      shouldCloseOnOverlayClick={false}
      shouldCloseOnEsc={true}
      aria={{
        modal: true,
        labelledby: 'modal-title',
      }}
      className='w-full max-w-md mx-4 rounded-2xl border border-[#31475c] bg-[#305e88] text-[#1c2b3d] shadow-md focus:outline-none'
      overlayClassName='fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50'
    >
      <div className='overflow-hidden rounded-2xl'>
        <div className='relative border-b border-[#2f4f6a] px-6 py-5'>
          <h2
            id='modal-title'
            className='pr-10 text-[1.4rem] font-semibold text-white'
          >
            {title}
          </h2>

          <button
            type='button'
            onClick={handleClose}
            aria-label='Close'
            className='absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full text-slate-300 transition hover:bg-white/10 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white'
          >
            <FontAwesomeIcon icon={faTimes} aria-hidden='true' />
          </button>
        </div>

        <form onSubmit={handleSubmit} className='bg-[#f7f9fb] '>
          <div className='px-6 py-6'>{children}</div>

          <div className='flex justify-end gap-3 border-t border-[#d6dde4] px-6 py-5'>
            <Button
              text={cancelLabel}
              className='text-xs'
              variant='secondary'
              onClick={handleClose}
            />
            <Button text={submitLabel} className='text-xs' type='submit' />
          </div>
        </form>
      </div>
    </Modal>
  );
};
