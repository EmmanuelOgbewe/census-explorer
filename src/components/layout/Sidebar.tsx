import { useState } from 'react';
import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Divider,
  useTheme,
} from '@mui/material';


import HomeIcon from '@mui/icons-material/Home';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import BarChartIcon from '@mui/icons-material/BarChart';
import HowToModal from '../modals/HowToModal';


const DRAWER_WIDTH = 240;
const COLLAPSED_WIDTH = 64;

interface SidebarItem {
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
}

interface SidebarProps {
  onNavigate?: (route: string) => void;
}

const Sidebar = ({ onNavigate }: SidebarProps) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleMouseEnter = (): void => setIsExpanded(true);
  const handleMouseLeave = (): void => setIsExpanded(false);
  const handleModalOpen = (): void => setIsModalOpen(true);
  const handleModalClose = (): void => setIsModalOpen(false);

  const NAV_ITEMS: SidebarItem[] = [
    {
      label: 'Home',
      icon: <HomeIcon />,
      onClick: () => onNavigate?.('/'),
    },
    {
      label: 'How To Use',
      icon: <HelpOutlineIcon />,
      onClick: handleModalOpen,
    },
  ];

  // add this inside the component above the return
   const theme = useTheme();

   // ─── Styles ──────────────────────────────────────────────────────────────────

    const styles = {
        drawer: (isExpanded: boolean) => ({
            width: isExpanded ? DRAWER_WIDTH : COLLAPSED_WIDTH,
            flexShrink: 0,
            whiteSpace: 'nowrap',
            transition: 'width 0.2s ease-in-out',
            '& .MuiDrawer-paper': {
            width: isExpanded ? DRAWER_WIDTH : COLLAPSED_WIDTH,
            overflowX: 'hidden',
            transition: 'width 0.2s ease-in-out',
            backgroundColor: theme.palette.sidebar.background,
            color: theme.palette.sidebar.text,
            borderRight: 'none',
            },
        }),
        logoContainer: (isExpanded: boolean) => ({
            display: 'flex',
            alignItems: 'center',
            justifyContent: isExpanded ? 'flex-start' : 'center',
            px: isExpanded ? 2 : 0,
            py: 2,
            minHeight: 64,
        }),
        logoIcon: {
            color: theme.palette.sidebar.accent,
            fontSize: 28,
        },
        logoText: {
            ml: 1.5,
            fontWeight: 700,
            fontSize: '1rem',
            color: theme.palette.sidebar.accent,
            letterSpacing: 1,
        },
        divider: {
            borderColor: theme.palette.sidebar.divider,
        },
        list: {
            mt: 1,
        },
        listItemButton: (isExpanded: boolean) => ({
            justifyContent: isExpanded ? 'flex-start' : 'center',
            px: isExpanded ? 2 : 0,
            py: 1.5,
            '&:hover': {
            backgroundColor: theme.palette.sidebar.hover,
            },
        }),
        listItemIcon: (isExpanded: boolean) => ({
            color: theme.palette.sidebar.accent,
            minWidth: isExpanded ? 40 : 'unset',
            justifyContent: 'center',
        }),
        listItemText: {
            fontSize: '0.875rem',
            fontWeight: 500,
            color: theme.palette.sidebar.text,
        },
    };

  return (
    <>
      <Drawer
        variant="permanent"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        sx={styles.drawer(isExpanded)}
      >
        <Box sx={styles.logoContainer(isExpanded)}>
          <BarChartIcon sx={styles.logoIcon} />
          {isExpanded && (
            <Box component="span" sx={styles.logoText}>
              Census Explorer
            </Box>
          )}
        </Box>

        <Divider sx={styles.divider} />

        <List sx={styles.list}>
          {NAV_ITEMS.map((item) => (
            <Tooltip
              key={item.label}
              title={!isExpanded ? item.label : ''}
              placement="right"
            >
              <ListItemButton
                onClick={item.onClick}
                sx={styles.listItemButton(isExpanded)}
              >
                <ListItemIcon sx={styles.listItemIcon(isExpanded)}>
                  {item.icon}
                </ListItemIcon>
                {isExpanded && (
                  <ListItemText
                    primary={item.label}
                    primaryTypographyProps={styles.listItemText}
                  />
                )}
              </ListItemButton>
            </Tooltip>
          ))}
        </List>
      </Drawer>

      <HowToModal open={isModalOpen} onClose={handleModalClose} />
    </>
  );
};

export default Sidebar;
