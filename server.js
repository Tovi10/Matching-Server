const { http } = require('./app');

http.listen(process.env.PORT || 4000, function () {
    console.log("Express server listening on port %d in -- mode", this.address().port);
});

