import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Function to display a toast notification
export const showToast = (message: string, type: string) => {
  // Types: 'info', 'success', 'warning', 'error'
  switch (type) {
    case 'success':
      toast.success(message);
      break;
    case 'warning':
      toast.warning(message);
      break;
    case 'error':
      toast.error(message);
      break;
    default:
      toast.info(message);
      break;
  }
};