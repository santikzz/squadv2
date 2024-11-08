const setupApiRoutes = (app) => {

    app.use('/auth',                                require('./auth'));
    app.use('/api/environment',                     require('./env'));
    app.use('/api/users',                           require('./user'));
    app.use('/api/groups',                          require('./group'));
    app.use('/api/notifications',                   require('./notification'));
    app.use('/api/messages',                        require('./message'));

}

module.exports = setupApiRoutes;