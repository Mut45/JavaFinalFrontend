import './App.css';
import React, { Component } from 'react';
import { Route, BrowserRouter, Switch, Redirect } from 'react-router-dom';
import CarSelection from './pages/car-selection/car-selection';
import Login from './pages/login/login';
import History from './pages/history/history'
import Register from './pages/register/register';
import Admin from './pages/admin/admin';
import ChangePassword from './pages/change-password/change-password';

export default class App extends Component {
    render() {
        
        return (
            <BrowserRouter>
                <Switch>
                    <Route path='/admin'>
                        <Admin history={this.props.history}/>
                    </Route>
                    <Route path='/change-password'>
                        <ChangePassword history={this.props.history}/>
                    </Route>
                    <Route path='/history'>
                        <History history={this.props.history}/>
                    </Route>
                    <Route path='/car-selection' history={this.props.history}>
                        <CarSelection />
                    </Route>
                    <Route path='/register' history={this.props.history}>
                        <Register />
                    </Route>
                    <Route path='/login' history={this.props.history}>
                        <Login />
                    </Route>
                    <Route path='/' render={() => {
                        return (
                            <Redirect to="login"></Redirect>
                        )
                    }} >
                    </Route>

                </Switch>
            </BrowserRouter>
        );
    }
}