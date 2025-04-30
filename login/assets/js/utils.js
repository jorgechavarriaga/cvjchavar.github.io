/**
 * Display a toast notification.
 * @param {'success' | 'error' | 'warning'} type - The toast type.
 * @param {string} message - Message to display.
 * @param {number} [duration=3000] - Duration before fade-out (ms).
 */
function showToast(type, message, duration = 3000) {
    const toastContainer = document.getElementById('toast-container');
    const toast = document.createElement('div');
    const bgColor = {
      success: 'bg-green-500',
      error:   'bg-red-500',
      warning: 'bg-yellow-500'
    }[type] || 'bg-gray-500';
  
    toast.classList.add(
      bgColor, 'text-white', 'px-6', 'py-3', 'rounded-lg', 'shadow-lg',
      'mb-4', 'text-lg', 'transition-opacity', 'duration-500', 'opacity-100'
    );
    toast.textContent = message;
    toastContainer.appendChild(toast);
  
    setTimeout(() => {
      toast.classList.add('opacity-0');
      setTimeout(() => toast.remove(), 500);
    }, duration);
  }