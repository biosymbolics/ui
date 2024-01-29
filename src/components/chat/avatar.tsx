'use client';

import * as React from 'react';
import JoyAvatar, { AvatarProps as JoyAvatarProps } from '@mui/joy/Avatar';

type AvataProps = JoyAvatarProps;

export const Avatar = (props: AvataProps) => (
    <JoyAvatar color="primary" size="md" variant="outlined" {...props} />
);
