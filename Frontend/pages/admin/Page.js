import React from 'react'
import {Button, Card, Grid, Header, Image, Segment} from 'semantic-ui-react'

import * as actions from '../../store/actions'
import {Link} from "react-router-dom";
import './index.css'
import {storeService} from "../../services/storeService";


class Page extends React.Component {



  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout(event) {
    event.preventDefault();
    this.props.dispatch(actions.authLogout());
  }


  voteAsKing = (user) => {

    storeService.users.forEach((user)=>{
      user.isKing = false
    })
    user.isKing = true
    storeService.save()
    this.setState({})
  }

  render() {
    return (
      <div>
        <Segment vertical inverted color='yellow'>
          <Header as='h2'>
            <Grid colmuns={'equal'}>
              <Grid.Column width={13}>
                <div className='head-text'>
                  Welcome to Ugly Face
                </div>
              </Grid.Column>
              <Grid.Column>
                <div className={'log-out'}>
                  <Link to='/' replace>Home</Link>
                </div>
              </Grid.Column>
              <Grid.Column>
                <div className={'log-out'}>
                  <Link to='/login' replace>Log out</Link>
                </div>
              </Grid.Column>
            </Grid>
          </Header>
        </Segment>
        <div className='card-down'>
          <Grid>
            <Grid.Row columns={3}>
              {storeService.users.map(user => {
                return (
                  <Grid.Column key={user.name}>
                    <Card style={{marginBottom: "1rem"}}>
                      <Image style={{height: "250px", width: "auto", objectFit: "cover"}} src={user.avator}
                             size={'medium'}/>
                      <Card.Content>
                        <Card.Header>{user.name}</Card.Header>
                        <Card.Meta>Joined in 2019</Card.Meta>
                        <Card.Description>{user.description || 'No Description'}</Card.Description>
                      </Card.Content>
                      <Card.Content extra>
                        <Button disabled={user.isKing} primary onClick={()=>{this.voteAsKing(user)}}>Choose as king of Ugly!</Button>
                      </Card.Content>
                    </Card>
                  </Grid.Column>
                )
              })}
            </Grid.Row>
          </Grid>
        </div>
      </div>
    );
  }
}

export default Page;