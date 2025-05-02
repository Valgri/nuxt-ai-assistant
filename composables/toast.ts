type Toast = {
  // Define the structure of the toast object here
  show: (message: string) => void;
};

export const useToast = (): Toast => {
  const toast: Toast = {
    show: (message: string) => {
      console.log(message);
    },
  };
  return toast;
};
