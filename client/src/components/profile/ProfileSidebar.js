
import React, { Component } from 'react';
import {
    Button,
    Card,
    Header,
    Icon, 
    Label
  } from 'semantic-ui-react';
  import {get_gravatar} from './profileUtils';


class ProfileSidebar extends Component {
    render (){
      return (
        <Card>
            {get_gravatar(this.props.user.email,250)}
            <br></br>
            <Button 
                id="editButton" 
                floated='right' 
                color='black'
                onClick={this.props.modalControl}
                content='Update your profile'> 
            </Button>
                
            <Card.Content>
                <Card.Header>{this.props.user.username}</Card.Header>
                <Card.Meta>
                        <span className='date'>Lerner since 2019</span>
                </Card.Meta>
                <Card.Description> {this.props.user.bio} </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Icon name='map outline' /> {this.props.user.learningPaths.length} Active Paths
                <br></br>
                <Icon name='certificate' /> {this.props.user.currentCourses.length} Active Courses
            </Card.Content>
            <Card.Content >
                <Header as='h3'>Learning Style </Header>
                {this.props.user.learningType.map((value) => {
                    return <Label> {value.name} </Label>
                })}
                <br></br>
                <Header as='h3'>Areas of Interest </Header>
                {this.props.user.interest.map((value) => {
                    return <Label> {value.name} </Label>
                })}
                <br></br>
            </Card.Content>
            <Card.Content >
                
                <Header as='h3'>Has Experience with</Header>
                {this.props.user.experience.map((value) => {
                    return <Label> {value.name} </Label>
                })}
            </Card.Content>
        </Card> 
      )
    }
}
export default ProfileSidebar;

