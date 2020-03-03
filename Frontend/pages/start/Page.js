import React from 'react'
import {Button, Grid, Header, Icon, Modal, Segment, Input, TransitionablePortal} from 'semantic-ui-react'

import * as actions from '../../store/actions'
import {Link} from "react-router-dom";
import './index.css'
import {storeService} from '../../services/storeService';


const marginBottom = {
  marginBottom: "1rem",
  width: '100%'
}

const pnums = window.pModel.shapeModel.eigenValues.length - 2;

const DELAY_TIME = 3

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
    this.state = {
      preview: "imgs/guess.jpg",
      flip: false,
      isShow: false,
      delay: DELAY_TIME,
      isDelay: false,
      isSaveFaceModalOpen: false,
      isPostModalOpen: false
    }
  }

  handleLogout(event) {
    event.preventDefault();
    this.props.dispatch(actions.authLogout());
  }

  componentDidMount() {
    this.init()
  }

  actions = {}
  ph = null

  random5 = () => {
    this.actions.random(5)
  }

  random10 = () => {
    this.actions.random(10)
  }

  random15 = () => {
    this.actions.random(15)
  }

  takePhoto = () => {
    this.setState({
      preview: this.actions.takePhoto(),
      flip: true
    })

  }

  takePhotoDelay = () => {
    let counter = DELAY_TIME
    this.setState({
      delay: counter--,
      isDelay: true
    })
    const itervalId = setInterval(() => {
      this.setState({
        delay: counter--
      })
    }, 1000)

    setTimeout(() => {
      this.setState({
        preview: this.actions.takePhoto(),
        flip: true
      })
      clearInterval(itervalId)
      this.setState({
        delay: DELAY_TIME,
        isDelay: false
      })
    }, 3000)


  }

  customize = () => {
    if (!this.state.isShow) {
      this.gui.show()
    }
    else {
      this.gui.hide()
    }

    this.state.isShow = !this.state.isShow
  }

  download = () => {
    const a = document.createElement('a');
    a.href = this.state.preview
    a.download = "ugly.png";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }


  init() {
    var vid = document.getElementById('videoel');
    var vid_width = vid.width;
    var vid_height = vid.height;
    var overlay = document.getElementById('overlay');
    var overlayCC = overlay.getContext('2d');
    var webgl_overlay = document.getElementById('webgl');
    var result = document.getElementById('result');

    // canvas for copying videoframes to
    var videocanvas = document.createElement('CANVAS');
    videocanvas.width = vid_width;
    videocanvas.height = vid_height;

    /*********** Setup of video/webcam and checking for webGL support *********/



    function adjustVideoProportions() {
      // resize overlay and video if proportions are not 4:3
      // keep same height, just change width
      var proportion = vid.videoWidth / vid.videoHeight;
      vid_width = Math.round(vid_height * proportion);
      vid.width = vid_width;
      overlay.width = vid_width;
      webgl_overlay.width = vid_width;
      videocanvas.width = vid_width;
      webGLContext.viewport(0, 0, webGLContext.canvas.width, webGLContext.canvas.height);
    }

    // check whether browser supports webGL
    // const webGLContext = webgl_overlay.getContext('webgl',{preserveDrawingBuffer:true})
    const webGLContext = webgl_overlay.getContext('webgl')


    function gumSuccess(stream) {
      // add camera stream if getUserMedia succeeded

      if ("srcObject" in vid) {
        vid.srcObject = stream;
      } else {
        vid.src = (window.URL && window.URL.createObjectURL(stream));
      }
      vid.onloadedmetadata = function () {
        adjustVideoProportions();
        fd.init(webgl_overlay);
        vid.play();
        startVideo()
      }
      vid.onresize = function () {
        adjustVideoProportions();
        fd.init(webgl_overlay);
        if (trackingStarted) {
          ctrack.stop();
          ctrack.reset();
          ctrack.start(vid);
        }
      }
    }

    function gumFail(err) {

    }

    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
    window.URL = window.URL || window.webkitURL || window.msURL || window.mozURL;

    // check for camerasupport
    if (navigator.mediaDevices) {
      navigator.mediaDevices.getUserMedia({video: true}).then(gumSuccess).catch(gumFail);
    } else if (navigator.getUserMedia) {
      navigator.getUserMedia({video: true}, gumSuccess, gumFail);
    } else {

    }


    /*********** Code for face substitution *********/

    var animationRequest;
    var positions;

    var ctrack = new window.clm.tracker();
    ctrack.init(window.pModel);
    var trackingStarted = true;

    function startVideo() {
      vid.play();
      ctrack.start(vid);
      drawMaskLoop();
    }

    var fd = new window.faceDeformer();

    var mouth_vertices = [
      [44, 45, 61, 44],
      [45, 46, 61, 45],
      [46, 60, 61, 46],
      [46, 47, 60, 46],
      [47, 48, 60, 47],
      [48, 59, 60, 48],
      [48, 49, 59, 48],
      [49, 50, 59, 49],
      [50, 51, 58, 50],
      [51, 52, 58, 51],
      [52, 57, 58, 52],
      [52, 53, 57, 52],
      [53, 54, 57, 53],
      [54, 56, 57, 54],
      [54, 55, 56, 54],
      [55, 44, 56, 55],
      [44, 61, 56, 44],
      [61, 60, 56, 61],
      [56, 57, 60, 56],
      [57, 59, 60, 57],
      [57, 58, 59, 57],
      [50, 58, 59, 50],
    ];

    var extendVertices = [
      [0, 71, 72, 0],
      [0, 72, 1, 0],
      [1, 72, 73, 1],
      [1, 73, 2, 1],
      [2, 73, 74, 2],
      [2, 74, 3, 2],
      [3, 74, 75, 3],
      [3, 75, 4, 3],
      [4, 75, 76, 4],
      [4, 76, 5, 4],
      [5, 76, 77, 5],
      [5, 77, 6, 5],
      [6, 77, 78, 6],
      [6, 78, 7, 6],
      [7, 78, 79, 7],
      [7, 79, 8, 7],
      [8, 79, 80, 8],
      [8, 80, 9, 8],
      [9, 80, 81, 9],
      [9, 81, 10, 9],
      [10, 81, 82, 10],
      [10, 82, 11, 10],
      [11, 82, 83, 11],
      [11, 83, 12, 11],
      [12, 83, 84, 12],
      [12, 84, 13, 12],
      [13, 84, 85, 13],
      [13, 85, 14, 13],
      [14, 85, 86, 14],
      [14, 86, 15, 14],
      [15, 86, 87, 15],
      [15, 87, 16, 15],
      [16, 87, 88, 16],
      [16, 88, 17, 16],
      [17, 88, 89, 17],
      [17, 89, 18, 17],
      [18, 89, 93, 18],
      [18, 93, 22, 18],
      [22, 93, 21, 22],
      [93, 92, 21, 93],
      [21, 92, 20, 21],
      [92, 91, 20, 92],
      [20, 91, 19, 20],
      [91, 90, 19, 91],
      [19, 90, 71, 19],
      [19, 71, 0, 19]
    ]

    var newPos, newVertices, addPos


    function _drawMask(fd, newPos, newVertices, addPos) {
      fd.load(videocanvas, newPos, window.pModel, newVertices);

      var parameters = ctrack.getCurrentParameters();

      for (var i = 6; i < parameters.length; i++) {
        parameters[i] += ph['component ' + (i - 3)];
      }
      positions = ctrack.calculatePositions(parameters);

      overlayCC.clearRect(0, 0, vid_width, vid_height);
      if (positions) {
        // add positions from extended boundary, unmodified

        newPos = positions.concat(addPos);
        // draw mask on top of face

        fd.draw(newPos);
      }
    }

    function drawMaskLoop() {
      videocanvas.getContext('2d').drawImage(vid, 0, 0, videocanvas.width, videocanvas.height);

      var pos = ctrack.getCurrentPosition();

      if (pos) {
        // create additional points around face
        var tempPos;
        addPos = [];
        for (var i = 0; i < 23; i++) {
          tempPos = [];
          tempPos[0] = (pos[i][0] - pos[62][0]) * 1.3 + pos[62][0];
          tempPos[1] = (pos[i][1] - pos[62][1]) * 1.3 + pos[62][1];
          addPos.push(tempPos);
        }
        // merge with pos
        newPos = pos.concat(addPos);

        newVertices = window.pModel.path.vertices.concat(mouth_vertices);
        // merge with newVertices
        newVertices = newVertices.concat(extendVertices);

        _drawMask(fd, newPos, newVertices, addPos)
      }
      animationRequest = window.requestAnimFrame(drawMaskLoop);
    }


    /********** parameter code *********/


    var parameterHolder = function () {
      for (var i = 0; i < pnums; i++) {
        this['component ' + (i + 3)] = 0;
      }
      this.presets = 0;
    };

    parameterHolder.prototype.update = function (data) {
      for (var i = 0; i < pnums; i++) {
        this['component ' + (i + 3)] = data['component ' + (i + 3)];
      }
      this.presets = 0;
    }
    var ph = this.ph = new parameterHolder();
    var gui = this.gui = new window.dat.GUI();
    gui.hide()


    var presets = {
      "unwell": [0, 0, 0, 0, 0, 0, 22, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      "inca": [0, 0, -9, 0, -11, 0, 0, 0, 0, 0, 0, 0, 12, 0, 0, 0, 0, 0],
      "cheery": [0, 0, -9, 9, -11, 0, 0, 0, 0, 0, 0, 0, -9, 0, 0, 0, 0, 0],
      "dopey": [0, 0, 0, 0, 0, 0, 0, -11, 0, 0, 0, 0, 0, 0, 20, 0, 0, 0],
      "longface": [0, 0, 0, 0, -15, 0, 0, -12, 0, 0, 0, 0, 0, 0, -7, 0, 0, 5],
      "lucky": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -4, 0, -6, 12, 0, 0],
      "overcute": [0, 0, 0, 0, 16, 0, -14, 0, 0, 0, 0, 0, -7, 0, 0, 0, 0, 0],
      "aloof": [0, 0, 0, 0, 0, 0, 0, -8, 0, 0, 0, 0, 0, 0, -2, 0, 0, 10],
      "evil": [0, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, -8],
      "artificial": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 11, 0, -16, 0, 0, 0, 0, 0],
      "none": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    };

    var control = {};
    var eig = 0;
    for (var i = 0; i < pnums; i++) {
      eig = Math.sqrt(window.pModel.shapeModel.eigenValues[i + 2]) * 3
      control['c' + (i + 3)] = gui.add(ph, 'component ' + (i + 3), -5 * eig, 5 * eig).listen();
    }

    /********** defaults code **********/

    function switchDeformedFace(e) {
      //var split = ph.presets.split(",");
      for (var i = 0; i < pnums; i++) {
        ph['component ' + (i + 3)] = presets[e.target.value][i];
      }
    }

    document.getElementById('deform').addEventListener('change', switchDeformedFace, false);

    for (var i = 0; i < pnums; i++) {
      ph['component ' + (i + 3)] = presets['unwell'][i];
    }

    function random(size) {
      for (var i = 0; i < pnums; i++) {
        ph['component ' + (i + 3)] = Math.random() * size * 2 - size;
      }
    }

    function takePhoto() {
      const result = document.createElement("canvas")
      result.width = vid_width
      result.height = vid_height
      const ctx = result.getContext("2d")


      ctx.drawImage(videocanvas, 0, 0, videocanvas.width, videocanvas.height)

      const maskCanvas = document.createElement("canvas")
      maskCanvas.width = vid_width
      maskCanvas.height = vid_height
      const fd2 = new window.faceDeformer();
      fd2.init(maskCanvas)
      _drawMask(fd2, newPos, newVertices, addPos)

      ctx.drawImage(maskCanvas, 0, 0, videocanvas.width, videocanvas.height)

      return result.toDataURL()


      // canvas.drawImage(overlay,0,0,videocanvas.width,videocanvas.height)


      // var aux=document.querySelector("#webgl").toDataURL()


    }


    this.actions.random = random
    this.actions.takePhoto = takePhoto


  }


  fullScreenPreview = () => {
    document.querySelector("#preview").requestFullscreen()
  }

  openSaveFace = () => {
    this.setState({
      isSaveFaceModalOpen: true
    })
  }

  saveFace = ()=>{
    const params = []
    for (var i = 0; i < pnums; i++) {
      params[i] = this.ph['component ' + (i + 3)]
    }
    storeService.currentUser.faces.push({
      name: this.state.newUglyFaceName,
      params
    })

    storeService.save()
  }

  removeFace(face){
    const index = storeService.currentUser.faces.indexOf(face)
    storeService.currentUser.faces.splice(index,1)
    storeService.save()
    console.log(index,storeService.currentUser.faces);
    this.setState({})
  }


  closeSaveFace = () => {
    this.setState({
      isSaveFaceModalOpen: false
    })
  }


  openPost = () => {
    this.setState({
      isPostModalOpen: true
    })
  }

  closePost = () => {
    this.setState({
      isPostModalOpen: false
    })
  }

  post = ()=>{
    storeService.addArticle({
      title: this.state.postTitle,
      img:this.state.preview,
      comments:[],
      create_at:new Date().getTime()
    })

  }


  loadChoice = (face) => {
    for (var i = 0; i < face.params.length; i++) {
      this.ph['component ' + (i + 3)] = face.params[i];
    }
  }


  render() {
    // when everything is ready, automatically start everything ?


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
                <Link to='/setting' replace>
                  <Icon name='setting'/>
                </Link>
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

        <div style={{padding: "1rem", boxSizing: "border"}} id="content">
          <div id="container">
            <div style={{width: '800px', display: 'inline-block', position: 'relative'}}>
              <video id="videoel" width="800" height="600" preload="auto" loop autoPlay></video>
              <canvas id="overlay" width="800" height="600"></canvas>
              <canvas id="webgl" width="800" height="600"></canvas>
              <div className="delay" hidden={!this.state.isDelay}>{this.state.delay}</div>
            </div>
            <div style={{
              display: 'inline-block',
              width: "200px",
              marginLeft: '1rem',
              textAlign: "center",
              verticalAlign: "top"
            }}>
              <h2>preview</h2>
              <img id="preview" style={{transform: this.state.flip ? 'scaleX(-1)' : "", width: '100%', height: '150px'}}
                   src={this.state.preview}
                   alt="" onClick={this.fullScreenPreview}></img>
              <Button color="pink" style={marginBottom} onClick={this.random5}>Just So So ~~~ </Button>
              <Button color="blue" style={marginBottom} onClick={this.random10}>Become Crazy ??? </Button>
              <Button color="red" style={marginBottom} onClick={this.random15}>Are You Sure !!! </Button>
              <Button color="orange" style={marginBottom} onClick={this.customize}>Customize !!! </Button>
              <Button style={marginBottom} onClick={this.takePhoto}>Take Photo</Button>
              <Button style={marginBottom} onClick={this.takePhotoDelay}>Take Photo (3s delay)</Button>
              <Button color="purple" style={marginBottom} onClick={this.download}>Download</Button>

              {/* save face*/}
              <Button color="purple" style={marginBottom} onClick={this.openSaveFace}>Save Face</Button>
              <TransitionablePortal open={this.state.isSaveFaceModalOpen} transition={{animation: 'scale', duration: 500}}>
              <Modal open={this.state.isSaveFaceModalOpen} basic size='small'>
                <Header icon='archive' content='Give a name for your ungly face'/>
                <Modal.Content>
                  <Input style={{width:'600px'}} size='big' icon='heart' placeholder='Ugly Face Name...' onChange={(event)=>{this.state.newUglyFaceName = event.target.value}} />
                </Modal.Content>
                <Modal.Actions>
                  <Button color='green' inverted onClick={()=>{ this.saveFace();this.closeSaveFace();}}>
                    <Icon name='checkmark'/> Confirm
                  </Button>
                  <Button basic color='red' inverted onClick={this.closeSaveFace}>
                    <Icon name='remove'/> Cancel
                  </Button>

                </Modal.Actions>
              </Modal>
              </TransitionablePortal>

              {/* Show off */}
              <Button size="huge" color="green" style={marginBottom} onClick={this.openPost}>Show Off !!!</Button>
              <TransitionablePortal open={this.state.isPostModalOpen} transition={{animation: 'scale', duration: 500}}>
              <Modal open={this.state.isPostModalOpen} basic size='small'>
                <Header icon='archive' content='Give a description for your post'/>
                <Modal.Content>
                  <Input focus={true} style={{width:'600px'}} size='big' icon='heart' placeholder='Ugly Face Name...' onChange={(event)=>{this.state.postTitle = event.target.value}} />
                </Modal.Content>
                <Modal.Actions>
                  <Button color='green' inverted onClick={()=>{ this.post();this.closePost();}}>
                    <Icon name='checkmark'/> Confirm
                  </Button>
                  <Button basic color='red' inverted onClick={this.closePost}>
                    <Icon name='remove'/> Cancel
                  </Button>

                </Modal.Actions>
              </Modal>
              </TransitionablePortal>

            </div>
            <div>
              <div style={{marginTop: "1rem",width:"800px"}} className="ui huge labels">
                {
                  storeService.currentUser.faces.map(face => {
                    return (<div key={face.name}  className="ui label">
                      <span  onClick={() => this.loadChoice(face)}>
                      {face.name}
                      <span onClick={(event)=>{this.removeFace(face);event.stopPropagation()}} style={{display:'inline-block',marginLeft:'0.5rem'}}><Icon name="remove"></Icon></span>
                    </span>
                    </div>)
                  })

                }
              </div>
            </div>
            <div>
              <select name="deformation" id="deform" hidden={true}>
                <option value="unwell">Unwell</option>
                <option value="inca">Inca</option>
                <option value="cheery">Cheery</option>
                <option value="dopey">Dopey</option>
                <option value="longface">Longface</option>
                <option value="lucky">Lucky</option>
                <option value="overcute">Overcute</option>
                <option value="aloof">Aloof</option>
                <option value="evil">Evil</option>
                <option value="artificial">Artificial</option>
                <option value="none">None</option>
              </select>

            </div>
            {/*<canvas hidden={true} id="result" width="800" height="600"></canvas>*/}
          </div>
        </div>
      </div>
    );
  }
}

export default Page;