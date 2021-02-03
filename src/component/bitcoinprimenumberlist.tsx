import { Button, Paper, TextField } from "@material-ui/core";
import axios from "axios";
import React from "react";
import { Component } from "react";
import programdata from "../program/programdata";
import configData from "../shared/configdata.json";

interface DateConstructor {
    fromDate: Date,
    toDate: Date,
    rowsdata: any
}

type props={
    data : string;
}

export class Bitcoinprimenumberlist extends Component<props, DateConstructor>{

    state: any;
    callClass: programdata;

    constructor(props: props ) {
        super(props);
        this.state = {
            fromDate: "2021-01-01",
            toDate: "2021-01-31",
            rowsdata: [{}]

        };

        console.log(props.data)
        
        //class instance
        this.callClass = new programdata();
        this.handleChangefrom = this.handleChangefrom.bind(this);
        this.handleChangeto = this.handleChangeto.bind(this);
        //calling below method to show list
        this.GetbitcoinList();

    }

    //date change event to set from date
    private handleChangefrom(date: any) {
        this.setState({
            fromDate: date.target.value,
        });
    }

    //date change event to set to date
    private handleChangeto(date: any) {
        this.setState({
            toDate: date.target.value,
        });
    }

    //call when user click on go button 
    //used to fetch bit coin price and prime numbers
    GetbitcoinList = async () => {
        let url =  configData.BITCOIN_API_URL ;//bit coin url we get from config file
        let input = {
            'start': this.state.fromDate,
            'end': this.state.toDate
        }
        const result: any = await axios.get(url,{ params: input });
        const data: any = Object.entries(result.data.bpi);
        var datalist: any = [];
        data.forEach((item: any, index: number) => {
            datalist.push(
                {
                    "date": this.callClass.getdateString(item[0],""),
                    "price": item[1],
                    "number": this.callClass.getPrimeNumbers((item[1]))
                }
            )
        });

        this.setState({
            rowsdata: datalist, // setting data list to render in html
        });
    }

    //html code section to render

    render() {
        const { fromDate } = this.state.fromDate;
        const { toDate } = this.state.toDate;
        return (
            <Paper>
                <div style={{ textAlign: "center" }}>
                    <TextField
                        id="date"
                        label="From Date"
                        type="date"
                        defaultValue="2021-01-01"
                        value={fromDate}
                        className="textField"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        inputProps={{
                            max: this.callClass.getdateString(new Date(),"yeardate") ,
                            
                          }}
                        onChange={this.handleChangefrom}
                    />

                    <TextField
                        id="todate"
                        label="To Date"
                        type="date"
                        defaultValue="2021-01-31"
                        value={toDate}
                        className="textField"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        inputProps={{
                            max: this.callClass.getdateString(new Date(),"yeardate") ,
                            
                          }}
                        onChange={this.handleChangeto}
                    />
                    <Button variant="contained" color="primary" className="postbtn" onClick={this.GetbitcoinList}>Go</Button>
                </div>

                <div style={{ height: 400, width: '100%' }} className="tbloverflow" >
                    <table className="table" >
                        <thead style={{ backgroundColor: "#3f51b5", color: "white" }}>
                            <th>Date</th>
                            <th>Price</th>
                            <th>Prime Number</th>
                        </thead>

                        <tbody>
                            {this.state.rowsdata && this.state.rowsdata.map(function (record: any, key: any) {
                                return (
                                    <tr key={key}><td>{record.date}</td><td>{record.price}</td><td>{record.number}</td></tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>

            </Paper>

        )
    }
}

export default Bitcoinprimenumberlist