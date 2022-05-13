import { Switch, Route, Redirect } from "react-router-dom";
import { Login } from './login/login';

export function AuthRouter() {
    return (
        <switch>
            <Route exact path="/auth/login">
                <Login></Login>
            </Route>
            <Redirect to="/auth/login" />
        </switch>
    );
}