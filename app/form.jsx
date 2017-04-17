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
      buttonDisable: this.props.buttonDisable,
      actualClass: "button"
    }
  }

  setClass = (newState)=>{
    let classVar="button";
    newState.inverse ? classVar = classVar + " inverse" : null;
    newState.buttonDisable ? classVar= classVar + " disabled" : null;
    this.setState({
      actualClass: classVar
    });
  }

  componentWillMount(){
    this.setClass(this.props);
    // console.log("Nextprops button ", this.props);
  }

  // componentWillReceiveProps(nextProps){
  //   this.setClass(nextProps);
  //   // console.log("Nextprops button ", nextProps);
  // }

  render() {
    console.log("Button ", this.state);
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
    };
  }

  render(){
    console.log("AddUserButton: ", this.state);
    return <div className="AddUserButton">
      <Button icon="+" inverse={false}
        buttonDisable={this.props.listLimitExceeded}
        handleClick={this.props.handleDisplayInput}
        text="Add User"
      />
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

    // Toggle input email validation
    let incorrectEmail = this.state.inputEmailValue.indexOf("@") < 0;
    this.setState({
      emailWarning: incorrectEmail ? "" : "hidden"
    })

    // Toggle input name validation
    let incorrectName = this.state.inputNameValue.length > 20;
    this.setState({
      nameWarning: incorrectName ? "" : "hidden"
    })

    // If email and name inputs are correct add user to list
    // and increase currentID
    if (!(incorrectEmail && incorrectName)) {
      const newUser = {
        id: this.state.currentID + 1,
        name: this.state.inputNameValue,
        email: this.state.inputEmailValue,
      };
      this.props.addNewRecord(newUser);
    }
  }

  render(){
    return <div className="inputUser">
      <input
        type="text"
        name="userName"
        placeholder="Name..." value={this.state.inputNameValue} onChange={(e)=>this.handleNameChange(e)}
      />
      <input
        type="text"
        name="userEmail"
        placeholder="Email..." value={this.state.inputEmailValue}
        onChange={(e)=>this.handleEmailChange(e)}
      />
      <Button
        inverse={true}
        handleClick={this.handleSubmit}
        text="Submit"
      />
      <div id="reset">
        <a href="#" onClick={this.handleInputReset}>
          Reset fields
        </a>
      </div>
      <WarningValidateEmail isHidden={this.state.nameWarning}/>
      <WarningValidateEmail isHidden={this.state.mailWarning}/>
    </div>
  }
}

/** Generates form to add user to the list */
export class Navigation extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      currentID: this.props.currentID,
      displayInput: false,
    };
  }

  // Toggles displaying InputUser or AddUserButton
  handleDisplayInput = (logical) =>{
    // console.log("this.state.displayInput", this.state.displayInput);
    this.setState({
      displayInput: logical,
    })
  }

  render(){
    // console.log("Navigation", this.state);
    if (this.state.displayInput) {
      return <div className="addForm">
        <InputUser
          currentID={this.state.currentID}

          addNewRecord={this.addNewRecord}
          handleDisplayInput={this.handleDisplayInput}
          handleUserAddedSuccess={this.handleUserAddedSuccess}
          listLimitExceeded={this.listLimitExceeded}
        />
      </div>
    } else {
      return <div className="addForm">
        <AddUserButton
          inverse={false}

          checkUserAddedSuccess={this.checkUserAddedSuccess}
          handleDisplayInput={this.handleDisplayInput}
          handleUserAddedSuccess={this.handleUserAddedSuccess}
          listLimitExceeded={this.listLimitExceeded}
        />
      </div>
    }
  }
}
