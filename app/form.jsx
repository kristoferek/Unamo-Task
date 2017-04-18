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

  // componentWillMount() {
  //   this.setState({
  //     buttonDisable: this.props.listLimitExceeded(),
  //   })
  // }

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
    console.log("Button ", this.state);
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
    console.log("AddUserButton: ", this.state);
    return <div className="AddUserButton">
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
      mailWarning: "hidden",
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
      mailWarning: incorrectEmail ? "" : "hidden"
    })

    // Toggle input name validation
    let incorrectName = this.state.inputNameValue.length > 20 || this.state.inputNameValue.length < 1 ;
    this.setState({
      nameWarning: incorrectName ? "" : "hidden"
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
      <div className="validatedField">
        <input
          type="text"
          name="userName"
          placeholder="Name..." value={this.state.inputNameValue} onChange={(e)=>this.handleNameChange(e)}
        />
        <WarningValidateEmail isHidden={this.state.mailWarning}/>
      </div>

      <div className="validatedField">
        <input
          type="text"
          name="userEmail"
          placeholder="Email..." value={this.state.inputEmailValue}
          onChange={(e)=>this.handleEmailChange(e)}
        />
        <WarningValidateEmail isHidden={this.state.nameWarning}/>
      </div>

      <Button inverse={false}
        listLimitExceeded={this.props.listLimitExceeded}
        handleClick={this.handleSubmit}
        text="Submit"
      />
      <div id="reset">
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
      return <div className="addForm">
        <InputUser
          currentID={this.state.currentID}

          addNewRecord={this.props.addNewRecord}
          handleDisplayInput={this.handleDisplayInput}
          listLimitExceeded={this.props.listLimitExceeded}
        />
      </div>
    } else {
      return <div className="addForm">
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
