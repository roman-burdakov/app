import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  Dropdown,
  Icon,
  Menu
} from 'semantic-ui-react'

export default class Nav extends Component {
  constructor(props) {
    super(props);
    this.state={};
  }
  refresh = () => {
    this.setState({});
  }
  render() {
    window.refreshNav=this.refresh;
      if (window.localStorage.getItem('currentUser')) {
        const profileLink = `/profile/${window.localStorage.getItem('currentUser')}`;
        return ( <Menu inverted fixed='top' style={{
          fontSize: '1.25em',
          fontWeight: 'normal',
          marginTop: 0,
          marginBottom: '1em',
        }}>
        <Container>
          <Menu.Item as={ Link } to="/" header>
            <Icon color='yellow' name='graduation cap' size='big' />
            Lernt.io
          </Menu.Item>
          {/* TODO Make the link to profile dynamic on the context of currently signed in user */}
          <Menu.Item as={ Link } to={profileLink}> Profile</Menu.Item>
          <Dropdown item simple text="Browse Offerings">
            <Dropdown.Menu>
              <Dropdown.Item as={ Link } to="/learning-path-discovery" >Learning Path Search</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Menu.Menu position='right'>
            <Menu.Item  as={ Link } to="/login" >
               Logout
            </Menu.Item>
          </Menu.Menu>
        </Container>
      </Menu>)
      }
      return ( <Menu inverted fixed='top' style={{
        fontSize: '1.25em',
        fontWeight: 'normal',
        marginTop: 0,
        marginBottom: '1em',
      }}>
      <Container>
        <Menu.Item as={ Link } to="/" header>
          <Icon color='yellow' name='graduation cap' size='big' />
          Lernt.io
        </Menu.Item>
        <Dropdown item simple text="Browse Offerings">
          <Dropdown.Menu>
            <Dropdown.Item as={ Link } to="/learning-path-discovery" >Learning Path Search</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Menu.Menu position='right'>
          <Menu.Item  as={ Link } to="/login" >
             Login
          </Menu.Item>
        </Menu.Menu>
      </Container>
    </Menu>)
  }
}
