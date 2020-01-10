import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { CircularProgress } from '@material-ui/core';
import MUIDataTable from "mui-datatables";
import { deleteUser, listUsers, goToUserUpdatePage } from '../../actions/userActions';

class UsersPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isGettingUsers: false,
      listUsersError: '',
      isDeletingUser: false,
      deleteUserError: '',
      users: [],
    };

    this.onDeleteUser = this.onDeleteUser.bind(this);
    this.onClickUser = this.onClickUser.bind(this);
  }

  componentDidMount() {
    this.getUsers();
  }

  componentDidUpdate(prevProps) {
   if (this.props.isGettingUsers !== prevProps.isGettingUsers ||
       this.props.listUsersError !== prevProps.listUsersError ||
       this.props.isDeletingUser !== prevProps.isDeletingUser ||
       this.props.deleteUserError !== prevProps.deleteUserError) {
     this.setState({
        ...this.state,
        isGettingUsers: this.props.isGettingUsers,
        listUsersError: this.props.listUsersError,
        isDeletingUser: this.props.isDeletingUser,
        deleteUserError: this.props.deleteUserError,
        users: this.props.users,
     });
   }
  }

  getUsers() {
    if (this.state.isGettingUsers) {
      alert('Still Loading...');
    } else {
      this.props.actions.listUsers();
    }
  }

  onDeleteUser(rowsDeleted) {
    const delIdx = Object.keys(rowsDeleted.lookup)[0];
    const delId = this.state.users[delIdx].userId;

    this.props.actions.deleteUser(delIdx, delId);
  }

  onClickUser(rowData, rowMeta) {
    const idx = rowMeta.dataIndex;
    const id = this.state.users[idx].userId;

    this.props.actions.goToUserUpdatePage(idx, id);
  }

  render() {
    const { isGettingUsers, users, listUsersError } = this.state;
    const columns = [
       {
        name: "username",
        label: "Username",
        options: {
         filter: true,
         sort: true,
        }
       },
       {
        name: "name",
        label: "Name",
        options: {
         filter: true,
         sort: true,
        }
       },
     ];
    const options = {
      filterType: 'checkbox',
      selectableRows: 'single',
      onRowsDelete: this.onDeleteUser,
      onRowClick: this.onClickUser,
    };

    return isGettingUsers ? ( <CircularProgress />
      ) : listUsersError ? (
        <div className="error-msg">ERROR: {listUsersError}</div>
      ) : (
        <MUIDataTable
          title={'User List'}
          data={users}
          columns={columns}
          options={options}
        />
      );
  }
}

UsersPage.propTypes = { 
  actions: PropTypes.object.isRequired,
  users: PropTypes.array.isRequired,
  isGettingUsers: PropTypes.bool.isRequired,
  listUsersError: PropTypes.string.isRequired,
  isDeletingUser: PropTypes.bool.isRequired,
  deleteUserError: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  users: state.userPages.users,
  isGettingUsers: state.userPages.isGettingUsers,
  listUsersError: state.userPages.listUsersError,
  isDeletingUser: state.userPages.isDeletingUser,
  deleteUserError: state.userPages.deleteUserError,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ deleteUser, listUsers, goToUserUpdatePage }, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UsersPage);
