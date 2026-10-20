import express from "express";
import cors from "cors";
import { reservaRoutes } from "./routes/reservasRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/reservas", reservaRoutes);

app.listen(3001, () => {
    console.log("Servidor rodando em http://localhost:3001");
});