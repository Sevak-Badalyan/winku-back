import express from 'express';
import auth from './auth.api';
import posts from './posts.api';
import users from './users.api';
import comments from './comments.api';
import replies from './replies.api';
import upload from './upload.api';
import friends from './friends.api';
import friendsrequests from './friends.requests.api';
import groups from './groups.api';
import members from './members.api';
import get from './get'

// 

const app = express();
app.use(express.json());

app.use('/auth', auth);
app.use('/users', users);
app.use('/newsfeed', posts);
app.use('/comments', comments);
app.use('/replies', replies);
app.use('/upload', upload);
app.use('/friends', friends);
app.use('/friends-requests',friendsrequests);
app.use('/groups', groups);
app.use('/members', members);
app.use('/',get)







export default app;