import React, { useEffect, useState } from 'react'
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useForm } from 'react-hook-form';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import FormHelperText from '@material-ui/core/FormHelperText';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchProductDetails, updateProductInfo, addProductInfo } from '../Api/Products';

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
    },
    formControl: {
        width: '100%',
        paddingTop: '15px'
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

export default function ProductForm() {
    const classes = useStyles();
    const { register, handleSubmit, setValue, formState: { errors } } = useForm({
        mode: 'onChange',
        defaultValues: {
            name: '',
            price: '',
            category: '',
            company: ''
        }
    });
    const navigate = useNavigate();
    const params = useParams();
    useEffect(() => {
        if (typeof (params.id) != 'undefined') {
            getProductDetails();
        } else {
            setValue('name', '');
            setValue('price', '');
            setValue('category', '');
            setValue('company', '');
        }
    }, []);
    const getProductDetails = async () => {
        const result = await fetchProductDetails(params.id);
        setValue('name', result.name);
        setValue('price', result.price);
        setValue('category', result.category);
        setValue('company', result.company);
    }
    const onSubmit = async (data) => {
        const user = JSON.parse(localStorage.getItem('user'));
        const userId = user._id;
        data.userId = userId;
        if (params.id) {
            const result = await updateProductInfo(params.id, data);
            alert('Updated successfully.');
        } else {
            const result = await addProductInfo(data);
            alert('Added successfully.');
        }
        navigate('/');
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    {params.id ? 'Update Product' : 'Add product'}
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
                        InputLabelProps={{ shrink: true }}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        id="price"
                        label="Price"
                        name="price"
                        autoComplete="price"
                        autoFocus
                        {...register("price", {
                            required: "This field is required.",
                            pattern: {
                                value: /^[0-9]+$/,
                                message: 'Please enter a number',
                            }

                        })}
                        error={!!errors?.price}
                        helperText={errors?.price ? errors.price.message : null}
                        InputLabelProps={{ shrink: true }}
                    />
                    <FormControl variant="outlined" className={classes.formControl} error={!!errors?.category}>
                        <InputLabel htmlFor="outlined-age-native-simple" shrink={true}>Category</InputLabel>
                        <Select
                            native
                            fullWidth
                            name="category"
                            id="category"
                            {...register("category", {
                                required: "This field is required.",
                            })}
                        //Modified line

                        >
                            <option aria-label="None" value="" />
                            <option value='mobile'>Mobile</option>
                            <option value='electronic'>Electronic</option>
                            <option value='IT'>IT</option>
                        </Select>
                        <FormHelperText>{errors?.category ? errors.category.message : null}</FormHelperText>
                    </FormControl>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        id="company"
                        label="Company"
                        name="company"
                        autoComplete="company"
                        autoFocus
                        {...register("company", { required: "This field is required." })}
                        error={!!errors?.company}
                        helperText={errors?.company ? errors.company.message : null}
                        InputLabelProps={{ shrink: true }}
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
                        {params.id ? 'Update Product' : 'Add Product'}
                    </Button>
                </form>
            </div>
            <Box className={classes.boxClass}>
                <Copyright />
            </Box>
        </Container>
    )
}
