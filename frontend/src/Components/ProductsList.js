import React, { useEffect, useState } from 'react'
import CssBaseline from '@material-ui/core/CssBaseline';
import { Link } from "react-router-dom";
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { withStyles, makeStyles, alpha } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputBase from '@material-ui/core/InputBase';
import { searchProduct, delProduct,fetchProducts} from '../Api/Products';

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

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 700,
  },
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
  headingClass: {
    marginTop: '40px',
    textAlign: 'center',
    padding: '10px'
  },
  inputRoot: {
    color: 'inherit',
    border: '1px solid',
    marginBottom: '10px',
    textAlign: 'right',
    float: 'right',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  }
}));

export default function ProductsList() {
  const classes = useStyles();
  const [products, setProducts] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [itemId, setItemId] = React.useState('');

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
   const result = await fetchProducts(); 
    setProducts(result);
  }

  const deleteProduct = async () => {
    const id = itemId;
    const result = await delProduct(id);
    if (result) {
      alert('Record deleted successfully.');
    }
    handleClose();
    getProducts();
  }
  const handleClickOpen = (id) => {
    setOpen(true);
    setItemId(id);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const searchHandle = async (event) => {
    let key = event.target.value;
    if (key) {     
      const result = await searchProduct(key);
      if (result) {
        setProducts(result);
      }
    } else {
      getProducts();
    }
  }
  return (
    <Container component="main" >
      <CssBaseline />
      <Typography component="h1" variant="h5" className={classes.headingClass}>
        Products List
      </Typography>
      <div className={classes.search}>
        <InputBase
          placeholder="Search…"
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          inputProps={{ 'aria-label': 'search' }}
          onChange={searchHandle}
        />
      </div>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Sr.No</StyledTableCell>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Price</StyledTableCell>
              <StyledTableCell>Category</StyledTableCell>
              <StyledTableCell>Company</StyledTableCell>
              <StyledTableCell>Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.length > 0 ? products.map((item, index) => (
              <StyledTableRow key={item._id}>
                <StyledTableCell>{index + 1}</StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  {item.name}
                </StyledTableCell>
                <StyledTableCell>{item.price}</StyledTableCell>
                <StyledTableCell>{item.category}</StyledTableCell>
                <StyledTableCell>{item.company}</StyledTableCell>
                <StyledTableCell>
                  <Link to={`updateProduct/${item._id}`}><EditIcon /></Link> |
                  <Link to="#" onClick={() => handleClickOpen(item._id)}><DeleteIcon /></Link>
                </StyledTableCell>
              </StyledTableRow>
            )) :
              <>
               <h3>No record found.</h3>
              </>
            }
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{" Are you sure to delete ?"}</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={deleteProduct} color="primary" autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
      <Box className={classes.boxClass}>
        <Copyright />
      </Box>
    </Container>

  )
}
