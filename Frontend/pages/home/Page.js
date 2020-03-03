import React from 'react'
import {
  Button,
  Card,
  Comment,
  Form,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Modal,
  Segment,
  TextArea,
  TransitionablePortal
} from 'semantic-ui-react'

import * as actions from '../../store/actions'
import {Link} from "react-router-dom";
import './index.css'
import {storeService} from "../../services/storeService";

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);

    this.state = {
      commentInput: "",
      isKingModalOpen: false
    }
  }

  handleLogout(event) {
    event.preventDefault();
    this.props.dispatch(actions.authLogout());
  }

  componentDidMount() {
    if (storeService.currentUser.isKing) {
      setTimeout(() => {
        this.setState({
          isKingModalOpen: true
        })

      }, 1000)
    }
  }

  closeKingModal = () => {
    this.setState({
      isKingModalOpen: false
    })
  }


  addComment = (article, text) => {
    article.comments.push({
      name: storeService.currentUser.name,
      avator: storeService.currentUser.avator,
      text
    })
    storeService.save()
    this.setState({})
  }

  render() {
    return (
      <div>
        <TransitionablePortal open={this.state.isKingModalOpen} transition={{animation: 'scale', duration: 500}}>
          <Modal open={this.state.isKingModalOpen} basic size='small'>
            {/*<Header  size="huge" icon='birthday' content='You are now the king of ugly !!!' />*/}
            <div style={{textAlign: "center"}}>
              <h1><Icon name="birthday"></Icon> You are now the king of ugly !!!</h1>
            </div>
            <Modal.Content>
              <div style={{textAlign: "center"}}>
                <img style={{width: '40%'}} src="imgs/we-need-you.png"
                     alt=""></img>
              </div>
            </Modal.Content>
            <Modal.Actions style={{textAlign: "center"}}>
              <Button color='green' inverted onClick={this.closeKingModal}>
                <Icon name='checkmark'/> Got it !!!
              </Button>
            </Modal.Actions>
          </Modal>
        </TransitionablePortal>
        <Segment vertical inverted color='yellow'>
          <Header as='h2'>
            <Grid colmuns={'equal'}>
              <Grid.Column width={13}>
                <div className='head-text'>
                  Welcome to Ugly Face
                </div>
              </Grid.Column>
              {
                storeService.currentUser.isAdmin ? (
                  <Grid.Column>
                    <Link to='/admin' replace>
                      <Icon name='user'/>
                    </Link>
                  </Grid.Column>
                ) : null
              }

              <Grid.Column>
                <div className={'log-out'}>
                  <Link to='/login' replace>Log out</Link>
                </div>
              </Grid.Column>
            </Grid>
          </Header>
        </Segment>
        <Grid>
          <Grid.Column width={4}>
            <div className={'card-low'} style={{position: "fixed", top: "4.5rem"}}>
              <Card>
                <img hidden={!storeService.currentUser.isKing} className={'crown'} src="imgs/crown.png"></img>
                <Image src={storeService.currentUser.avator} size={'medium'}/>
                <Card.Content>
                  <Card.Header>{storeService.currentUser.name}</Card.Header>
                  <Card.Meta>Joined in 2019</Card.Meta>
                  <Card.Description>{storeService.currentUser.description}</Card.Description>
                </Card.Content>
                {/*<Card.Content extra>*/}
                {/*<a>*/}
                {/*<Icon name='user'/>*/}
                {/*I'm the friends of all the users*/}
                {/*</a>*/}
                {/*</Card.Content>*/}
              </Card>
              <div className={'button'}>
                <Link to='/start' replace>
                  <Button inverted color='yellow' size='massive'>
                    New Post
                  </Button>
                </Link>
              </div>
            </div>
          </Grid.Column>
          <Grid.Column width={9}>
            {
              storeService.articles.map(article => {
                return (
                  <div key={article.title} className={'pic-low'}>
                    <Segment attached='top'>
                      <Header as='h2'>
                        {article.title}
                      </Header>
                    </Segment>
                    <Segment attached>
                      <Grid colmuns={'equal'}>
                        <Grid.Column width={2}>
                          <div style={{position:'relative'}}>

                            <Image src={article.user.avator} size='tiny' circular/>
                          </div>

                          <span>{article.user.name}</span>
                        </Grid.Column>
                        <Grid.Column width={10}>
                          <Grid.Row>
                            <Image style={{transform: "scaleX(-1)"}} src={article.img} size='huge'/>
                          </Grid.Row>
                        </Grid.Column>

                      </Grid>
                    </Segment>
                    <Segment attached='bottom'>
                      <Comment.Group>
                        <Header as='h4' dividing>
                          Comments
                        </Header>

                        {
                          article.comments.map(comment => {
                            return (
                              <Comment key={comment.text}>
                                <Comment.Avatar src={comment.avator}/>
                                <Comment.Content>
                                  <Comment.Author as='a'>{comment.name}</Comment.Author>

                                  <Comment.Text>{comment.text}</Comment.Text>

                                </Comment.Content>
                              </Comment>
                            )
                          })
                        }


                        <Form reply>
                          <TextArea onChange={x => this.state.commentInput = x.target.value}/>
                          <Button content='Add Reply' labelPosition='left' icon='edit' primary onClick={() => {
                            this.addComment(article, this.state.commentInput)
                          }}/>
                        </Form>
                      </Comment.Group>
                    </Segment>
                  </div>
                )
              })
            }
          </Grid.Column>
          <Grid.Column width={3}>
            <div className={'friends'}>
              <Header as='h2'>
                Friends List:
              </Header>
              <List animated verticalAlign='middle'>
                {
                  storeService.users.slice(1).map(user => {
                    return (
                      <List.Item key={user.name}>
                        <Image avatar src={user.avator} size={'mini'}/>
                        <List.Content>
                          <List.Header>{user.name}</List.Header>
                        </List.Content>
                      </List.Item>
                    )
                  })
                }

              </List>
            </div>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default Page;
