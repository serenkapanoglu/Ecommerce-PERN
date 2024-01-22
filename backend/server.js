/*"use strict";

const app = require("./app");
const { PORT } = require("./config");

app.listen(PORT, function () {
  console.log(`Started on http://localhost:${PORT}`);
}); */

// server.js

/*"use strict";

const app = require("./app");
const { PORT } = require("./config");

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
*/
// app.js
"use strict";
/*const express = require("express");
const cors = require("cors");
const { authenticateJWT } = require("./middleware/auth");  // authenticateJWT fonksiyonunu ekleyin
const app = express();

app.use(cors());
app.use(express.json());
app.use(authenticateJWT);  // authenticateJWT fonksiyonunu kullanın

// Diğer middleware'leri ve rotaları buraya ekleyin

app.listen(3001, () => {
    console.log("Server is running on port 3001");
}); */

const app = require("./app");
const { PORT } = require("./config");

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});


