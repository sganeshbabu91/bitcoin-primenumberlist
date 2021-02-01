import { AppBar, Container, Typography } from '@material-ui/core';
import React, { Component } from 'react';
import Bitcoinprimenumberlist from './component/bitcoinprimenumberlist';
import './App.css';
class App extends Component {
  render() {
    

  var randomQuotes: string= "React";
  return (
    <Container maxWidth="lg">
      <br />
      <AppBar position="static" color="inherit" >
      <Typography variant="h3" align="center" style={{backgroundColor : "#3f51b5" , color:"white"}} >
        Bit Coin Price List
      </Typography>
      </AppBar>
      <Bitcoinprimenumberlist  data ={randomQuotes}/>
    </Container>
  );
}
}

export default App;
