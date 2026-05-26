// src/shared/ui/modals/BaseModal.tsx
import { Fragment, type ReactNode } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { X } from 'lucide-react';

interface BaseModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
    title?: string;
    className?: string;
}

export const BaseModal = ({ isOpen, onClose, children, title, className = '' }: BaseModalProps) => {
    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={onClose}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className={`w-full max-w-2xl bg-primary-black-500 border border-primary-black-300 overflow-hidden shadow-xl transform transition-all ${className}`}>
                                <div className="flex items-center justify-between p-4 border-b border-primary-black-300">
                                    {title && (
                                        <Dialog.Title className="text-title2-medium text-primary-white-600 uppercase">
                                            {title}
                                        </Dialog.Title>
                                    )}
                                    <button
                                        type='button'
                                        onClick={onClose}
                                        className="p-1 text-primary-white-400 hover:text-primary-white-600 transition-colors"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>
                                <div className="p-4">
                                    {children}
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};