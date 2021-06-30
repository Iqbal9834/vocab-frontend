import React from 'react';
import SearchBar from 'material-ui-search-bar';
import LinearProgress from '@material-ui/core/LinearProgress';
// import appStore from './appStore';

// this is re-rendered whenever the relevant parts of the used data stores change
const NavBar = () => (
  <div className="searchbar">
    <SearchBar
    //   onRequestSearch={appStore.fetchBeers}
      placeholder="Vocab"
      style={{color: "white", backgroundColor: '#5d1948'}} 
    />
  </div>
);

export default NavBar;
