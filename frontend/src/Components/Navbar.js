import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Link, useNavigate } from 'react-router-dom';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { AuthInterceptor } from '../AuthInterceptor';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    link: {
        color: '#fff',
        textDecoration: 'none'
    }
}));

export default function Navbar() {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const auth = localStorage.getItem('user');
    const navigate = useNavigate();
    const logOut = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        navigate('/login');
    }

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    useEffect(() => {
        if (auth) {
            AuthInterceptor();
        }
    });

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        {auth ? JSON.parse(auth).name.toUpperCase() : ''}
                    </Typography>

                    {
                        auth ?
                            <>

                                <Button color="inherit" onClick={handleMenu}>Products</Button>
                                <Menu
                                    id="menu-appbar"
                                    anchorEl={anchorEl}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={open}
                                    onClose={handleClose}
                                >
                                    <MenuItem onClick={(e) => { handleClose(); navigate('/addProduct'); }}>Add Product</MenuItem>
                                    <MenuItem onClick={(e) => { handleClose(); navigate('/'); }}>Products List</MenuItem>
                                </Menu>

                                <Link to="/login" className={classes.link} onClick={logOut}>
                                    <Button color="inherit">Log Out</Button>
                                </Link>
                            </>
                            : <>
                                <Link to="/login" className={classes.link}>
                                    <Button color="inherit">Login</Button>
                                </Link>
                                <Link to="/signUp" className={classes.link}>
                                    <Button color="inherit">Sign Up</Button>
                                </Link>


                            </>
                    }


                </Toolbar>
            </AppBar>
        </div>
    );
}
