const express = require('express');

const Users = require('./userDb.js');
const Posts = require('../posts/postDb.js');

const router = express.Router();

router.post('/', validateUser, (req, res) => {
  // no need to validate here because validateUser already did that
  Users.insert(req.body)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(error => {
      // good to see the error during development
      console.log('POST /api/users Error', error);

      res.status(500).json({ error: 'We ran into an error creating the user' });
    });
});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
  const postData = { ...req.body, user_id: req.params.id };

  Posts.insert(postData)
    .then(post => {
      res.status(201).json(post);
    })
    .catch(error => {
      // good to see the error during development
      console.log('POST /api/users/:id/posts Error', error);

      res.status(500).json({ error: 'We ran into an error creating the post' });
    });
});

router.get('/', (req, res) => {
  Users.get()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(error => {
      // good to see the error during development
      console.log('GET /api/users Error', error);

      res
        .status(500)
        .json({ error: 'We ran into an error retrieving the users' });
    });
});

// no need to validate the user id here,
// the endpoint returns 404 if the user is not found
router.get('/', (req, res) => {
  Users.get()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(error => {
      // good to see the error during development
      console.log('GET /api/users Error', error);

      res
        .status(500)
        .json({ error: 'We ran into an error retrieving the users' });
    });
});

router.get('/:id/posts', validateUserId, (req, res) => {
  Users.getUserPosts(req.params.id)
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(error => {
      // good to see the error during development
      console.log('GET /api/user/:id/posts Error', error);

      res
        .status(500)
        .json({ error: "We ran into an error retrieving the user's posts" });
    });
});

router.delete('/:id', validateUserId, (req, res) => {
  Users.remove(req.params.id)
    .then(() => {
      res.status(200).json({ message: 'user deleted successfully' });
    })
    .catch(error => {
      // good to see the error during development
      console.log('DELETE /api/user/:id Error', error);

      res.status(500).json({ error: 'We ran into an error removing the user' });
    });
});

router.put('/:id', validateUserId, validateUser, (req, res) => {
  Users.update(req.params.id, req.body)
    .then(() => {
      res.status(200).json({ message: 'User updated successfully' });
    })
    .catch(error => {
      // good to see the error during development
      console.log('PUT /api/user/:id Error', error);

      res.status(500).json({ error: 'We ran into an error removing the user' });
    });
});

//custom middleware

function validateUserId(req, res, next) {
  Users.getById(req.params.id)
    .then(user => {
      if (user) {
        req.user = user;

        next();
      } else {
        res.status(400).json({ message: 'Invalid user id' });
      }
    })
    .catch(error => {
      // good to see the error during development
      console.log('validateUserId() Error', error);

      res
        .status(500)
        .json({ error: 'We ran into an error searching for the user' });
    });
}

function validateUser(req, res, next) {
  if (!req.body || Object.keys(req.body).length === 0) {
    res.status(400).json({ message: 'missing user data' });
  } else if (!req.body.name) {
    res.status(400).json({ message: 'missing required name field' });
  } else {
    next();
  }
}

function validatePost(req, res, next) {
  if (!req.body || Object.keys(req.body).length === 0) {
    res.status(400).json({ message: 'missing post data' });
  } else if (!req.body.text) {
    res.status(400).json({ message: 'missing required text field' });
  } else {
    next();
  }
}

module.exports = router;
