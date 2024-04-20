import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const showRejectedMessage = (text: string) => {
  toast.error(text, {
    position: 'top-center',
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light',
  });
};

