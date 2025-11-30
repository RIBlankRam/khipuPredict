import app from "./app.js";
import graphRoutes from "./routes/graphRoutes.js";

const PORT = 3000;


app.use("/api/graph", graphRoutes);

// LUEGO inicia el servidor
app.listen(PORT, () => {
    console.log("API ejecutándose en http://localhost:" + PORT);
});
