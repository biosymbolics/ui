import JoyModal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import ModalDialog from '@mui/joy/ModalDialog';
import ModalOverflow from '@mui/joy/ModalOverflow';
import Typography from '@mui/joy/Typography';
import LaunchIcon from '@mui/icons-material/Launch';
import React from 'react';
import IconButton from '@mui/joy/IconButton';

type ModalProps = {
    children: React.ReactNode;
    title: string;
};

export const Modal = ({ children, title }: ModalProps) => {
    const [isOpen, setIsOpen] = React.useState<boolean>(false);
    return (
        <>
            <IconButton onClick={() => setIsOpen(true)}>
                <LaunchIcon />
            </IconButton>
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
