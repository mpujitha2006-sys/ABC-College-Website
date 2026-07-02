const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const session = require("express-session");
const app = express();

app.use(express.json());

app.use(
  session({
    secret: "abccollege",
    resave: false,
    saveUninitialized: true,
  }),
);

app.use(express.static("public"));

app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.log(
      "Database connection failed:",
      err,
    );
  } else {
    console.log("Connected to MySQL");
  }
});

app.use(express.static("public"));
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  db.query(
    "UPDATE visitors SET total_visitors = total_visitors + 1 WHERE id = 1",
    (err) => {
      if (err) console.log(err);

      res.render("index");
    },
  );
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/departments", (req, res) => {
  res.render("departments");
});

app.get("/courses", (req, res) => {
  res.render("courses");
});

app.get("/gallery", (req, res) => {
  res.render("gallery");
});

app.get("/contact", (req, res) => {
  res.render("contact");
});

app.post("/contact", (req, res) => {
  const {
    name,
    email,
    subject,
    message,
  } = req.body;

  if (
    !name ||
    !email ||
    !subject ||
    !message ||
    name.trim() === "" ||
    email.trim() === "" ||
    subject.trim() === "" ||
    message.trim() === ""
  ) {
    return res.send(
      "Please fill all fields.",
    );
  }

  const sql =
    "INSERT INTO contacts (name, email, subject, message) VALUES (?, ?, ?, ?)";

  db.query(
    sql,
    [name, email, subject, message],
    (err, result) => {
      if (err) {
        console.log(err);

        return res.send(
          "Error saving message.",
        );
      }
      res.redirect("/contact");
    },
  );
});

app.get("/admin-login", (req, res) => {
  res.render("admin-login", {
    error: req.query.error,
  });
});

app.post("/admin-login", (req, res) => {
  const { username, password } =
    req.body;

  if (
    username === "admin" &&
    password === "admin123"
  ) {
    req.session.loggedIn = true;
    res.redirect("/admin");
  } else {
    res.redirect(
      "/admin-login?error=true",
    );
  }
});

app.get("/admin", (req, res) => {
  if (!req.session.loggedIn) {
    return res.redirect("/admin-login");
  }
  const sql = "SELECT * FROM contacts";

  db.query(sql, (err, results) => {
    if (err) {
      console.log(err);
      res.send("Error fetching data");
    } else {
      res.render("admin", {
        contacts: results,
      });
    }
  });
});

app.get("/delete/:id", (req, res) => {
  if (!req.session.loggedIn) {
    return res.redirect("/admin-login");
  }

  const id = req.params.id;

  const sql =
    "DELETE FROM contacts WHERE id = ?";

  db.query(sql, [id], (err) => {
    if (err) {
      console.log(err);
      return res.send(
        "Error deleting message",
      );
    }

    res.redirect("/admin");
  });
});

app.get("/logout", (req, res) => {
  req.session.destroy();

  res.redirect("/admin-login");
});

app.listen(3000, () => {
  console.log("Server running");
});

app.use((req, res) => {
  res.status(404).render("404");
});
