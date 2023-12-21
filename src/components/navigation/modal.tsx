import JoyModal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import ModalDialog from '@mui/joy/ModalDialog';
import ModalOverflow from '@mui/joy/ModalOverflow';
import Typography from '@mui/joy/Typography';
import LaunchIcon from '@mui/icons-material/Launch';
import React from 'react';
import IconButton, { IconButtonProps } from '@mui/joy/IconButton';

export type ModalButtonElementProps = {
    onClick: IconButtonProps['onClick'];
};

type ModalProps = {
    buttonElement?: (props: ModalButtonElementProps) => React.ReactNode;
    children: React.ReactNode;
    title: string;
};

const DefaultButtonElement = ({ onClick }: ModalButtonElementProps) => (
    <IconButton onClick={onClick}>
        <LaunchIcon />
    </IconButton>
);

export const Modal = ({ buttonElement, children, title }: ModalProps) => {
    const ButtonElement = buttonElement || DefaultButtonElement;
    const [isOpen, setIsOpen] = React.useState<boolean>(false);
    return (
        <>
            <ButtonElement onClick={() => setIsOpen(true)} />
            <JoyModal open={isOpen} onClose={() => setIsOpen(false)}>
                <ModalOverflow>
                    <ModalDialog
                        aria-labelledby="modal-dialog-overflow"
                        layout="fullscreen"
                    >
                        <ModalClose />
                        <Typography id="modal-dialog-overflow" level="h1">
                            {title}
                        </Typography>
                        {children}
                    </ModalDialog>
                </ModalOverflow>
            </JoyModal>
        </>
    );
};
