import React from 'react';

export class Logo extends React.Component {
  render() {
    return <div className="logo">
      <a href="http://www.positionly.com">
        <img src="./images/logo.png"/>
      </a>
    </div>
  }
}

export class Domain extends React.Component {
  render() {
    return <div className="domain">
      <a href="http://positionly.com">www.positionly.com</a>
  </div>
  }
}

export class SuccessMessage extends React.Component {
  render() {
    return <div className={`message ${this.props.isHidden}`}>
      <img src="./images/success.png" />
      <div>You have Successfully added an user.</div>
  </div>
  }
}

export class LimitExceededMessage extends React.Component {
  render() {
    console.log(this.props);
    return <div className={`message ${this.props.isHidden}`}>
      <img src="./images/warning.png" />
      <div>You can't add new user because of a limit.</div>
  </div>
  }
}

export class WarningValidateEmail extends React.Component {
  render() {
    return <div className={`warning ${this.props.isHidden}`}>
      Please input a valid email.
  </div>
  }
}

export class WarningValidateName extends React.Component {
  render() {
    return <div className={`warning ${this.props.isHidden}`}>
      Please input your name (max 20 letters)
  </div>
  }
}
