import * as React from "react";
import Header from "../Header/Header";
import Summary from "../Summary/Summary";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import "./Complaints.css";

const header = [
  "Date Received",
  "Complaint ID",
  "Catergory",
  "Title",
  "Description",
  "Status",
  "Priority",
  "Area",
  "ZIP code",
];

const Complaints = () => {
  const [filters, setFilters] = React.useState({
    date: "Any",
    category: "All",
    priority: "All",
    status: "All",
    pincode: "All",
    search: "",
  });
  const [complaints, setComplaints] = React.useState([]);
  const [filteredComplaints, setFilteredComplaints] = React.useState([]);
  const [dropdownValues, setDropdownValues] = React.useState({
    category: ["All"],
    priority: ["All"],
    status: ["All"],
    pincode: ["All"],
  });
  const [searchText, setSearchText] = React.useState("");

  React.useEffect(() => {
    console.log(process.env.API_URL);
    fetch(process.env.API_URL + "api/complaints", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setComplaints(res);
        setFilteredComplaints(res);
      });
    Object.keys(dropdownValues).map((attribute) => {
      fetch(
        process.env.API_URL +
          "api/complaints/attribute/" +
          attribute +
          "/distinct"
      )
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          console.log(dropdownValues);
          setDropdownValues((prev) => ({
            ...prev,
            [attribute]: [...prev[attribute], ...res],
          }));
        });
    });
    console.log(dropdownValues);
  }, []);

  React.useEffect(() => {
    var filtered = complaints.slice();
    if (filters.search !== "") {
      fetch(process.env.API_URL + "api/complaints/search/" + filters.search)
        .then((res) => res.json())
        .then((res) => {
          setFilteredComplaints(res);
        });
    } else {
      Object.keys(filters).map((attribute) => {
        if (
          filters[attribute] !== "" &&
          ["All", "Any"].indexOf(filters[attribute]) === -1
        ) {
          console.log(filters[attribute]);
          filtered = filtered.filter(
            (complaint) => complaint[attribute] === filters[attribute]
          );
        }
      });
      setFilteredComplaints(filtered);
    }
  }, [filters]);

  return (
    <>
      <Header />
      <Summary />
      <div className="complaints-section">
        <div>
          <Paper
            elevation={4}
            style={{
              textAlign: "center",
              padding: "10px",
              backgroundColor: "#ededed",
            }}
          >
            <Stack direction="row" spacing={2} className="filters">
              <div className="filter">
                <div className="label">Date</div>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    value={filters.date}
                    onChange={(newValue) => {
                      setFilters({ ...filters, date: newValue });
                    }}
                    renderInput={(params) => (
                      <TextField
                        size="small"
                        {...params}
                        style={{ marginLeft: "10px", width: "120px" }}
                      />
                    )}
                  />
                </LocalizationProvider>
              </div>
              {Object.keys(dropdownValues).map((filter) => {
                return (
                  <div className="filter" key={filter}>
                    <div
                      className="label"
                      style={{ textTransform: "capitalize" }}
                    >
                      {filter}
                    </div>
                    <select
                      id="demo-simple-select-autowidth"
                      key={filter}
                      style={{ marginLeft: "8px", width: "100px" }}
                      value={filters[filter]}
                      onChange={(e) => {
                        setFilters({ ...filters, [filter]: e.target.value });
                      }}
                    >
                      {dropdownValues[filter].map((c) => {
                        return (
                          <option value={c} key={c}>
                            {c}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                );
              })}
              <div className="filter" style={{ float: "right" }}>
                <div className="search-box">
                  <input
                    type="text"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    style={{
                      width: "320px",
                      height: "93%",
                      border: "solid 0.4px #c0c0c0",
                    }}
                  />
                  <div
                    className="icon"
                    onClick={(e) =>
                      setFilters({ ...filters, search: searchText })
                    }
                  >
                    <SearchIcon fontSize="small" />
                  </div>
                </div>
              </div>
            </Stack>
          </Paper>
        </div>
        <div className="complaints">
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="customized table">
              <TableHead
                style={{ backgroundColor: "#32005c" }}
                className="table-header"
              >
                <TableRow>
                  {header.map((h) => {
                    return (
                      <TableCell align="left" style={{ color: "#fff" }} key={h}>
                        {h}
                      </TableCell>
                    );
                  })}
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredComplaints.map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                      "&:nth-of-type(even)": { backgroundColor: "#ededed" },
                    }}
                  >
                    <TableCell align="left">
                      {new Date(row.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell align="left">{row.complaint_id}</TableCell>
                    <TableCell align="left">{row.category}</TableCell>
                    <TableCell align="left">{row.title}</TableCell>
                    <TableCell align="left">{row.desc}</TableCell>
                    <TableCell align="left">{row.status}</TableCell>
                    <TableCell align="left">{row.priority}</TableCell>
                    <TableCell align="left">{row.address}</TableCell>
                    <TableCell align="left">{row.pincode}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </>
  );
};

export default Complaints;
