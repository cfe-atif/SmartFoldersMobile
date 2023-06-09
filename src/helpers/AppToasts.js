import SFToast from '../components/toasts/SFToast';

export const showSuccessToast = (title, desc) => {
  SFToast({
    type: 'success',
    title: title,
    description: desc,
  });
};

export const showFaliureToast = (title, desc) => {
  SFToast({
    type: 'error',
    title: title,
    description: desc,
  });
};
