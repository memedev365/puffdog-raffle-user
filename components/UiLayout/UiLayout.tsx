'use client';
import * as React from 'react';
import { ReactNode, Suspense, useEffect, useRef } from 'react';
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import Header from '../Header/Header';
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function UiLayout({ children }: { children: ReactNode }) {

    return (
        <div className="h-full w-full flex flex-col items-center">
            <div className="flex-grow w-full flex flex-col">
                <Suspense
                    fallback={
                        <div className="text-center my-32">
                            <span className="loading loading-spinner loading-lg"></span>
                        </div>
                    }
                >
                    <Header />
                    {children}
                </Suspense>
            </div>
        </div>
    );
}

export function AppModal({
    children,
    title,
    hide,
    show,
    submit,
    submitDisabled,
    submitLabel,
}: {
    children: ReactNode;
    title: string;
    hide: () => void;
    show: boolean;
    submit?: () => void;
    submitDisabled?: boolean;
    submitLabel?: string;
}) {
    const dialogRef = useRef<HTMLDialogElement | null>(null);

    useEffect(() => {
        if (!dialogRef.current) return;
        if (show) {
            dialogRef.current.showModal();
        } else {
            dialogRef.current.close();
        }
    }, [show, dialogRef]);

    return (
        <dialog className="modal" ref={dialogRef}>
            <div className="modal-box space-y-5">
                <h3 className="font-bold text-lg">{title}</h3>
                {children}
                <div className="modal-action">
                    <div className="join space-x-2">
                        {submit ? (
                            <button
                                className="btn btn-xs lg:btn-md btn-primary"
                                onClick={submit}
                                disabled={submitDisabled}
                            >
                                {submitLabel || 'Save'}
                            </button>
                        ) : null}
                        <button onClick={hide} className="btn">
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </dialog>
    );
}

export function AppHero({
    children,
    title,
    subtitle,
}: {
    children?: ReactNode;
    title: ReactNode;
    subtitle: ReactNode;
}) {
    return (
        <div className="py-[64px]">
            <div className="text-center">
                <div className="max-w-2xl">
                    {typeof title === 'string' ? (
                        <h1 className="text-5xl">{title}</h1>
                    ) : (
                        title
                    )}
                    {typeof subtitle === 'string' ? (
                        <p className="py-6">{subtitle}</p>
                    ) : (
                        subtitle
                    )}
                    {children}
                </div>
            </div>
        </div>
    );
}
