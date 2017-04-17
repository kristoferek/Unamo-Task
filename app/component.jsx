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
    return <div className="success">
      You have Successfully added an user.
  </div>
  }
}

export class WarningMessage extends React.Component {
  render() {
    return <div className="warning">
      You can't add new user because of a limit.
  </div>
  }
}

export class WarningValidateEmail extends React.Component {
  render() {
    return <div id="emailWarning">
      Please input a valid email.
  </div>
  }
}

export class WarningValidateName extends React.Component {
  render() {
    return <div id="nameWarning">
      Please name not longer than 20 characters.
  </div>
  }
}
