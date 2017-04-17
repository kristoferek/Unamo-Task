import React from 'react';
import {
  SuccessMessage,
  WarningMessage,
  WarningValidateEmail,
  WarningValidateName
} from './component.jsx';

export class Button extends React.Component {
  constructor(props){
    super(props);
    this.state={
      text: this.props.text,
      icon: this.props.icon ? this.props.icon : "",
      inverse: this.props.inverse,
      disable: this.props.disable,
      actualClass: "button"
    }
  }

  setClass = (newState)=>{
    let classVar="button";
    newState.inverse ? classVar = classVar + " inverse" : null;
    newState.disable ? classVar= classVar + " disabled" : null;
    this.setState({
      actualClass: classVar
    });
  }

  componentWillMount(){
    this.setClass(this.props);
    console.log("Nextprops button ", this.props);
  }

  componentWillReceiveProps(nextProps){
    this.setClass(nextProps);
    console.log("Nextprops button ", nextProps);
  }

  render() {
    console.log("State button ", this.state);
    return <div
      className={this.state.actualClass}
      onClick={this.state.disable ? null : this.props.handleClick}>
      {this.state.icon!=""
        ? <div className="icon">{this.state.icon}</div>
        : null}
      <div className="text">{this.state.text}</div>
    </div>
  }
}

class AddUserButton extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      currentID: this.props.currentID,
      currentUserListLength: this.props.currentUserListLength,
      buttonDisable: this.props.buttonDisable,
      limit: this.props.limit,
      userAddedSuccess: this.props.userAddedSuccess,
    };
  }

  // componentWillReceiveProps(nextProps) {
  //   this.setState({
  //     buttonDisable: (this.nextProps.disable)
  //   })
  // }

  handleSubmit = (event) =>{
    event.preventDefault();
    this.handleDisplayInput();
  }

  render(){
    console.log("AddUserButton: ", this.state);
    return <div className="AddUserButton">
      <Button icon="+" inverse={false}
        disable={this.state.buttonDisable}
        handleClick={this.props.handleDisplayInput} text="Add User" />
      <SuccessMessage />
      <WarningMessage />
    </div>
  }
}

/** Generates form to add user to the list */
class InputUser extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      currentID: this.props.currentID + 1,
      inputNameValue: "",
      inputEmailValue: "",
      emailWarning: "hidden",
      nameWarning: "hidden",
    };
  }

  // Handle input with user name
  handleNameChange = (event) => {
    this.setState({
      inputNameValue: event.target.value
    })
  }

  // Handle input with user email
  handleEmailChange = (event) => {
    this.setState({
      inputEmailValue: event.target.value
    })
  }

  // Handle reset link
  handleInputReset = (event) => {
    this.setState({
      inputNameValue: "",
      inputEmailValue: ""
    })
  }

  // Handle Submit button
  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.inputEmailValue.indexOf("@") < 0) {
      this.setState({
        emailWarning: ""
      })
    } else if (this.state.inputNameValue.length > 20) {
      this.setState({
        nameWarning: ""
      })
    } else {
      const newUser = {
        id: this.state.currentID,
        name: this.state.inputNameValue,
        email: this.state.inputEmailValue,
      };
      this.props.handleNewUser(newUser);

      this.setState({
        emailWarning: "hidden",
        nameWarning: "hidden"
      });
    }
  }

  render(){
    return <div className="inputUser">
      <input type="text" name="userName" placeholder="Name..." value={this.state.inputNameValue} onChange={(e)=>this.handleNameChange(e)}/>
      <input type="text" name="userEmail" placeholder="Email..." value={this.state.inputEmailValue} onChange={(e)=>this.handleEmailChange(e)}/>
      <Button inverse={true} handleClick={this.handleSubmit} text="Submit"/>
      <div id="reset"><a href="#" onClick={this.handleInputReset}>Reset fields</a></div>
      <WarningValidateEmail className={this.state.nameWarning}/>
      <WarningValidateEmail className={this.state.mailWarning}/>
    </div>
  }
}

/** Generates form to add user to the list */
export class Navigation extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      currentID: this.props.currentID,
      currentUserListLength: this.props.currentUserListLength,
      limit: this.props.limit,
      userAddedSuccess: this.props.userAddedSuccess,
      displayInput: false,
      limitExeeded: false,
    };
  }

  componentWillMount(){
    if ( this.props.currentUserListLength < this.props.limit ) {
      this.setState({
        limitExeeded: false,
      })
    } else {
      this.setState({
        limitExeeded: true,
      })
    }
  }

  handleDisplayInput = () =>{
    // console.log("this.state.displayInput", this.state.displayInput);
    this.setState({
      displayInput: !this.state.displayInput,
    })
  }

  render(){
    console.log("Navigation", this.state);
    if (this.state.displayInput) {
      return <div className="addForm">
        <InputUser
          currentID={this.state.currentID}
          handleDisplayInput={this.handleDisplayInput}
          handleNewUser={this.props.handleNewUser}
          />
      </div>
    } else {
      return <div className="addForm">
        <AddUserButton
          inverse={false}
          buttonDisable={this.state.limitExeeded}
          currentID={this.state.currentID}
          currentUserListLength={this.state.currentUserListLength}
          limit={this.state.limit}
          userAddedSuccess={this.state.userAddedSuccess}
          handleDisplayInput={this.handleDisplayInput}
          />
      </div>
    }
  }
}
