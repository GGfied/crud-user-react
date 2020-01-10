import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { CircularProgress, Button, TextField } from '@material-ui/core';
import { createUser } from '../../actions/userActions';

class CreateUserPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isCreatingUser: false,
      createUserError: '',
      user: {},
    };

    this.onUsernameChange = this.onUsernameChange.bind(this);
    this.onNameChange = this.onNameChange.bind(this);
    this.onCreateUser = this.onCreateUser.bind(this);
  }

  componentDidMount() {
  }

  componentDidUpdate(prevProps) {
   if (this.props.isCreatingUser !== prevProps.isCreatingUser ||
       this.props.createUserError !== prevProps.createUserError) {
     this.setState({
        ...this.state,
        isCreatingUser: this.props.isCreatingUser,
        createUserError: this.props.createUserError,
        user: this.props.user,
     });
   }
  }

  onUsernameChange(e) {
    this.setState({
      ...this.state,
      user: {
        ...this.state.user,
        username: e.target.value,
      }
    });
  }

  onNameChange(e) {
    this.setState({
      ...this.state,
      user: {
        ...this.state.user,
        name: e.target.value,
      }
    });
  }

  onCreateUser(e) {
    e.preventDefault();

    if (this.state.isCreatingUser) {
      alert('Still Creating...');
    } else {
      this.props.actions.createUser(this.state.user.username, this.state.user.name);
    }
  }

  render() {
    const { isCreatingUser, createUserError } = this.state;

    return isCreatingUser ? ( <CircularProgress />
      ) : createUserError ? (
        <div className="error-msg">ERROR: {createUserError}</div>
      ) : (
      <section>
        <h1>Create User</h1>
        <form>
          <TextField id="filled-basic" label="Username" variant="filled" required onChange={this.onUsernameChange} />
          <br />
          <TextField id="filled-basic" label="Name" variant="filled" required onChange={this.onNameChange} />
          <br /><br />
          <Button variant="contained" color="primary" onClick={this.onCreateUser}>Create User</Button>
        </form>
      </section>
    );
  }
}

CreateUserPage.propTypes = { 
  actions: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  isCreatingUser: PropTypes.bool.isRequired,
  createUserError: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  user: state.userPages.user,
  isCreatingUser: state.userPages.isCreatingUser,
  createUserError: state.userPages.createUserError,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ createUser }, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateUserPage);
