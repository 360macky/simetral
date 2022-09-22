import express from "express";
import cors from "cors";
import { WebSocketServer } from "ws";
import { graphqlHTTP } from "express-graphql";
import { useServer } from "graphql-ws/lib/use/ws";

import { schema } from "./server";

const app = express();
const port = process.env.PORT || 4000;
const endpointPath = `/${process.env.ENDPOINT_PATH || "graphql"}`;

app.use(cors());
app.use(endpointPath, graphqlHTTP({ schema }));

const server = app.listen(port, () => {
  console.log(
    `✅ Development server hosted at: http://localhost:${port}${endpointPath}`
  );
  console.log(
    "⚡️ Now you can use Graphem plugin to visualize the data in NASA Open MCT"
  );
  console.log(
    "Learn more about Graphem at: https://github.com/360macky/graphem"
  );
  const wsServer = new WebSocketServer({
    server,
    path: endpointPath,
  });
  useServer({ schema }, wsServer);
});
