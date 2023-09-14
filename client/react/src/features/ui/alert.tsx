type AlertProps = {
  type: 'success' | 'warning' | 'error' | 'info';
  message: string;
};

export default function Alert({ type = 'info', message }: AlertProps) {
  if (type === 'success') {
    return (
      <div className="flex bg-white shadow-lg rounded-lg">
        <div className="icon bg-green-600 flex justify-center items-center py-4 px-6 rounded-tr-3xl rounded-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 bg-white rounded-full text-green-600 p-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <div className="flex flex-col p-4 rounded-tr-lg rounded-br-lg">
          <h2 className="font-semibold text-green-600">Success</h2>
          <p className="text-gray-700">{message}</p>
        </div>
      </div>
    );
  }

  if (type === 'error') {
    return (
      <div className="flex bg-white shadow-lg rounded-lg">
        <div className="icon bg-red-600 flex justify-center items-center py-4 px-6 rounded-tr-3xl rounded-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 bg-white rounded-full text-red-600 p-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        <div className="flex flex-col p-4 rounded-tr-lg rounded-br-lg">
          <h2 className="font-semibold text-red-600">Error</h2>
          <p className="text-gray-700">{message}</p>
        </div>
      </div>
    );
  }

  if (type === 'warning') {
    return (
      <div className="flex bg-white shadow-lg rounded-lg">
        <div className="icon bg-yellow-600 flex justify-center items-center py-4 px-6 rounded-tr-3xl rounded-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 bg-white rounded-full text-yellow-600 p-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div className="flex flex-col p-4 rounded-tr-lg rounded-br-lg">
          <h2 className="font-semibold text-yellow-600">Warning</h2>
          <p className="text-gray-700">{message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex bg-white shadow-lg rounded-lg">
      <div className="icon bg-sky-600 flex justify-center items-center py-4 px-6 rounded-tr-3xl rounded-lg">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 bg-white rounded-full text-sky-600 p-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
      <div className="flex flex-col p-4 rounded-tr-lg rounded-br-lg">
        <h2 className="font-semibold text-sky-600">Info</h2>
        <p className="text-gray-700">{message}</p>
      </div>
    </div>
  );
}
