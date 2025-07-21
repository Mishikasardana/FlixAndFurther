# FlixAndFurther

**Your One-Stop Multimedia Experience**  
FlixAndFurther is an all-in-one platform to **stream movies, binge web series**, and **listen to soundtracks**, without switching apps. It provides **intelligent recommendations** based on genres, likes/dislikes, platform availability, and user ratings.


##  Overview

> “Watch. Listen. Discover — All in One Place.”

This full-stack web application merges video and audio content delivery with smart user personalization. It features:

- Trending, Popular, and New content sections
- Movie-based audio streaming
- Personalized Recommendations
- Genre + Rating + Platform-based filtering



## Tech Stack

### Frontend
- HTML5, CSS3 (Custom + Responsive)
- JavaScript (Vanilla)
- Organized views (movies, series, trending, etc.)

### Backend
- Node.js
- Express.js

### Database
- Oracle DB (via `oracledb` Node.js package)



## 📂 Project Structure

```
FlixAndFurther/
├── client/
│   ├── trending/
│   │   └── image.css
│   ├── index.html
│   ├── movies.html
│   ├── series.html
│   ├── new.html
│   ├── popular.html
│   ├── login_page.html
│   ├── sign-in.html
│   ├── new_landing.html
│   ├── video.mp4
│   ├── javaScript.js
│   ├── style.css
│   ├── responsive.css
│   └── website_logo.png
│
├── server/
│   ├── config/         # Oracle DB config
│   ├── controllers/    # Route logic
│   ├── models/         # DB queries
│   ├── routes/         # API endpoints
│
├── .env
├── .gitignore
├── index.js            # Express server entry point
├── package.json
└── README.md




##  Frontend Usage

Open `client/index.html` in any browser. You can also serve it via:




## 📡 API Endpoints Overview

| Method | Endpoint             | Description                      |
|--------|----------------------|----------------------------------|
| GET    | `/api/movies`        | Fetch all movies                 |
| POST   | `/api/users/signup`  | Register a new user              |
| POST   | `/api/ratings`       | Submit movie rating              |
| GET    | `/api/recommend`     | Get recommended content          |



##  Recommendation System

Combines:

- **Content-based filtering** (genre, actors, director)
- **Collaborative filtering** (likes/dislikes, user ratings)
- **Platform filtering** (only shows content available to the user)



## UI Pages

| Page             | Description                              |
|------------------|------------------------------------------|
| `index.html`     | Landing page                             |
| `movies.html`    | Movie listing page                       |
| `series.html`    | Web series section                       |
| `popular.html`   | Popular movies/series                    |
| `new.html`       | New releases                             |
| `login_page.html`| Login screen                             |
| `sign-in.html`   | Sign up/registration                     |
| `new_landing.html`| Redirect post login                     |

-


##  Future Roadmap

- [ ]  Real-time search with autocomplete
- [ ]  User mood-based recommendations
- [ ]  Mobile responsive improvements
- [ ]  Cloud hosting + DB deployment



##  Contributing

Feel free to fork and raise a pull request. Please document all new routes and modules.



##  License

Licensed under [MIT](LICENSE)



## Author

**Mishika Sardana**  
