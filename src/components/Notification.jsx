import { Transition } from '@headlessui/react';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';
import { Fragment } from 'react';

export default function Notification({ show, type, message, onClose }) {
  return (
    <Transition
      show={show}
      as={Fragment}
      enter="transform ease-out duration-300 transition"
      enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
      enterTo="translate-y-0 opacity-100 sm:translate-x-0"
      leave="transition ease-in duration-100"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className="fixed top-4 right-4 z-50">
        <div 
          className={`flex items-center p-4 rounded-lg shadow-lg bg-white border-l-4 min-w-[320px] ${
            type === 'success' ? 'border-green-500' : 'border-red-500'
          }`}
        >
          <div className="flex-shrink-0">
            {type === 'success' ? (
              <CheckCircleIcon className="h-6 w-6 text-green-500" />
            ) : (
              <XCircleIcon className="h-6 w-6 text-red-500" />
            )}
          </div>
          <div className="ml-3">
            <p className={`text-sm font-medium ${
              type === 'success' ? 'text-green-800' : 'text-red-800'
            }`}>
              {message}
            </p>
          </div>
          <button
            onClick={onClose}
            className="ml-auto pl-3 text-gray-400 hover:text-gray-500"
          >
            <span className="sr-only">Close</span>
            <XCircleIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
    </Transition>
  );
}
