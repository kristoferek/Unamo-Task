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
        return <div className="row footer">

        </div>
    }
}

/** Generates limited table of records with ability to remove them. */
/** On props update adds new record at the beginning and fires handleListLength */
class UsersTable extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      records: this.props.records,
      newRecord: this.props.newRecord,
    };
  }

  render(){
    console.log("userlislength", this.state.records.length);
    const row = [];
    let arr = this.state.records.slice();
    arr.forEach((user, index) =>{
      row.push(<tr key={index} id={index}>
        <td>
          {index+1}
        </td>
        <td>
          {user.name}
        </td>
        <td>
          {user.email}
        </td>
        <td>
          <div className="remove" onClick={(event, index) =>{
            this.props.removeRecord(event, index);
            }}>x</div>
        </td>
      </tr>);
    });

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
        {row}
      </tbody>
    </table>
  }
}

/** Generates user list with ability to add, remove new users acccording to userLimit and userArray props */
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
      newUser: {
        id: undefined,
        name: undefined,
        email: undefined,
      }
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

  // Checks if record exists in list and if so adds it an the beginning
  addNewRecord = (record) => {
    let existInArray = false;
    for (var i = 0; i < this.state.records.length; i++) {
      if (this.state.records[i].email === record.email) {
        existInArray = true;
        break;
      }
    }

    if (existInArray === false) {
      let arrayTemp = this.state.records.slice();
      arrayTemp.splice(0,0,record);
      this.setState({
        records: arrayTemp
      }, this.props.handleListLength(this.state.records.length))
      this.props.handleUserAddedSuccess();

    } else {
      console.log('Błąd. Ten record juz jest w tabeli:', record);
    }
  }

  // On props update fires addNewRecord() and fires handleListLength
  componentWillReceiveProps(nextProps) {
    this.addNewRecord(nextProps.newRecord);
  }

  // Removes record from records (usersList)
  removeRecord = (e, index) =>{
    let arrayTemp = this.state.records.slice();
    arrayTemp.splice(index,1);
    this.setState({
      records: arrayTemp
    }, this.props.handleListLength(this.state.records.length));
  }

  // Updates this.state newUser with passed user and increases currentID by 1
  handleNewUser = (user) =>{
    this.setState({
      newUser: user,
      currentID: user.id,
    })
  }

  handleUserAddedSuccess = () =>{
    this.setState({
      userAddedSuccess: true
    })
  }

  handleUserAddedReset = () =>{
    this.setState({
      userAddedSuccess: false
    })
  }

  // Cares about actual this.state list length
  handleListLength = (number)=>{
    this.setState({
      currentUserListLength: number,
    })
  }

  // Generates user list table with buttons above to add new users
  // Navigation handles new user form and fires handleNewUser if correct input and userLimit not exceeded
  // UserTable handles userList allowing removing users and adding if this.state.newUser changes
  render() {
    console.log("UserList", this.state);
    return <div className="row userList">
      <Navigation
        currentID={this.state.currentID}
        limit={this.state.userLimit}
        currentUserListLength={this.state.currentUserListLength}
        userAddedSuccess={this.state.userAddedSuccess}
        handleNewUser={this.handleNewUser}
        handleListLength={this.handleListLength}
        handleUserAddedReset={this.handleUserAddedReset}/>

      <UsersTable
        records={this.state.records}
        newRecord={this.state.newUser}
        limit={this.state.userLimit}
        handleListLength={this.handleListLength}
        handleUserAddedSuccess={this.handleUserAddedSuccess}/>
    </div>
  }
}
