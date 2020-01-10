/* eslint-disable import/no-named-as-default */
import React from "react";
import { Route, Switch, NavLink } from "react-router-dom";
import { Container } from "@material-ui/core";

import UsersPage from "./containers/UsersPage";
import CreateUserPage from "./containers/CreateUserPage";
import UpdateUserPage from "./containers/UpdateUserPage";
import NotFoundPage from "./NotFoundPage";

export default class App extends React.Component {
  render() {
    return (
      <Container maxWidth="md">
        <nav>
          <NavLink exact to="/">List Users</NavLink>
          {' | '}
          <NavLink exact to="/create-user">Create User</NavLink>
        </nav>

          <main>
            <Switch>
              <Route exact path="/" component={UsersPage} />
              <Route exact path="/create-user" component={CreateUserPage} />
              <Route exact path="/user-info/:userId" component={UpdateUserPage} />
              <Route component={NotFoundPage} />
            </Switch>
          </main>
      </Container>
    );
  }
}
