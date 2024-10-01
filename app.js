// app.js
const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const userRoutes = require("./routes/userRoutes");
const portfolioRoutes = require("./routes/portfolioRoutes");
const skillRoutes = require("./routes/skillRoutes");
const userSkillRoutes = require("./routes/userSkillRoutes");
const authRoutes = require("./routes/authRoutes");
const serviceRoutes = require("./routes/serviceRoutes");
const orderRoutes = require("./routes/orderRoutes");
const midtransRoutes = require("./routes/midtransRoutes");
const RatingRoutes = require("./routes/RatingRoutes");
const bankAccountRoutes = require("./routes/bankAccountRoutes");
const bankRoutes = require("./routes/bankRoutes");
const skillSwapRoutes = require("./routes/skillSwapRoutes");
const waRoutes = require("./routes/waRoutes");
require("dotenv").config();

// Import koneksi database
const { connect } = require('./config/database');

// Panggil fungsi connect untuk menghubungkan ke database
connect();

// Middleware untuk menambahkan header Access-Control-Allow-Origin secara manual
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,PUT,PATCH,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// Setup Swagger options
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Documentation for SkillHub Application",
      version: "1.0.0",
      description: `Dokumentasi untuk endpoint API dari aplikasi SkillHub. Aplikasi ini mencakup berbagai fitur, termasuk manajemen pengguna, portofolio, keterampilan, layanan, dan pesanan. Dokumentasi ini bertujuan untuk mempermudah pengembang dalam memahami dan menggunakan API yang disediakan.

      Contoh penggunaan API:
      1. **GET** semua pengguna: \`https://skillhub-esdlaboratory.loca.lt/api/users\`
      2. **GET** semua layanan: \`https://skillhub-esdlaboratory.loca.lt/api/services\`
      3. **GET** semua portofolio: \`https://skillhub-esdlaboratory.loca.lt/api/portfolios\`
      `,
    },
    servers: [
      {
        url: "https://skillhub-esdlaboratory.loca.lt/api", // Ubah URL untuk pengembangan lokal
        description: "Development server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./routes/*.js"], // Path to the API docs
};

// Generate Swagger docs
const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

const corsOptions = {
  origin: "*", // Mengizinkan semua origin
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true, // Jika kamu perlu mengirim cookie atau autentikasi berbasis sesi
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(bodyParser.json()); // For parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded
app.use(fileUpload());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// API routes
app.use("/api", userRoutes);
app.use("/api", portfolioRoutes);
app.use("/api", skillRoutes);
app.use("/api", userSkillRoutes);
app.use("/api", authRoutes);
app.use("/api", serviceRoutes);
app.use("/api", orderRoutes);
app.use("/api", midtransRoutes);
app.use("/api", RatingRoutes);
app.use("/api", bankRoutes);
app.use("/api", bankAccountRoutes);
app.use("/api", skillSwapRoutes);
app.use("/api", waRoutes);

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;
