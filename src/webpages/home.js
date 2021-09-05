
import React, { useState, useEffect } from 'react';
import { withStyles, makeStyles, useTheme } from "@material-ui/core/styles";
import PropTypes from 'prop-types';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';


import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';

const data = []
let numberDone = 1;
const useStyles = makeStyles((theme) => ({
    root: {
        flexShrink: 0,
        marginLeft: theme.spacing(2.5),
    },
}));

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white
    },
    body: {
        fontSize: 14
    }
}))(TableCell);

function TablePaginationActions(props) {
    const classes = useStyles();
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleFirstPageButtonClick = (event) => {
        onPageChange(event, 0);
    };

    const handleBackButtonClick = (event) => {
        onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
        onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
        onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <div className={classes.root}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
        </div>
    );
}

TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
};


const Home = () => {
    //const classes = useStyles2();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    const useStyles = makeStyles({
        table: {
            minWidth: 700
        }
    });
    const classes = useStyles();
    const [error] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [property, setProperty] = useState([]);

    async function goGetData() {
        try {
            let response = await fetch('http://localhost:8080/findAll');
            let result = await response.text();
            setProperty(JSON.parse(result))
            setIsLoaded(true);
        } catch (ex) {
            alert(ex);
            setIsLoaded(false);
        }
    }
    useEffect(() => {
        goGetData()
    }, [])
    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        if (isLoaded && numberDone === 1) {
            numberDone++
            property.forEach(property => {
                property.listingsOfProperty.forEach(list => {
                    data.push({
                        'property_Name': property.property_Name, 'address1': property.address1, 'address2': property.address2,
                        'city': property.city, 'state': property.state, 'listing_Name': list.listing_Name,
                        'is_Active': list.is_Active.toString(),
                        'listing_Date': list.listing_Date, 'price': list.price,
                    })
                });
            });
            console.log("data after its fixed for display")
            console.log(data)
        }
    }

    return (
        <div>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="custom pagination table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Property Name</StyledTableCell>
                            <StyledTableCell align="right">Address1</StyledTableCell>
                            <StyledTableCell align="right">Address2</StyledTableCell>
                            <StyledTableCell align="right">City</StyledTableCell>
                            <StyledTableCell align="right">State</StyledTableCell>
                            <StyledTableCell align="right">Listing Name</StyledTableCell>
                            <StyledTableCell align="right">Is Active</StyledTableCell>
                            <StyledTableCell align="right">Listing Date</StyledTableCell>
                            <StyledTableCell align="right">Price</StyledTableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(rowsPerPage > 0
                            ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : data
                        ).map((row) => (
                            <TableRow key={row.property_Name + row.listing_Date}>
                                <TableCell component="th" scope="row">
                                    {row.property_Name}
                                </TableCell>
                                <TableCell style={{ width: 160 }} align="right">
                                    {row.address1}
                                </TableCell>
                                <TableCell style={{ width: 160 }} align="right">
                                    {row.address2}
                                </TableCell>
                                <TableCell style={{ width: 160 }} align="right">
                                    {row.city}
                                </TableCell>
                                <TableCell style={{ width: 160 }} align="right">
                                    {row.state}
                                </TableCell>
                                <TableCell style={{ width: 160 }} align="right">
                                    {row.listing_Name}
                                </TableCell>
                                <TableCell style={{ width: 160 }} align="right">
                                    {row.is_Active}
                                </TableCell>
                                <TableCell style={{ width: 160 }} align="right">
                                    {row.listing_Date}
                                </TableCell>
                                <TableCell style={{ width: 160 }} align="right">
                                    {row.price}
                                </TableCell>

                            </TableRow>
                        ))}

                        {emptyRows > 0 && (
                            <TableRow style={{ height: 53 * emptyRows }}>
                                <TableCell colSpan={6} />
                            </TableRow>
                        )}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                colSpan={4}
                                count={data.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                SelectProps={{
                                    inputProps: { 'aria-label': 'rows per page' },
                                    native: true,
                                }}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                                ActionsComponent={TablePaginationActions}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
            <button onClick={event => window.location.href = '/newProperty'}>Add New Property</button>
        </div>
    );
}
export default Home;