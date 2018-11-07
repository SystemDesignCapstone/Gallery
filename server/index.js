const app = require('./app');

const port = 1128;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});