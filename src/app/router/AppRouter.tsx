import { useContext } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { AuthRouter } from "../views/auth/AuthRouter";
import { DashboardRouter } from "../views/dashboard/DashboardRouter";
import { Home } from "../views/dashboard/home/Home";
import { AuthContext } from '../views/store/context/AuthContext';
import { PrivateRouter } from "./PrivateRouter";

interface Context {
    dispatchUser?: any,
    user?: User
}

interface User {
    loggedIn: boolean
}

export function AppRouter() {
    const { user }: Context = useContext(AuthContext);
    return (
        <BrowserRouter >
            <Switch >
                <Route path='/auth' component={AuthRouter} />
                <PrivateRouter
                    loggedIn={user?.loggedIn}
                    component={DashboardRouter} />

                <Redirect to="dashboard/home" />
                <Route exact path="/home" component={Home} />
            </Switch>
        </BrowserRouter>
    );
}