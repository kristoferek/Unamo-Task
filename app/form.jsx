import React from 'react';
import {
  SuccessMessage,
  LimitExceededMessage,
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

  componentWillReceiveProps(nextProps) {
    this.setState({
      buttonDisable: this.props.listLimitExceeded(),
    })
  }

  setClass = () => {
    let classVar = this.state.actualClass;
    this.state.inverse ? classVar = classVar + " inverse" : null;
    this.state.buttonDisable ? classVar= classVar + " disabled" : null;
    return classVar;
  }

  render() {
    return <div
      className={this.setClass()}
      onClick={this.state.buttonDisable ? null : this.props.handleClick}>
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
      isHiddenSuccessMessage: "hidden",
      isHiddenLimitExceededMessage: "hidden",
      buttonDisable: false,
    };
  }

  handleButtonDisabled = ()=>{
    this.setState({
      buttonDisable: this.props.listLimitExceeded(),
    })
  }

  handleLimitExceededMessage = ()=>{
   this.setState({
     isHiddenLimitExceededMessage: this.props.listLimitExceeded() ? "" : "hidden",
   })
  }

  handleSuccessMessage = ()=>{
   this.setState({
     isHiddenSuccessMessage: this.props.userAddedSuccess() ? "" : "hidden",
   })
  }

  componentWillMount() {
    this.handleSuccessMessage();
    // this.handleLimitExceededMessage();
  }

  componentWillReceiveProps(nextProps) {
    this.handleSuccessMessage();
    this.handleLimitExceededMessage();
  }

  handleSubmit = () => {
    this.props.handleUserAddedSuccess(false);
    if (this.props.listLimitExceeded()){
      this.handleButtonDisabled();
      this.handleLimitExceededMessage();
    } else {
      this.props.handleDisplayInput(true);
    }
  }

  render(){
    return <div className="addUserButton">
      <Button icon="+" inverse={false}
        listLimitExceeded={this.props.listLimitExceeded}
        handleClick={this.handleSubmit}
        text="Add User"
      />
      <SuccessMessage isHidden={this.state.isHiddenSuccessMessage}/>
      <LimitExceededMessage isHidden={this.state.isHiddenLimitExceededMessage}/>
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
      mailWarningDisplay: "hidden",
      nameWarningDisplay: "hidden",
      validMail: true,
      validName: true,
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

  // Validates email
  validateEmail(email) {
    var regEx = new RegExp(/\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/);
    if (email != "") {
      if (regEx.test(email)) {
        return true;
      }
    }
    return false;
  }

  // Validates name
  validateName(name) {
    var regEx = new RegExp(/^[a-zA-Z]+([ ][a-zA-Z]+)*[a-zA-Z]*$/g);
    if ((name != "")&&(name.length<21)) {
      return regEx.test(name);
    }
    return false;
  }

  // Handle Submit button
  handleSubmit = (event) => {
    event.preventDefault();

    // Toggle input email validation result state
    let incorrectEmail = !this.validateEmail(this.state.inputEmailValue);
    this.setState({
      mailWarningDisplay: incorrectEmail ? "" : "hidden",
      validMail: incorrectEmail ? false : true,
    })

    // Toggle input name validation result state
    let incorrectName = !this.validateName(this.state.inputNameValue);
    console.log("incorrectName: ",incorrectName);
    this.setState({
      nameWarningDisplay: incorrectName ? "" : "hidden",
      validName: incorrectName ? false : true,
    })

    // If email and name inputs are correct add user to list
    // and increase currentID
    if (!incorrectEmail && !incorrectName) {
      const newUser = {
        id: this.state.currentID + 1,
        name: this.state.inputNameValue,
        email: this.state.inputEmailValue,
      };
      this.props.addNewRecord(newUser);
      this.props.handleDisplayInput(false);
    }
  }

  render(){
    return <div className="inputUser">
      <div className={`validateField ${this.state.validName ? "" : "validate"}`}>
        <input
          type="text"
          name="userName"
          placeholder="Name..." value={this.state.inputNameValue} onChange={(e)=>this.handleNameChange(e)}
          autoFocus/>
        <WarningValidateName isHidden={this.state.nameWarningDisplay}/>
      </div>

      <div className={`validateField ${this.state.validMail ? "" : "validate"}`}>
        <input
          type="text"
          name="userEmail"
          placeholder="Email..." value={this.state.inputEmailValue}
          onChange={(e)=>this.handleEmailChange(e)} />
        <WarningValidateEmail isHidden={this.state.mailWarningDisplay}/>
      </div>

      <Button inverse={true}
        listLimitExceeded={this.props.listLimitExceeded}
        handleClick={this.handleSubmit}
        text="Submit"
      />
    <div className="reset">
        <a href="#" onClick={this.handleInputReset}>
          Reset fields
        </a>
      </div>
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
    console.log("Navigation", this.state);
    if (this.state.displayInput) {
      return <div className="row addForm">
        <InputUser
          currentID={this.state.currentID}

          addNewRecord={this.props.addNewRecord}
          handleDisplayInput={this.handleDisplayInput}
          listLimitExceeded={this.props.listLimitExceeded}
        />
      </div>
    } else {
      return <div className="row addForm">
        <AddUserButton
          inverse={false}

          userAddedSuccess={this.props.userAddedSuccess}
          handleDisplayInput={this.handleDisplayInput}
          handleUserAddedSuccess={this.props.handleUserAddedSuccess}
          listLimitExceeded={this.props.listLimitExceeded}
        />
      </div>
    }
  }
}
