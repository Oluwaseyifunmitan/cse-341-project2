const express = require("express");
const mongodb = require("./data/database");
const bodyParser = require('body-parser');
const passport = require("passport");
const session = require("express-session");
const GithubStrategy = require('passport-github2').Strategy;
const cors = require("cors");
const errorHandler = require('./middleware/errorHandler');
const app = express();

const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-type, Accept, Z-key');
    res.setHeader('Access-Control-Allow-Method', 'GET,POST,PUT,DELETE,OPTIONS');
    next();
  })
app.use(cors({method:['GET','POST','DELETE','UPDATE','PUT','PATCH']}));
app.use(cors({origin: '*'}))

app.use("/", require("./routes"));
passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.CALLBACK_URL
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Find or create user in DB here
        const user = {
          githubId: profile.id,
          username: profile.username,
          profileUrl: profile.profileUrl
        };

        return done(null, user);
      } catch (error) {
        done(error, null);
      }
    }
  )
);

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

app.get('/', (req,res)=> {res.send(req.session.user !== undefined? `Logged in as ${req.session.user.displayName}`:"Logged Out")});

app.get('/auth/github/callback', passport.authenticate('github',{
  failureRedirect: '/api-docs', session: false
}),(req,res)=>{
req.session.user =req.user;
res.redirect('/');
});

app.use(errorHandler);




mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port, () => {
      console.log(`Web Server is listening at port ${port}`);
    });
  }
});
