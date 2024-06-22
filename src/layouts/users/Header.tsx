import { AppBar, Badge, Box, Drawer, ListItemButton, Tooltip, Typography, useMediaQuery } from "@mui/material";
import SearchInput from "../../components/common/search-input/SearchInput";
import IconButtonGradient from "../../components/common/IconButtonGradient";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { ExpandLess, ExpandMore, Notifications } from "@mui/icons-material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { primaryGradient } from "../../theme";
import MenuIcon from '@mui/icons-material/Menu';
import NavBar from "../common/NavBar";
import {useState } from "react";
import logoIcon from "../../assets/logo/logo-icon.png";
import { userMenu } from "../common/Menu";
import { useSelector } from "react-redux";
import { RootState } from "../../redux-toolkit/stores/store";

const Header = () => {
    const location = useLocation();
    const isMobile: boolean = useMediaQuery('(max-width:600px)');
    const isMedium: boolean = useMediaQuery('(max-width:1150px)');
    const [open, setOpen] = useState(false);
    const [openChildItem, setOpenChildItem] = useState<{ [key: string]: boolean }>({});
    const cart = useSelector((state: RootState) => state.cart.items);
    const navigate = useNavigate();
    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };
    const handleClick = (title: string) => {
        setOpenChildItem(prev => ({ ...prev, [title]: !prev[title] }));
    };

    const DrawerList = (
        <NavBar items={userMenu}></NavBar>
    );

   


    return (
        <AppBar elevation={0} color="secondary" sx={{
            display: 'flex',
            width: '100%',
            gap: '60px',
            alignItems: 'center',
            flexDirection: 'row',
            padding: '10px',
            pl: isMobile ? 1 : 6,
            pr: isMobile ? 2 : 6,
            backgroundColor: "background.paper"
        }}>

            <Box sx={{ flex: isMobile ? 1 : '', display: 'flex', alignItems: 'center' }}>
                {isMedium || isMobile ? <Box>
                    <IconButtonGradient onClick={toggleDrawer(true)}>
                        <MenuIcon />
                    </IconButtonGradient>
                    <Drawer open={open} onClose={toggleDrawer(false)}>
                        {DrawerList}
                    </Drawer>
                </Box> : <></>}
                <img src={logoIcon} alt={"logo"} width={"55px"} height={"55px"} />
            </Box>
            {!isMobile && !isMedium ? <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                gap: '10px',
                alignItems: 'center',
                padding: '10px',
            }}>
                {userMenu.map((item: any, index: number) => {
                    const isOpen = openChildItem[item.title] || false;
                    return (
                    <ListItemButton key={index} component={Link} to={item.href} sx={{
                        display: "flex",
                        ':hover': {
                            background: primaryGradient,
                            color: 'white'
                        },
                        background: location.pathname.startsWith(item.href) ? primaryGradient : 'none',
                        color: location.pathname.startsWith(item.href) ? 'white' : 'none',
                        textDecoration: 'none',
                        pl: 1, pr: 1,

                    }} onClick={() => handleClick(item.title)}>
                        <Typography>{item.title}</Typography>
                        {item.child ? isOpen ? <ExpandLess /> : <ExpandMore /> : <></>}
                    </ListItemButton>
                    )
                })}
            </Box> : <></>}
            {!isMobile && <Box sx={{ flex: 1 }}>
                <SearchInput placeHolder="search text here" />
            </Box>}
            <Box sx={{
                display: 'flex',
                gap: '15px',
            }}>
                <Tooltip title="giỏ hàng">
                    <IconButtonGradient onClick={() => navigate('/cart')}>
                        <Badge badgeContent={cart.length} color="primary">
                            <ShoppingCartIcon fontSize="small" />
                        </Badge>
                    </IconButtonGradient>
                </Tooltip>
                <Tooltip title="thông báo">
                    <IconButtonGradient>
                        <Badge badgeContent={4} color="primary">
                            <Notifications fontSize="small" />
                        </Badge>
                    </IconButtonGradient>
                </Tooltip>
                <Tooltip title="tài khoản">
                    <IconButtonGradient>
                        <AccountCircleIcon />
                    </IconButtonGradient>
                </Tooltip>
            </Box>
        </AppBar>
    )
}

export default Header;