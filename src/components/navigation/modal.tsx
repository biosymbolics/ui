'use client';

import JoyModal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import ModalDialog from '@mui/joy/ModalDialog';
import ModalOverflow from '@mui/joy/ModalOverflow';
import Typography from '@mui/joy/Typography';
import LaunchIcon from '@mui/icons-material/Launch';
import React, { useCallback } from 'react';
import IconButton, { IconButtonProps } from '@mui/joy/IconButton';
import { useRouter } from 'next/navigation';

export type ModalButtonElementProps = {
    onClick: IconButtonProps['onClick'];
};

type BaseModalProps = {
    title: string;
    children: React.ReactNode;
};

type ControlledModalProps = {
    isOpen: boolean;
    setIsOpen?: (isOpen: boolean) => void; // TODO: XOR with buttonElement
} & BaseModalProps;

type ModalProps = {
    buttonElement?: (props: ModalButtonElementProps) => React.ReactNode;
} & BaseModalProps;

const DefaultButtonElement = ({ onClick }: ModalButtonElementProps) => (
    <IconButton onClick={onClick}>
        <LaunchIcon />
    </IconButton>
);

/**
 * Modal controlled externally (i.e. provided isOpen and setIsOpen props)
 */
export const ControlledModal = ({
    children,
    isOpen,
    setIsOpen = () => {},
    title,
}: ControlledModalProps) => (
    <JoyModal open={isOpen} onClose={() => setIsOpen(false)}>
        <ModalOverflow>
            <ModalDialog layout="fullscreen">
                <ModalClose size="lg" />
                <Typography level="h2">{title}</Typography>
                {children}
            </ModalDialog>
        </ModalOverflow>
    </JoyModal>
);

/**
 * Modal controlled internally (isOpen handled via state)
 */
export const Modal = ({ buttonElement, children, title }: ModalProps) => {
    const ButtonElement = buttonElement || DefaultButtonElement;
    const [isOpen, setIsOpen] = React.useState<boolean>(false);
    return (
        <>
            <ButtonElement onClick={() => setIsOpen(true)} />
            <ControlledModal
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                title={title}
            >
                {children}
            </ControlledModal>
        </>
    );
};

export const RouteableModal = ({
    children,
    isOpen,
    ...props
}: ControlledModalProps) => {
    const router = useRouter();

    const onDismiss = useCallback(() => {
        router.back();
    }, [router]);

    return (
        <ControlledModal isOpen={isOpen} setIsOpen={onDismiss} {...props}>
            {children}
        </ControlledModal>
    );
};
