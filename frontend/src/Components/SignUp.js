import React, { useEffect, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { userRegister } from '../Api/Auth';

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="#">
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

export default function SignUp() {
    const classes = useStyles();
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();
    useEffect(() => {
        const auth = localStorage.getItem('user');
        if (auth) {
            navigate('/');
        }
    })
    const onSubmit = async (data) => {
        const result = await userRegister(data);
        alert('User created successfully.');
        navigate('/login');
    }
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign Up
                </Typography>
                <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        id="name"
                        label="Name"
                        name="name"
                        autoComplete="name"
                        autoFocus
                        {...register("name", { required: "This field is required." })}
                        error={!!errors?.name}
                        helperText={errors?.name ? errors.name.message : null}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        {...register("email", {
                            required: "This field is required.",
                            pattern: {
                                value: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
                                message: 'Invalid email address'

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
                        {...register("password", {
                            required: "This field is required.",
                            minLength: {
                                value: 4,
                                message: 'Password length not less than 4 characters.'
                            }
                        })}
                        error={!!errors?.password}
                        helperText={errors?.password ? errors.password.message : null}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        id="cpassword"
                        type="password"
                        label="Confirm Password"
                        name="cpassword"
                        autoComplete="cpassword"
                        autoFocus
                        {...register("cpassword", { required: "This field is required." })}
                        error={!!errors?.cpassword}
                        helperText={errors?.cpassword ? errors.cpassword.message : null}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        name="btnSubmit"
                        id="btnSubmit"
                    >
                        Sign Up
                    </Button>
                </form>
            </div>
            <Box className={classes.boxClass}>
                <Copyright />
            </Box>
        </Container>
    );
}