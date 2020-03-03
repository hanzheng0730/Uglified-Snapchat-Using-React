import React from 'react'
import {
    Header,
    Segment,
    Grid,
    Card,
    Image,
    Icon,
    Button
} from 'semantic-ui-react'

import * as actions from '../../store/actions'
import {Link} from "react-router-dom";
import './index.css'
import one from './1.jpeg'
import two from './2.jpeg'
import three from './3.jpeg'


class Page extends React.Component {
    constructor(props) {
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout(event) {
        event.preventDefault();
        this.props.dispatch(actions.authLogout());
    }

    render() {
        return (
            <div>
                <Segment vertical  inverted color='yellow'>
                    <Header as='h2'>
                        <Grid colmuns={'equal'}>
                            <Grid.Column width={13}>
                                <div className='head-text'>
                                    Welcome to Ugly Face
                                </div>
                            </Grid.Column>
                            <Grid.Column >
                                <div className={'log-out'}>
                                    <Link to='/' replace>Home</Link>
                                </div>
                            </Grid.Column>
                            <Grid.Column >
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
                        <Grid.Column>
                            <Card>
                                <Image src={one} size={'medium'} />
                                <Card.Content>
                                    <Card.Header>Daniel</Card.Header>
                                    <Card.Meta>Joined in 2016</Card.Meta>
                                    <Card.Description>Daniel is a comedian living in Nashville.</Card.Description>
                                </Card.Content>
                                <Card.Content extra>
                                    <Button  primary>Delete</Button>
                                </Card.Content>
                            </Card>
                        </Grid.Column>
                        <Grid.Column>
                            <Card>
                                <Image src={two} size={'medium'}/>
                                <Card.Content>
                                    <Card.Header>Daniel</Card.Header>
                                    <Card.Meta>Joined in 2016</Card.Meta>
                                    <Card.Description>Daniel is a comedian living in Nashville.</Card.Description>
                                </Card.Content>
                                <Card.Content extra>
                                    <Button  primary>Delete</Button>
                                </Card.Content>
                            </Card>
                        </Grid.Column>
                        <Grid.Column>
                            <Card>
                                <Image src={three} size={'medium'}/>
                                <Card.Content>
                                    <Card.Header>Daniel</Card.Header>
                                    <Card.Meta>Joined in 2016</Card.Meta>
                                    <Card.Description>Daniel is a comedian living in Nashville.</Card.Description>
                                </Card.Content>
                                <Card.Content extra>
                                    <Button  primary>Delete</Button>
                                </Card.Content>
                            </Card>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row columns={3}>
                        <Grid.Column>
                            <Card>
                                <Image src={one} size={'medium'} />
                                <Card.Content>
                                    <Card.Header>Daniel</Card.Header>
                                    <Card.Meta>Joined in 2016</Card.Meta>
                                    <Card.Description>Daniel is a comedian living in Nashville.</Card.Description>
                                </Card.Content>
                                <Card.Content extra>
                                    <Button  primary>Delete</Button>
                                </Card.Content>
                            </Card>
                        </Grid.Column>
                        <Grid.Column>
                            <Card>
                                <Image src={two} size={'medium'}/>
                                <Card.Content>
                                    <Card.Header>Daniel</Card.Header>
                                    <Card.Meta>Joined in 2016</Card.Meta>
                                    <Card.Description>Daniel is a comedian living in Nashville.</Card.Description>
                                </Card.Content>
                                <Card.Content extra>
                                    <Button  primary>Delete</Button>
                                </Card.Content>
                            </Card>
                        </Grid.Column>
                        <Grid.Column>
                            <Card>
                                <Image src={three} size={'medium'}/>
                                <Card.Content>
                                    <Card.Header>Daniel</Card.Header>
                                    <Card.Meta>Joined in 2016</Card.Meta>
                                    <Card.Description>Daniel is a comedian living in Nashville.</Card.Description>
                                </Card.Content>
                                <Card.Content extra>
                                    <Button  primary>Delete</Button>
                                </Card.Content>
                            </Card>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row columns={3}>
                        <Grid.Column>
                            <Card>
                                <Image src={one} size={'medium'} />
                                <Card.Content>
                                    <Card.Header>Daniel</Card.Header>
                                    <Card.Meta>Joined in 2016</Card.Meta>
                                    <Card.Description>Daniel is a comedian living in Nashville.</Card.Description>
                                </Card.Content>
                                <Card.Content extra>
                                    <Button  primary>Delete</Button>
                                </Card.Content>
                            </Card>
                        </Grid.Column>
                        <Grid.Column>
                            <Card>
                                <Image src={two} size={'medium'}/>
                                <Card.Content>
                                    <Card.Header>Daniel</Card.Header>
                                    <Card.Meta>Joined in 2016</Card.Meta>
                                    <Card.Description>Daniel is a comedian living in Nashville.</Card.Description>
                                </Card.Content>
                                <Card.Content extra>
                                    <Button  primary>Delete</Button>
                                </Card.Content>
                            </Card>
                        </Grid.Column>
                        <Grid.Column>
                            <Card>
                                <Image src={three} size={'medium'}/>
                                <Card.Content>
                                    <Card.Header>Daniel</Card.Header>
                                    <Card.Meta>Joined in 2016</Card.Meta>
                                    <Card.Description>Daniel is a comedian living in Nashville.</Card.Description>
                                </Card.Content>
                                <Card.Content extra>
                                    <Button  primary>Delete</Button>
                                </Card.Content>
                            </Card>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                </div>
            </div>
        );
    }
}

export default Page;