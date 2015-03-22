'use strict';

export function serverRoutes (app) {

  // Insert routes below
  //app.use('/api/ingredients', require('./api/ingredient'));
  //app.use('/api/recipes', require('./api/recipe'));

  app.use('/api/users', require('./api/users'));

  app.use('/auth', require('./auth'));

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
    .get(function(req,res){
      res.send(404);
    });

  //Server render Client

  app.route('/').get(function(req,res){
    res.send('ok');
  });

  // All other routes should redirect to the index.html
  app.route('*//*')
    .get(function (req, res) {
      res.send(200);
    });
};
