import React from 'react';
import ReactDOM from 'react-dom';
import {Header, UserList, Footer} from './container.jsx';
import {userArray} from '../js/data.js';
import './style.scss'

document.addEventListener('DOMContentLoaded', function(){

  class App extends React.Component {
    render() {
      return <div className="container">
        <Header />
        <UserList userLimit={10} userList={userArray}/>
        <Footer />
      </div>
    }
  }

  ReactDOM.render(
    <App />,
    document.getElementById('app')
  );
});
