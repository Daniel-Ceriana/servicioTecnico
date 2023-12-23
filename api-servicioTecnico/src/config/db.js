const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log("data base connected"))
  .catch((err) => console.log(err));
// falta cerrar la conexion cuando se la deje de usar
