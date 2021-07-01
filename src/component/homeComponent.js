import React, { useState, useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import "../App.css";
import SearchBar from "material-ui-search-bar";
import IconButton from "@material-ui/core/IconButton";

import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

import { Input } from "@material-ui/core";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import { useDispatch, useSelector } from "react-redux";
//import actions from dictionary actions
import { addWord } from "../store/dictionary/dictionaryActions";
import { getWord } from "../store/dictionary/dictionaryActions";
import { fetchAllWords } from "../store/dictionary/dictionaryActions";
import DictionaryService from "../ApiServices/DictionaryService";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";

const useCss = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

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

export default function HomeComponent() {
  const classes = useStyles();
  const style = useStyle();
  const css = useCss();
  const [words, setWords] = useState({ result: [] });
  const [searchedWords, setSearchedWords] = useState({ result: [] });
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [show, setShow] = useState(false);
  const [dialogueContent, setDialogueContent] = useState({});

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const setInputedValue = (value) => setInputValue(value);
  const dispatch = useDispatch();
  // selectors
  const allWords = useSelector((state) => state.dictionary.allWords);
  const wordDetail = useSelector((state) => state.dictionary.word);
  useEffect(() => {
    //dispatch add fetchAllWords action
    dispatch(fetchAllWords());
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (allWords && allWords.words.length > 0) {
      // call setWords and setSearchedWords function to set value
      setWords({ result: allWords.words });
      setSearchedWords({ result: allWords.words });
    }
  }, [allWords]);
  useEffect(() => {
    setDialogueContent(wordDetail);
  }, []);
  const handleClick = async (word) => {
    dispatch(getWord(word));
    setShow(true);
  };
  const onSearch = (value) => {
    // filter on the basis of value enter in search bar
    setSearchedWords({
      result: words.result.filter((item) =>
        item.id.toLowerCase()?.includes(value.toLowerCase())
      ),
    });
  };
  const onSubmit = async (e) => {
    //handle form submit
    e.preventDefault();
    //dispatch add word action and pass word input word from useState
    dispatch(addWord(inputValue));
    //call setInputValue function to set value to empty
    setInputValue("");
    // call setOpen function to set value to false to close the dialogue box
    setOpen(false);
  };
  const handleShow = () => {
    setShow(false);
  };
  return (
    <div>
      <SearchBar
        onChange={(newValue) => onSearch(newValue)}
        placeholder="Vocab"
        style={{ color: "white", backgroundColor: "#5d1948" }}
      />
      {searchedWords.result.map((item) => (
        <div className={classes.root} onClick={() => handleClick(item.id)}>
          <Grid container>
            <Grid item xs={12} style={{ textAlign: "left" }}>
              <Paper
                className={classes.paper}
                style={{ "font-weight": "bold" }}
              >
                {item.id}
              </Paper>
              <Paper className={classes.paper}>{item.definition}</Paper>
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
          <Button onClick={(e) => onSubmit(e)} color="primary" autoFocus>
            Add
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog fullScreen open={show} TransitionComponent={Transition}>
        <DialogTitle>
          {dialogueContent.id}
          <IconButton
            edge="end"
            color="inherit"
            onClick={handleShow}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <Grid container>
          <Grid item xs={12} style={{ textAlign: "left" }}>
            <Paper className={classes.paper}>
              {dialogueContent.lexicalCategory}
            </Paper>
            <Paper className={classes.paper}>
              {dialogueContent.definition}
            </Paper>
            <Paper className={classes.paper}>{dialogueContent.phrase}</Paper>
            <Paper className={classes.paper}>{dialogueContent.example}</Paper>
            <Paper className={classes.paper}>{dialogueContent.synonym}</Paper>
          </Grid>
        </Grid>
      </Dialog>
    </div>
  );
}
