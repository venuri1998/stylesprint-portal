// components/BookingForm.js
import React, { useState, useEffect } from "react";
import {
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  TablePagination,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
  Select,
  MenuItem
} from "@mui/material";
import { addStock, getStocks } from "../../services/stockService";

const StockManagement = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // add stock
  const [openNew, setOpenNew] = React.useState(false);

  useEffect(() => {
    fetchData();
  }, [page, rowsPerPage]); // Call fetchData whenever page or rowsPerPage changes

  // table related
  const fetchData = async () => {
    try {
      const response = await getStocks({
        page: page + 1, // Adjust if your API uses 1-based indexing for pages
        limit: rowsPerPage,
      });
      setData(response); // Assuming the API returns an array of data
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset page to 0 when rowsPerPage changes
  };

  // add form related

  const handleClickOpenNew = () => {
    setOpenNew(true);
  };

  const handleCloseNew = () => {
    setOpenNew(false);
  };

  const addItems = async (data) => {
    try {
      const response = await addStock(data);
      setPage(0);
      console.log(response, 'this is the response getting ')
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div style={{ padding: "50px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          paddingBottom: "10px",
        }}
      >
        <Button variant="contained" onClick={handleClickOpenNew}>
          Add Item
        </Button>
      </div>
      <Dialog
        open={openNew}
        onClose={handleCloseNew}
        PaperProps={{
          component: "form",
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            let formJson = Object.fromEntries(formData.entries());
            formJson.cost_price = parseFloat(formJson.cost_price).toFixed(2)
            formJson.sale_price = parseFloat(formJson.sale_price).toFixed(2)
            formJson.quantity = parseFloat(formJson.quantity).toFixed(2)
            addItems(formJson)
            handleCloseNew();
          },
        }}
      >
        <DialogTitle>Add Item</DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                autoFocus
                required
                margin="dense"
                id="name"
                name="name"
                label="Name"
                type="text"
                fullWidth
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid item xs={6}>
              <Select
                style={{marginTop:'8px'}}
                margin="dense"
                required
                fullWidth
                size="small"
                name="category"
                labelId="category-new"
                id="demo-simple-select"
                label="Category"
                defaultValue="Needles"
              >
                <MenuItem value={"Needles"}>Needles</MenuItem>
                <MenuItem value={"Threads"}>Threads</MenuItem>
                <MenuItem value={"Fasterners"}>Fasterners</MenuItem>
                <MenuItem value={"Stabilizers"}>Stabilizers</MenuItem>
                <MenuItem value={"Fabric"}>Fabric</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={4}>
              <TextField
                autoFocus
                required
                margin="dense"
                id="cost_price"
                name="cost_price"
                label="Cost Price"
                type="text"
                fullWidth
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                autoFocus
                required
                margin="dense"
                id="sale_price"
                name="sale_price"
                label="Sale Price"
                type="text"
                fullWidth
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                autoFocus
                required
                margin="dense"
                id="quantity"
                name="quantity"
                label="Quantity"
                type="text"
                fullWidth
                variant="outlined"
                size="small"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseNew}>Cancel</Button>
          <Button type="submit">Save</Button>
        </DialogActions>
      </Dialog>
      <TableContainer style={{ padding: 5 }} component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Cost Price</TableCell>
              <TableCell>Sale Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.length ? (
              data?.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.id}</TableCell>{" "}
                  {/* Adjust property names based on your data */}
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.category}</TableCell>
                  <TableCell>{row.quantity}</TableCell>
                  <TableCell>{row.cost_price}</TableCell>
                  <TableCell>{row.sale_price}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell style={{ textAlign: "center" }} colSpan={6}>
                  No Data...
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]} // Customize as needed
        component="div"
        count={data?.length || 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default StockManagement;
