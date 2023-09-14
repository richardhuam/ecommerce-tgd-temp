export const preventEnterKeySubmission = (event: React.KeyboardEvent<HTMLFormElement>) => {
  if (event.key === 'Enter') {
    event.preventDefault();
  }
};
