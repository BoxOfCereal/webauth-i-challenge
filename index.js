const server = require("./server");
const PORT = process.env.PORT || 9001;

server.listen(PORT, () => {
  console.log(`server listening on ${PORT}`);
});
