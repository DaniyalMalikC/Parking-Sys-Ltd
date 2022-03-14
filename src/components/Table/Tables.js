import React, { useState, useContext, useEffect } from "react";

//Style
import { makeStyles, useTheme } from "@material-ui/core/styles";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import Avatar from "@material-ui/core/Avatar";

//Style Icon
import IconButton from "@material-ui/core/IconButton";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";

//Assets
import Profile from "../../assets/Profile.png";

//Component
//--> Button
import Button from "../Button/Button";

//Context
import { AgentActionContext } from "../../context/AgentContext";

const useStyles = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));

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
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

export default function Tables(props) {
  const {
    headers,
    rows,
    submitLabel,
    handleSubmit,
    deleteLabel,
    handleDelete,
    reassignLabel,
    handleReassign,
  } = props;

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div className="table">
      <Table>
        <TableHead>
          <TableRow>
            {headers.map((header) => (
              <TableCell key={header}>{header}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.keys(rows).length === 0 ? (
            <TableRow>
              <TableCell align="center" colSpan={headers.length}>
                List is Empty!
              </TableCell>
            </TableRow>
          ) : (
            rows.map((row, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Avatar
                    alt={row.name}
                    src={row.avatar ? row.avatar : Profile}
                  />
                </TableCell>
                {row.name ? <TableCell>{row.name}</TableCell> : null}
                {row.email ? <TableCell>{row.email}</TableCell> : null}
                {row.phoneNo ? <TableCell>{row.phoneNo}</TableCell> : null}
                {row.address ? <TableCell>{row.address}</TableCell> : null}
                {row.agentID ? <AgentDetail data={row.agentID} /> : null}
                {row.taskAssign ? (
                  <TableCell>{row.taskAssign}</TableCell>
                ) : null}
                {row.taskdone ? <TableCell>{row.taskdone}</TableCell> : null}

                {handleReassign ? (
                  <TableCell>
                    <Button
                      label={reassignLabel ? reassignLabel : "Reassign"}
                      onClickEvent={() =>
                        handleReassign(
                          row.name,
                          row.phoneNo,
                          row.clientID,
                          row.agentID,
                        )
                      }
                      style={{
                        background: "#ff961e",
                        color: "#6b3900",
                        width: 120,
                      }}
                    />
                  </TableCell>
                ) : null}
                {handleSubmit ? (
                  <TableCell>
                    <Button
                      label={submitLabel ? submitLabel : "Submit"}
                      onClickEvent={() =>
                        row.email && row.address
                          ? handleSubmit(
                              row.name,
                              row.phoneNo,
                              row.email,
                              row.address,
                            )
                          : row.clientID
                          ? handleSubmit(row.name, row.phoneNo, row.clientID)
                          : handleSubmit(row.name, row.phoneNo)
                      }
                      styleType="primary"
                      width={120}
                    />
                  </TableCell>
                ) : null}
                {handleDelete ? (
                  <TableCell>
                    <Button
                      label={deleteLabel ? deleteLabel : "Remove"}
                      onClickEvent={() => handleDelete(row.phoneNo)}
                      style={{
                        background: "#9f121a",
                        color: "#fff",
                        width: 120,
                      }}
                    />
                  </TableCell>
                ) : null}
              </TableRow>
            ))
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10]}
              colSpan={headers.length}
              count={rows.length > 0 ? rows.length : 0}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: { "aria-label": "rows per page" },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}

const AgentDetail = (props) => {
  const { data } = props;

  //Agent Name
  const [agent, setAgent] = useState({});

  //Context
  const { agentsDetails } = useContext(AgentActionContext);

  if (data) {
    agentsDetails(data, setAgent);
  }
  return <TableCell>{agent.name}</TableCell>;
};
