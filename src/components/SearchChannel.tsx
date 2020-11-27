import { makeStyles } from "@material-ui/core";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { secondaryBackgroundColor } from "../configs/palette";
import { fetchChannels } from "../store/ducks/searchChannel/actionCreators";
import { selectChannels } from "../store/ducks/searchChannel/selectors";
import { SearchContent } from "./SearchContent";
import { OutlinedTextField } from "./styledComponents/OutlinedTextField";

const stylesSearch = makeStyles((theme) => ({
  navSearchField: {
    input: {
      height: 10,
    },
    height: 30,
    marginTop: 0,
    marginBottom: 25,
  },
  searchWrapper: {
    position: "fixed",
    top: 60,
    left: 38,
    width: 200,
    marginBottom: 20,
  },
  "@media (max-width: 1200px)": {
    searchWrapper: {
      position: "relative",
      top: 0,
      left: 0,
      width: "100%",
    },
  },
}));
export const SearchChannel = () => {
  const [searchText, setSearchText] = useState("");
  const classes = stylesSearch();

  const dispatch = useDispatch();
  const channels = useSelector(selectChannels);
  const serchTextHandler = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    event.persist();
    setSearchText(event.target.value);
  };
  useEffect(() => {
    dispatch(fetchChannels(searchText));
  }, [dispatch, searchText]);

  return (
    <div className={classes.searchWrapper}>
      <OutlinedTextField
        className={classes.navSearchField}
        value={searchText}
        type="text"
        fullWidth
        color="primary"
        InputLabelProps={{
          variant: "filled",
          shrink: true,
        }}
        autoComplete="off"
        inputProps={{
          form: {
            autocomplete: "off",
          },
        }}
        label="Search"
        name="search"
        variant="filled"
        onChange={serchTextHandler}
      />
      {channels.map((item) => (
        <div
          style={{
            background: secondaryBackgroundColor,
            borderRadius: 4,
            marginBottom: 10,
          }}
        >
          <SearchContent {...item} key={item.name} />
        </div>
      ))}
    </div>
  );
};
