import '../styles/application.scss';
import {connectData} from '../services/tickerService';
import React, {PureComponent} from 'react';
import { socket } from '../services/tickerService';

class App extends PureComponent {
    constructor() {
        super();
        this.state = {
            data: [],
            Ticker: 'AAPL'
        };
    }

    getData = (ticker) => {
        connectData(ticker, response => {
            this.setState({ data: response });
        });
    }

    componentDidMount = () => {
        this.getData(this.state.Ticker);
    }

    componentWillUnmount = () => {
        socket.close();
    }
    render() {
        return (
            <div className="container">
                <div className="stock-ticker">
                    <div className="ticker">
                        <b>Ticker: </b>{this.state.data.ticker}
                    </div>
                    <div className="exchange">
                        <b>Exchange: </b>{this.state.data.exchange}
                    </div>
                    <div className="price">
                        <b>Price: </b>{this.state.data.price}
                    </div>
                    <div className="change">
                        <b>Change: </b>{this.state.data.change}
                    </div>
                    <div className="percent-change">
                        <b>Change percent: </b>{this.state.data.change_percent}
                    </div>
                    <div className="last-trade-time">
                        <b>Last Trade Time: </b>{this.state.data.last_trade_time}
                    </div>
                    <div className="dividend">
                        <b>Dividend: </b>{this.state.data.dividend}
                    </div>
                    <div className="yeild">
                        <b>Yield: </b>{this.state.data.yield}
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
