import app from "./app";
import config from "./confing/config";

const port = config.port;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
