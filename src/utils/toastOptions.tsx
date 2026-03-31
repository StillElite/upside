import { ToasterProps } from 'react-hot-toast';

export const toastOptions: ToasterProps['toastOptions'] = {
  duration: 9000,
  style: {
    background: '#f0fdf4',
    color: '#14532d',
    fontSize: '0.875rem',
    padding: '12px 16px',
  },
  success: {
    iconTheme: {
      primary: '#166534',
      secondary: '#f0fdf4',
    },
  },
  error: {
    style: {
      background: '#fef2f2',
      color: '#991b1b',
    },
    iconTheme: {
      primary: '#991b1b',
      secondary: '#fef2f2',
    },
  },
};
