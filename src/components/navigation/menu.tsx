'use client';

/* eslint-disable @typescript-eslint/naming-convention */
import {
    HTMLAttributes,
    KeyboardEvent,
    MouseEvent,
    ReactNode,
    ReactElement,
    cloneElement,
    useRef,
    useState,
} from 'react';
import Menu, { menuClasses } from '@mui/joy/Menu';
import MenuItem from '@mui/joy/MenuItem';
import IconButton from '@mui/joy/IconButton';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import Sheet from '@mui/joy/Sheet';
import Apps from '@mui/icons-material/Apps';
import Settings from '@mui/icons-material/Settings';
import Dropdown from '@mui/joy/Dropdown';
import MenuButton from '@mui/joy/MenuButton';

// The Menu is built on top of Popper v2, so it accepts `modifiers` prop that will be passed to the Popper.
// https://popper.js.org/docs/v2/modifiers/offset/
type MenuButtonProps = {
    children: ReactNode;
    menu: ReactElement;
    open: boolean;
    onOpen: (
        event?: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLButtonElement>
    ) => void;
    onLeaveMenu: (callback: () => boolean) => void;
    label: string;
} & HTMLAttributes<HTMLButtonElement>;

const modifiers = [
    {
        name: 'offset',
        options: {
            offset: ({ placement }: { placement: string[] }) => {
                if (placement.includes('end')) {
                    return [8, 20];
                }
                return [-8, 20];
            },
        },
    },
];

const NavMenuButton = ({
    children,
    menu,
    open,
    onOpen,
    onLeaveMenu,
    label,
    ...props
}: Omit<MenuButtonProps, 'color'>) => {
    const isOnButton = useRef(false);
    const internalOpen = useRef(open);

    const handleButtonKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
        internalOpen.current = open;
        if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
            event.preventDefault();
            onOpen(event);
        }
    };

    return (
        <Dropdown>
            <MenuButton
                {...props}
                slots={{ root: IconButton }}
                slotProps={{ root: { variant: 'soft', color: 'primary' } }}
                onMouseDown={() => {
                    internalOpen.current = open;
                }}
                onClick={() => {
                    if (!internalOpen.current) {
                        onOpen();
                    }
                }}
                onMouseLeave={() => {
                    isOnButton.current = false;
                }}
                onKeyDown={handleButtonKeyDown}
                sx={{
                    bgcolor: open ? 'neutral.plainHoverBg' : undefined,
                    '&:focus-visible': {
                        bgcolor: 'neutral.plainHoverBg',
                    },
                }}
            >
                {children}
            </MenuButton>
            {cloneElement(menu, {
                onMouseLeave: () => {
                    onLeaveMenu(() => isOnButton.current);
                },
                modifiers,
                slotProps: {
                    listbox: {
                        id: `nav-example-menu-${label}`,
                        'aria-label': label,
                    },
                },
                placement: 'right-start',
                sx: {
                    width: 288,
                    [`& .${menuClasses.listbox}`]: {
                        '--List-padding': 'var(--ListDivider-gap)',
                    },
                },
            })}
        </Dropdown>
    );
};

/**
 * Side navigation menu
 */
export const SideNav = () => {
    const [menuIndex, setMenuIndex] = useState<null | number>(null);
    const itemProps = {
        onClick: () => setMenuIndex(null),
    };
    const createHandleLeaveMenu =
        (index: number) => (getIsOnButton: () => boolean) => {
            setTimeout(() => {
                const isOnButton = getIsOnButton();
                if (!isOnButton) {
                    setMenuIndex((latestIndex: null | number) => {
                        if (index === latestIndex) {
                            return null;
                        }
                        return latestIndex;
                    });
                }
            }, 200);
        };
    return (
        <Sheet
            color="neutral"
            sx={{
                borderRadius: 'sm',
                py: 1,
                mr: 20,
            }}
            variant="soft"
        >
            <List>
                <ListItem>
                    <NavMenuButton
                        label="Apps"
                        open={menuIndex === 0}
                        onOpen={() => setMenuIndex(0)}
                        onLeaveMenu={createHandleLeaveMenu(0)}
                        onKeyDown={() => setMenuIndex(null)}
                        menu={
                            <Menu onClose={() => setMenuIndex(null)}>
                                <MenuItem {...itemProps}>
                                    Application 1
                                </MenuItem>
                                <MenuItem {...itemProps}>
                                    Application 2
                                </MenuItem>
                                <MenuItem {...itemProps}>
                                    Application 3
                                </MenuItem>
                            </Menu>
                        }
                    >
                        <Apps />
                    </NavMenuButton>
                </ListItem>
                <ListItem>
                    <NavMenuButton
                        label="Settings"
                        open={menuIndex === 1}
                        onOpen={() => setMenuIndex(1)}
                        onLeaveMenu={createHandleLeaveMenu(1)}
                        menu={
                            <Menu onClose={() => setMenuIndex(null)}>
                                <MenuItem {...itemProps}>Setting 1</MenuItem>
                                <MenuItem {...itemProps}>Setting 2</MenuItem>
                                <MenuItem {...itemProps}>Setting 3</MenuItem>
                            </Menu>
                        }
                    >
                        <Settings />
                    </NavMenuButton>
                </ListItem>
            </List>
        </Sheet>
    );
};
