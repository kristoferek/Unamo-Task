import React from 'react';

export class Logo extends React.Component {
  render() {
    return <div className="logo">
      <img />
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
      You have Successfully added an user.
  </div>
  }
}

export class LimitExceededMessage extends React.Component {
  render() {
    console.log(this.props);
    return <div className={`message ${this.props.isHidden}`}>
      You can't add new user because of a limit.
  </div>
  }
}

export class WarningValidateEmail extends React.Component {
  render() {
    return <div className={`validate ${this.props.isHidden}`}>
      Please input a valid email.
  </div>
  }
}

export class WarningValidateName extends React.Component {
  render() {
    return <div className={`validate ${this.props.isHidden}`}>
      Please name not longer than 20 characters.
  </div>
  }
}
