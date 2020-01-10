import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { CircularProgress, Button, TextField } from '@material-ui/core';
import { getUser, updateUser } from '../../actions/userActions';

class UpdateUserPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isUpdatingUser: false,
      updateUserError: '',
      isGettingUser: false,
      getUserError: '',
      user: {},
    };

    this.onUsernameChange = this.onUsernameChange.bind(this);
    this.onNameChange = this.onNameChange.bind(this);
    this.onUpdateUser = this.onUpdateUser.bind(this);
  }

  componentDidMount() {
    this.getUser(this.props.match.params.userId);
  }

  componentDidUpdate(prevProps) {
   if (this.props.isUpdatingUser !== prevProps.isUpdatingUser ||
       this.props.updateUserError !== prevProps.updateUserError ||
       this.props.isGettingUser !== prevProps.isGettingUser ||
       this.props.getUserError !== prevProps.getUserError) {
     this.setState({
        ...this.state,
        isUpdatingUser: this.props.isUpdatingUser,
        updateUserError: this.props.updateUserError,
        isGettingUser: this.props.isGettingUser,
        getUserError: this.props.getUserError,
        user: this.props.user,
     });
   }
  }

  getUser(userId) {
    this.props.actions.getUser(userId);
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

  onUpdateUser(e) {
    e.preventDefault();

    if (this.state.isUpdatingUser) {
      alert('Still Updating...');
    } else {
      this.props.actions.updateUser(this.state.user.userId, this.state.user.username, this.state.user.name);
    }
  }

  render() {
    const { isGettingUser, getUserError, isUpdatingUser, user, updateUserError } = this.state;

    return (isGettingUser || isUpdatingUser || user === {}) ? ( <CircularProgress />
      ) : (getUserError || updateUserError) ? (
        <div className="error-msg">ERROR: {getUserError}{updateUserError}</div>
      ) : (
      <section>
        <h1>Update User (ID: {user.userId})</h1>
        <form>
          <TextField id="filled-basic" label="Username" variant="filled" onChange={this.onUsernameChange} value={user.username}/>
          <br />
          <TextField id="filled-basic" label="Name" variant="filled" onChange={this.onNameChange} value={user.name}/>
          <br /><br />
          <Button variant="contained" color="primary" onClick={this.onUpdateUser}>Update User</Button>
        </form>
      </section>
    );
  }
}

UpdateUserPage.propTypes = {
  match: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  isGettingUser: PropTypes.bool.isRequired,
  getUserError: PropTypes.string.isRequired,
  isUpdatingUser: PropTypes.bool.isRequired,
  updateUserError: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  user: state.userPages.user,
  isGettingUser: state.userPages.isGettingUser,
  getUserError: state.userPages.getUserError,
  isUpdatingUser: state.userPages.isCreatingUser,
  updateUserError: state.userPages.createUserError,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ getUser, updateUser }, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdateUserPage);
