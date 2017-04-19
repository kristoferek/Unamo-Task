import React from 'react';
import {
  Logo,
  Domain
} from './component.jsx';
import {Navigation} from './form.jsx'


// generates Header with logo and domain link
export class Header extends React.Component {
    render() {
        return <div className="row header">
          <Logo />
          <Domain />
        </div>
    }
}

// generates Footer (this time empty)
export class Footer extends React.Component {
    render() {
        return <div className="row footer"></div>
    }
}

/* Generates table of records with removing feature. */

class UsersTable extends React.Component {
  constructor(props){
    super(props);
  }

  constructRows = (array)=>{
    let rows = [];
    array.forEach((user, index) =>{
      rows.push(<tr key={index} id={index}>
        <td>
          <div className="lp">{index+1}</div>
        </td>
        <td>
          {user.name}
        </td>
        <td>
          {user.email}
        </td>
        <td>
          <img className="remove" src="./images/delete.png" onClick={(e)=>this.props.removeRecord(event, index)}/>
        </td>
      </tr>);
    });
    const noUsers = <td colSpan={4} className="emptyTable">
      This list is empty. <br />
      Please add some users!
    </td>;
    return rows.length==0 ? noUsers : rows;
  }

  render(){
    // console.log("UsersTable", this.state);
    return <table>
      <thead>
        <tr>
          <th>LP</th>
          <th>USER</th>
          <th>EMAIL</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {this.constructRows(this.props.records)}
      </tbody>
    </table>
  }
}

/* *** Generates user list with ability to add, remove new users *** */
/* *** acccording to userLimit and userArray props *** */
export class UserList extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      records: {
        id: "...",
        name: "Loading name...",
        email: "Loading email...",
      },
      currentID: 1,
      currentUserListLength: 0,
      userLimit: this.props.userLimit,
      userAddedSuccess: false,
    };
  }

  // Constructs this.state.usrArr according to passed array and length limit
  initializeUserArr = (array, limit) => {
    let arrayTemp = [];

    // fills arrayTemp with id, name and email form array until its end or reached limit
    for (var i = 0; i < (array.length); i++) {
      arrayTemp.push({
        id: i,
        name: array[i].name,
        email: array[i].email,
      });
    }

    // sets this.state userArr and higherID
    this.setState({
      records: arrayTemp,
      currentID: i,
      currentUserListLength: i
    });
  }

  // Initialises this.state userArr and higherID according to userLimit
  componentWillMount() {
    this.initializeUserArr(this.props.userList, this.props.userLimit);
  }

  // Checks state info about successful adding user to the list to show message
  userAddedSuccess = () =>{
    return this.state.userAddedSuccess
  }

  // Checks if user list length is lower then the userLimit
  listLimitExceeded = ()=>{
    return this.state.currentUserListLength >= this.state.userLimit;
  }

  // Toggles added user success state
  handleUserAddedSuccess = (logical) =>{
    // console.log("this.state.displayInput", this.state.displayInput);
    this.setState({
      userAddedSuccess: logical,
    })
  }

  /* ***Adds records to the list.Checks if record exists*** */
  /* ***in list and if so adds it at the beginning*** */
  addNewRecord = (record) => {
    let existInArray = false;

    // Checks if record email already exists in the list
    for (var i = 0; i < this.state.records.length; i++) {
      if (this.state.records[i].email === record.email) {
        existInArray = true;
        break;
      }
    }

    // If record email is unique adds record at the beginning of the list
    if (existInArray === false) {
      let arrayTemp = this.state.records.slice();
      arrayTemp.splice(0,0,record);
      this.setState({
        records: arrayTemp,
        currentID: record.id,
        currentUserListLength: arrayTemp.length,
      });
      this.handleUserAddedSuccess(true)
    } else {
      console.log('Błąd. Ten record juz jest w tabeli:', record);
    }
  }

  /* Removes record from records (usersList) */
  removeRecord = (event, index) =>{
    console.log("RemovRecord index:", index);
    let arrayTemp = this.state.records.slice();
    arrayTemp.splice(index,1);
    this.setState({
      records: arrayTemp,
      currentUserListLength: arrayTemp.length,
    });
    this.handleUserAddedSuccess(false);

  }

/* ***Generates user list table with buttons above to add new users*** */
  // Navigation handles new user form
  // UserTable handles user list allowing removing and adding users
  render() {
    // console.log("UserList", this.state);
    return <div className="row userList">
      <Navigation
        currentID={this.state.currentID}

        addNewRecord={this.addNewRecord}
        userAddedSuccess={this.userAddedSuccess}
        listLimitExceeded={this.listLimitExceeded}
        handleUserAddedSuccess={this.handleUserAddedSuccess}
      />

      <UsersTable
        records={this.state.records}
        removeRecord={this.removeRecord}
      />
    </div>
  }
}
