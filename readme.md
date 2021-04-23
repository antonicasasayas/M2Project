# Project Name

<br>



## Description

Post comments about your favorite movies and search for any movie's details.



<br>

## User Stories

- **404** - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault
- **500** - As a user I want to see a nice error page when the super team screws it up so that I know that is not my fault
- **homepage** - As a user I want to be able to log in and sign up. 
- **sign up** - As a user I want to sign up on the web page so that I can comment on my favorite films.
- **login** - As a user I want to be able to log in on the web page so that I can get back to my account
- **interact with posts** - As a user I want to be able to create, edit, find and delete my posts.
- **result** - As a user I want to see the feed with all the posts created.
- **movie details** - As a user I want to see more details of the movies.



<br>



## Server Routes (Back-end):



| **Method** | **Route**                          | **Description**                                              | Request  - Body                                          |
| ---------- | ---------------------------------- | ------------------------------------------------------------ | -------------------------------------------------------- |
| `GET`      | `/`                                | Main page route.  Renders home `index` view.                 |                                                          |
| `GET`      | `/auth/login`                           | Renders `login` form view.                                   |                                                          |
| `POST`     | `/auth/login`                           | Sends Login form data to the server.                         | { email, password }                                      |
| `GET`      | `/auth/signup`                          | Renders `signup` form view.                                  |                                                          |
| `POST`     | `/auth/signup`                          | Sends Sign Up info to the server and creates user in the DB. | {  email, password  }                                    |
| `GET`      | `/private/tags`            | Private route. Renders `quiz` form view.             |                                                          |
| `POST`      | `/private/tags`            | Private route. Sends favorite tags info to the server |  |
| `GET`      | `/private/recommendations`               | Private route. Render the `recommendations` view.                  |                                                          |
| `GET`   | `/private/feed` | Private route. Renders the `feed` view |                                                          |
| `POST`      | `/private/feed`                     | Allows the user to CRUD a post.                              |                                                          |
| `GET`      | `/private/search`         | Renders `search` search view. |                                                          |
| `POST`      | `/private/search`         | Sends query info to the server. |                                                          |
| `GET`      | `/private/movie-details`         | Renders `movie-details` movie-details view. |                                                          |
| `GET`      | `/private/profile`         | Renders `profile` profile view. |                                                          |







## Models

User model

```javascript
{
    username: { type: String, required: true, unique: true },
    password: { type: String },
    posts: [String], 
    favGenres: [String]
    
}
```

Movie model

```javascript

{
  title: { type: String },
  author: String,  
  rate: { type: Number}, 
  date: { type: Date },
  genres: [String] 
}

```

Post model 

```javascript

{
  title: { type: String },
  author: String,
  date: { type: Date },
  content: String

}

```

<br>



## Backlog

[See the Trello board.](https://trello.com/b/1qRaaSko/m2-project)



<br>



## Links



### Git

The url to your repository and to your deployed project

[Repository Link](https://github.com/antonicasasayas/M2Project)

[Deploy Link]()



<br>



### Slides

The url to your presentation slides

[Slides Link]()