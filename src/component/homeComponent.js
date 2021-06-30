import React, { useState, useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import "../App.css";
import SearchBar from "material-ui-search-bar";

import DictionaryService from "../ApiServices/DictionaryService";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

import { Input } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: 20,
  },
  paper: {
    fontFamily: "Kumbh Sans",
    fontSize: 20,
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
}));
const useStyle = makeStyles((theme) => ({
  fab: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    backgroundColor: "#5d1948",
  },
}));

export default function AutoGridNoWrap() {
  const classes = useStyles();
  const style = useStyle();
  const [words, setWords] = useState({ result: [] });
  const [searchedWords, setSearchedWords] = useState({ result: [] });
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const setInputedValue = (value) => setInputValue(value);
  useEffect(() => {
    const fetchData = async () => {
      const queryResult = await DictionaryService.listWords();
      const result = queryResult.data.data;
      setWords({ result: result.words });
      setSearchedWords({ result: result.words });
    };
    fetchData();
  }, []);
  const onSearch = (value) => {
    setSearchedWords({
      result: words.result.filter((item) => item.id?.includes(value)),
    });
  };
  const onSubmit = async () => {
    console.log(inputValue);
    const response = await DictionaryService.addWord(inputValue);
    setOpen(false);
  };
  return (
    <div>
      <SearchBar
        onChange={(newValue) => onSearch(newValue)}
        placeholder="Vocab"
        style={{ color: "white", backgroundColor: "#5d1948" }}
      />
      {searchedWords.result.map((item) => (
        <div className={classes.root}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper
                className={classes.paper}
                style={{ "font-weight": "bold" }}
              >
                {item.id}
              </Paper>
              <Paper className={classes.paper}>{item.example}</Paper>
            </Grid>
          </Grid>
        </div>
      ))}
      <Fab aria-label="add" className={style.fab}>
        <AddIcon onClick={handleClickOpen} />
      </Fab>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <p>Add to Dictionary</p>
          <Input
            placeholder="New word"
            onChange={(e) => setInputedValue(e.target.value)}
          ></Input>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={onSubmit} color="primary" autoFocus>
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
