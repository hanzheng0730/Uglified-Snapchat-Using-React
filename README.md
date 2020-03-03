# Uglified Snapchat Web Application Using React

## Introduction

In this project, we built a facebook like website but with snapchat like magic expression to let you take ugly photos and show off with your friends. For this project:
- **React+Redux+Semantic UI** were used to build the frontend; 
- **Webrtc** was used to capture video, take photo for you and **Canvas API** was used to draw magic expression on your face; 
- **Spring MVC + Spring Boot + Spring Data JPA + PostgreSQL** were used to build the backend; 
- We also trained a Machine Learning model to detect your most ugly facial expression and take photos for you automatically.

The Project link is here: 
[https://glitch.com/~qweasd1-2560-front-end](https://glitch.com/~qweasd1-2560-front-end)

The github for this project is: 
[https://github.com/qweasd1/2560-final-code](https://github.com/qweasd1/2560-final-code)

The demo video can be seen here:
[https://www.youtube.com/watch?v=5YRP-h8iPiU&feature=youtu.be](https://www.youtube.com/watch?v=5YRP-h8iPiU&feature=youtu.be)

**To play with the project starts from here[https://qweasd1-2560-front-end.glitch.me/login](https://qweasd1-2560-front-end.glitch.me/login)**. To login
as admin user use: zhw65@pitt.edu/123456. To login as normal user, use yus84@pitt.edu/123456

Sometimes the backend is slow, so it might takes 5-6s to login

You need to fisrt login then you can see the data

To test responsive features, after you login, you can re-size the screen to small size and you will see the user information and friends list will disappear in small screen.



## Objective

There are a lot of social network websites like Facebook, Snapchat, Twitter, and Instagram etc. People use them to share with their friends about their daily life, important moments, and funny stories... But none of the sites supports taking distorted facial expressions of the user. We believe that integrating this function will greatly enhance the consumer entertainment experience leading to increased engagement from the followers. Therefore, we set our goal to build an innovating social network site by integrating such a facial management function. 

To achieve this goal, we chose to learn and use **React** as the frontend framework. Basically, this is because React has rising popularity in enterpises. In React, we can divide different UI into different components. Then we can reuse the components as needed and compose bigger functions from the smaller ones. React also provides Virtual DOM that facilates building the single page application. Last but not least, in React, we are allowed to use normal JavaScript expressions with JSX which makes easier for us to create templates. For the backend, we chose to learn and use **Spring MVC** to create **RESTful API** for accessing the data stored in **PostgreSQL** database. PostgreSQL is a powerful, open source object-relational database system. It supports an extensive list of data types: numeric, floating-point, string, boolean, monetary, enumerated, geometric, binary, network address, bit string, text search, xml, json, array, composite and range types, as well as some internal types for object identification and log location. Spring MVC was chosen for creating the RESTful APIs because it is a widely used framework that has a well-developed ecosystem.

## Team member’s contributions

**Zhendong Wang**: In charge of the roadmap, achitecture and milestone management of the whole project. Focused on buidling the face recognition application, image processing, and integrating different functions with the frontend and the backend.

**Yue Sun** Focused on the frontend UI design and development using React framework and Semantic UI. Worked on the database design and connections between the frontend and the backend. 

**Zheng Han**: Focused on creating the RESTful APIs using Spring Boot with Spring Data JPA to generate tables and access data in the database. Tested the APIs via Postman. 

## Technical Architecture

(**Teacher's requirment**: What are the libraries, frameworks, and other technologies you used and how did you put them together. Use the MVC conceptual model to provide a guide (i.e. what are the models/views/controllers and what do they do).

### For frontend: 

#### Libraries 
- react
- semantic-ui-react
- react-router
- react-router-dom
- react-redux

### For backend:

#### Defining the domain models
##### Picture.java
###### Libraries
- java.io.Serializable
- javax.persistence.*
- com.fasterxml.jackson.annotation.*
##### User.java
###### Libraries
- java.io.Serializable
- javax.persistence.*
- com.fasterxml.jackson.annotation.*

#### Defining the Repositories
##### PictureRepository.java
###### Libraries and models imported
- java.util.List
- org.springframework.data.jpa.repository.JpaRepository
- com.backend.uglyface.model.Picture (This is to import the Picture model following the defined directory)
##### UserRepository.java
###### Libraries and models imported
- org.springframework.data.jpa.repository.JpaRepository
- com.backend.uglyface.model.User (This is to import the User model following the defined directory)

#### Building the RESTful APIs
##### PictureContoller.java
###### Libraries and models imported
- java.util.List
- javax.validation.Valid
- org.springframework.beans.factory.annotation.Autowired
- org.springframework.web.bind.annotation.*
- com.backend.uglyface.exception.ResourceNotFoundException (This is to import the exeption handler following the defined directory)
- com.backend.uglyface.repository.UserRepository (This is to import the UserRepository following the defined directory)
- com.backend.uglyface.repository.PictureRepository (This is to import the PictureRepository following the defined directory)
- com.backend.uglyface.model.Picture (This is to import the Picture model following the defined directory)
##### UserController.java
###### Libraries and models imported
- java.util.List
- java.util.Optional
- javax.validation.Valid
- org.springframework.beans.factory.annotation.Autowired
- org.springframework.web.bind.annotation.*
- com.backend.uglyface.exception.ResourceNotFoundException (This is to import the exeption handler following the defined directory)
- com.backend.uglyface.repository.UserRepository  (This is to import the UserRepository following the defined directory)
- com.backend.uglyface.model.User (This is to import the User model following the defined directory)

#### Exception handling
##### ResourceNotFoundException.java
###### Libraries
- org.springframework.http.HttpStatus
- org.springframework.web.bind.annotation.ResponseStatus

#### Main APIs and sample URLs tested via Postman

- Register  

  url: https://tonybear2560.tk/auth/signup 
  
  Method: POST
  
- Login: 
  
  url: https://tonybear2560.tk/auth/login 
  
  Method: POST
  
- Get/Add/Update users infos:
  
  url: https://tonybear2560.tk/users
  
  Method: GET/POST/PUT
  
- Get/Delete article infos
  
  url: https://tonybear2560.tk/articles
  
  Method: GET/Delete
  
- Add article by user
  
  url: https://tonybear2560.tk/users/:userId/articles
  
  Method: POST
  
since we nested the comments and faces in article and user as json, so some complex logic is simplified in the two PUT end point.

## Challenges


* It's actually quite hard to use react+redux to call RESTful API, too much code to write, so we use async/await features to implement it in a more easier way.
* To inetegrate the face recognition functions to the project is also quite hard and to gurantee the performance of it, we actually do some improvement on WebGL code part.
* Spring MVC has too much boilerplate code to write to implement even simple functions.
* The integration for JWT is much harder for Spring MVC than using a backend like express.



## Future Work

* Use better face recognition algorithm with WebAssembly.
* Add more functions for social media part like admin can do more things on the website.




