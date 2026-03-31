import { Toaster } from 'react-hot-toast';
import AppLayout from './features/layout/AppLayout';
import { toastOptions } from './utils/toastOptions';

function App() {
  return (
    <>
      <Toaster position='bottom-right' toastOptions={toastOptions} />
      <AppLayout />
    </>
  );
}

export default App;
