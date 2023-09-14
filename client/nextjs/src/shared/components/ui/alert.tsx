import cn from 'classnames';
import React, { forwardRef, HTMLAttributes, MouseEventHandler, useState } from 'react';
import { BsFillCheckCircleFill, BsFillExclamationTriangleFill, BsFillInfoCircleFill, BsXCircleFill } from 'react-icons/bs';
import { MdClose } from 'react-icons/md';

interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  isPermanent?: boolean;
  callToAction?: {
    label: string;
    action: MouseEventHandler<HTMLButtonElement>;
  };
}

const classes = {
  root: 'p-4 space-x-3 rounded-md flex w-full',
  success: {
    main: 'bg-green-100',
    circleIcon: 'text-green-700',
    title: 'text-green-900',
    content: 'text-green-800',
    closeButton: 'text-green-900/70 hover:text-green-900 hover:bg-green-200',
  },
  info: {
    main: 'bg-blue-100',
    circleIcon: 'text-blue-700',
    title: 'text-blue-900',
    content: 'text-blue-800',
    closeButton: 'text-blue-900/70 hover:text-blue-900 hover:bg-blue-200',
  },
  warning: {
    main: 'bg-orange-100',
    circleIcon: 'text-orange-500',
    title: 'text-orange-900',
    content: 'text-orange-800',
    closeButton: 'text-orange-900/70 hover:text-orange-900 hover:bg-orange-200',
  },
  error: {
    main: 'bg-red-100',
    circleIcon: 'text-red-600',
    title: 'text-red-900',
    content: 'text-red-800',
    closeButton: 'text-red-900/70 hover:text-red-900 hover:bg-red-200',
  },
};

const Alert = forwardRef<HTMLDivElement, AlertProps>((props, ref) => {
  const { className, variant = 'info', message, title, callToAction, isPermanent = false, ...rest } = props;
  const [showAlert, setShowAlert] = useState<boolean>(true);
  const closeAlert = () => setShowAlert(false);

  if (!showAlert) return null;

  return (
    <div
      {...rest}
      ref={ref}
      role="alert"
      className={cn(
        [classes.root],
        {
          [classes.info.main]: variant === 'info',
          [classes.success.main]: variant === 'success',
          [classes.warning.main]: variant === 'warning',
          [classes.error.main]: variant === 'error',
        },
        className,
      )}
    >
      <div className="shrink-0">
        {variant === 'info' ? (
          <BsFillInfoCircleFill className={`w-5 h-5 ${classes.info.circleIcon}`} />
        ) : variant === 'warning' ? (
          <BsFillExclamationTriangleFill className={`w-5 h-5 ${classes.warning.circleIcon}`} />
        ) : variant === 'error' ? (
          <BsXCircleFill className={`w-5 h-5 ${classes.error.circleIcon}`} />
        ) : variant === 'success' ? (
          <BsFillCheckCircleFill className={`w-5 h-5 ${classes.success.circleIcon}`} />
        ) : (
          ''
        )}
      </div>

      <div className="flex-1 space-y-1.5">
        <h2
          className={`font-medium ${
            variant === 'success'
              ? classes.success.title
              : variant === 'info'
              ? classes.info.title
              : variant === 'warning'
              ? classes.warning.title
              : variant === 'error'
              ? classes.error.title
              : ''
          }`}
        >
          {title}
        </h2>
        <div
          className={`text-sm ${
            variant === 'success'
              ? classes.success.content
              : variant === 'info'
              ? classes.info.content
              : variant === 'warning'
              ? classes.warning.content
              : variant === 'error'
              ? classes.error.content
              : ''
          }`}
        >
          {message}
        </div>
        {callToAction?.action && callToAction?.label ? (
          <div>
            <button onClick={callToAction.action} className="bg-white rounded-md px-3 py-1.5 border-1 border-slate-200 text-14">
              {callToAction.label}
            </button>
          </div>
        ) : null}
      </div>
      {!isPermanent ? (
        <div className="shrink-0">
          <button
            onClick={closeAlert}
            className={`p-0.5 -m-1 ${
              variant === 'success'
                ? classes.success.closeButton
                : variant === 'info'
                ? classes.info.closeButton
                : variant === 'warning'
                ? classes.warning.closeButton
                : variant === 'error'
                ? classes.error.closeButton
                : ''
            }`}
          >
            <MdClose className="w-5 h-5" />
          </button>
        </div>
      ) : null}
    </div>
  );
});

Alert.displayName = 'Alert';

export default Alert;
