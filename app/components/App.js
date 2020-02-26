import '../styles/application.scss';
import {connectData} from '../services/tickerService';
import React, {PureComponent} from 'react';
import { socket } from '../services/tickerService';

class App extends PureComponent {
    constructor() {
        super();
        this.state = {
            data: [],
            Ticker: 'AAPL',
            backgroundColorPrice: '#fff',
            backgroundColorChange: '#fff',
            backgroundColorPercent: '#fff',
            backgroundColorDividend: '#fff',
            backgroundColorYield: '#fff',
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
    backgoundColorChange = (previousValue, nextValue, backgroundColorValue) => {
        if (Number(previousValue) < Number(nextValue)) {
            this.setState({ [backgroundColorValue]: '#4bc986' });
        } else if (Number(previousValue) > Number(nextValue)) {
            this.setState({ [backgroundColorValue]: '#cf5f5f ' });
        }
    }
    componentDidUpdate = (prevProps, prevState) => {
        this.backgoundColorChange(
            prevState.data.price,
            this.state.data.price,
            'backgroundColorPrice');

        this.backgoundColorChange(
            prevState.data.change,
            this.state.data.change,
            'backgroundColorChange');

        this.backgoundColorChange(
            prevState.data.change_percent,
            this.state.data.change_percent,
            'backgroundColorPercent');

        this.backgoundColorChange(
            prevState.data.dividend,
            this.state.data.dividend,
            'backgroundColorDividend');

        this.backgoundColorChange(
            prevState.data.yield,
            this.state.data.yield,
            'backgroundColorYield');
    }
    render() {
        return (
                <div className="stock-ticker">
                    <div className="ticker-name">
                        <b>Ticker: </b>
                    </div>
                    <div className="ticker-value">
                       {this.state.data.ticker}
                    </div>
                    <div className="exchange-name">
                        <b>Exchange: </b>
                    </div>
                    <div className="exchange-value">
                       {this.state.data.exchange}
                    </div>
                    <div className="price-name">
                        <b>Price: </b>
                    </div>
                    <div className="price-value" style = {{backgroundColor: this.state.backgroundColorPrice }}>
                        {this.state.data.price}
                    </div>
                    <div className="change-name">
                        <b>Change: </b>
                    </div>
                    <div className="change-value" style = {{backgroundColor: this.state.backgroundColorChange }}>
                        {this.state.data.change}
                    </div>
                    <div className="percent-change-name">
                        <b>Change percent: </b>
                    </div>
                    <div className="percent-change-value" style = {{backgroundColor: this.state.backgroundColorPercent }}>
                        {this.state.data.change_percent}
                    </div>
                    <div className="last-trade-time-name">
                        <b>Last Trade Time: </b>
                    </div>
                    <div className="last-trade-time-value">
                      {this.state.data.last_trade_time}
                    </div>
                    <div className="dividend-name">
                        <b>Dividend: </b>
                    </div>
                    <div className="dividend-value" style = {{backgroundColor: this.state.backgroundColorDividend }}>
                        {this.state.data.dividend}
                    </div>
                    <div className="yeild-name">
                        <b>Yield: </b>
                    </div>
                    <div className="yeild-value" style = {{backgroundColor: this.state.backgroundColorYield }}>
                        {this.state.data.yield}
                    </div>
                </div>
        );
    }
}

export default App;
