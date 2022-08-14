import React, { useEffect, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Link, useNavigate } from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useForm } from 'react-hook-form';
import CryptoJS from 'crypto-js';
import { checkLogin } from '../Api/Auth';

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" to={'#'}>
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    boxClass: {
        marginTop: '20px;'
    }
}));

export default function Login() {
    const salt = process.env.REACT_APP_SALT;
    const userName = localStorage.getItem('username');
    let pwd = localStorage.getItem('password');
    if (pwd) {
        pwd = CryptoJS.AES.decrypt(pwd, salt).toString(CryptoJS.enc.Utf8);
    }
    const classes = useStyles();
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            email: userName,
            password: pwd,
        }
    });
    const [remember, setRemember] = useState(localStorage.getItem('isRemember') ? true : false);
    const navigate = useNavigate();
    useEffect(() => {
        const auth = localStorage.getItem('user');
        if (auth) {
            navigate('/');
        }
    });
    const onSubmit = async (data) => {
        const result = await checkLogin(data);
        if (result.auth) {
            localStorage.setItem('user', JSON.stringify(result.user));
            localStorage.setItem('token', JSON.stringify(result.auth));
            if (remember) {
                const pwd = CryptoJS.AES.encrypt(data.password, salt).toString();
                localStorage.setItem('username', data.email);
                localStorage.setItem('password', pwd);
                localStorage.setItem('isRemember', remember);
            } else {
                localStorage.removeItem('username');
                localStorage.removeItem('password');
                localStorage.removeItem('isRemember');
            }
            navigate('/');
        } else {
            alert('Please enter correct details.');
        }
    }
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        {...register('email', {
                            required: "This field is required.",
                            pattern: {
                                value: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
                                message: "Invalid email address."
                            }
                        })}
                        error={!!errors?.email}
                        helperText={errors?.email ? errors.email.message : null}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        {...register('password', { required: "This field is required." })}
                        error={!!errors?.password}
                        helperText={errors?.password ? errors.password.message : null}
                    />
                    <FormControlLabel
                        control={<Checkbox color="primary" onChange={(e) => setRemember(e.target.checked)} checked={remember} />}
                        label="Remember me"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link to={"#"} variant="body2">
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link to={'/signUp'} variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box className={classes.boxClass}>
                <Copyright />
            </Box>
        </Container>
    );
}