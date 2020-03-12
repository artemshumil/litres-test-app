import React, {Component, MouseEvent} from 'react';
import { connect } from 'react-redux';
import {userActions} from "../../_actions/user.actions";
import {TData} from "../../_tools/types";
import Chart from "../Chart/Chart";

type ContentProps = {
    login: (username: string, password: string) => any
    register: (username: string, password: string) => any
    getData: () => void
    logout: () => void

    data_fetching: boolean
    loggedIn: boolean
    data: TData,
    message: string
}
type ContentState = {
    login: string
    pwd: string,
}

class Content extends React.Component<ContentProps, ContentState> {
    constructor(props: any) {
        super(props);

        this.tryLogin = this.tryLogin.bind(this);
        this.tryRegister = this.tryRegister.bind(this);
        this.tryGetData = this.tryGetData.bind(this);
        this.tryLogout = this.tryLogout.bind(this);
        this.fetchData = this.fetchData.bind(this);
    }
    dataFetchTimeout: any = -1;
    state = {
        login: 'qweqwe',
        pwd: 'qweqwe'
    };

    tryLogin (e: MouseEvent) {
        e.preventDefault();
        const { login, pwd } = this.state;
        if (login && pwd) {
            this.props.login(login, pwd);
        }

    }

    tryRegister (e: MouseEvent) {
        e.preventDefault();
        const { login, pwd } = this.state;
        if (login && pwd) {
            this.props.register(login, pwd);
        }
    }

    tryGetData () {
        return this.props.getData();
    }

    tryLogout (e: MouseEvent) {
        e.preventDefault();
        this.props.logout();
    }

    fetchData() {
        this.dataFetchTimeout = setTimeout(() => this.tryGetData(), 1000)
    };

    componentDidUpdate(prevProps: Readonly<ContentProps>, prevState: Readonly<ContentState>, snapshot?: any): void {
        const {loggedIn, data_fetching} = this.props;

        if (prevProps.loggedIn !== loggedIn && loggedIn)
            this.tryGetData();

        if (prevProps.data_fetching !== data_fetching) {
            if (loggedIn && !data_fetching) {
                this.fetchData();
            } else {
                clearTimeout(this.dataFetchTimeout);
            }
        }
    }

    render () {
        const {data_fetching, loggedIn, data, message} = this.props;
        return (<>
            {loggedIn ?
                <>
                    <div className="header">
                        {data_fetching ? 'Fetching Data' : ''}
                        <button className="action-button logout" onClick={this.tryLogout}>Logout</button>
                        {/*<button className="action-button" onClick={this.tryGetData}>Data</button>*/}
                    </div>
                    {data?.graphsArray ?
                        <Chart data={data} /> :
                        <div className="bad-data">
                            <div className="bad-data-header">Неверный формат данных</div>
                            {data}
                        </div>
                    }
                </> :
                <>
                    <div className="login-wrap">
                        <div className="login-wrap-header">Login / Register</div>
                        <div className="input-line">
                            <div className="input-line-name">Login</div>
                            <div className="input-line-value">
                                <input className="login-input" type="text" value={this.state.login} onChange={(e) => this.setState({login: e.target.value})}/>
                            </div>
                        </div>
                        <div className="input-line">
                            <div className="input-line-name">Login</div>
                            <div className="input-line-value">
                                <input className="login-input" type="password" value={this.state.pwd} onChange={(e) => this.setState({pwd: e.target.value})}/>
                            </div>
                        </div>
                        <div className="error-message">
                            {message ? message : ''}
                        </div>
                        <div className="login-wrap-buttons">
                            <button className="action-button" onClick={this.tryLogin}>Login</button>
                            <button className="action-button" onClick={this.tryRegister}>Register</button>
                        </div>
                    </div>
                </>
            }
        </>);
    }
}

function mapState(state: any) {
    const {data_fetching, loggedIn, data, message} = state;
    return {data_fetching, loggedIn, data, message};
}

const actionCreators = {
    login: userActions.login,
    logout: userActions.logout,
    register: userActions.register,
    getData: userActions.getData
};

const connectedContentPage = connect(mapState, actionCreators)(Content);

export {connectedContentPage as Content};
