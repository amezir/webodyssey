// back/app.js
const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
const port = 3001;

const crypto = require("crypto");
const nodemailer = require("nodemailer");
const { log } = require("console");

const pdf = require("pdf-creator-node");
const fs = require("fs");

const jwt = require('jsonwebtoken');

// Generate a random secure token
const generateSecretKey = () => {
  return crypto.randomBytes(32).toString('hex');
};

// Generate and log the secret key
const secretKey = generateSecretKey();
console.log('Generated Secret Key:', secretKey);

// Configuration de l'envoi d'e-mails avec nodemailer
const transporter = nodemailer.createTransport({
  host: 'utah.o2switch.net',
  port: 465,
  secure: true,
  auth: {
    user: "contact@webodyssey-mmi.fr",
    pass: "*>eMKwnq82^#P3F",
  },
});

app.use(cors());

// Middleware pour analyser le corps des requêtes au format JSON
app.use(express.json());

// Configuration de la connexion à la base de données MySQL
const db = mysql.createConnection({
  host: "localhost",
  port: "3306",
  user: "root",
  // password: "root",
  password: "",

  // port: "3306",
  // user: "nsebahoun_WebOdyssey",
  // password: "webOdyssey_PWD",

  // database: "nsebahoun_webodyssey",
  database: "webodyssey",
  multipleStatements: true,
});


app.get("/", (req, res) => {
  res.send("Backend is running!");

  db.connect((result) => {
    if (result) {
      res.send("Well Done !", result)
    } else {
      res.send("Access Denied !")
    }
  });

  if (db.connect()) {
    res.json("Well Done !")
  } else {
    res.json("Access Denied !")
  }
});



// Route pour récupérer des données depuis la base de données
app.get("/getReservations", (req, res) => {
  const query =
    "SELECT * FROM VISITEUR, RESERVATION WHERE ext_id_reservation=id_reservation";

  db.query(query, (err, result) => {
    if (result) {
      res.json(result)
    } else {
      console.error("Erreur lors de la récupération des données :", err);

      res.status(500).json({ error: "Erreur serveur", err });
    }
  });
});
// Route pour récupérer des données depuis la base de données
app.get("/getValidateReservations", (req, res) => {
  const query =
    "SELECT * FROM VISITEUR, RESERVATION WHERE ext_id_reservation=id_reservation AND accepted=true";

  db.query(query, (err, result) => {
    if (err) {
      console.error("Erreur lors de la récupération des données :", err);
      res.status(500).send("Erreur serveur", err);
    } else {
      res.json(result);
    }
  });
});
// Route pour récupérer des données depuis la base de données
app.get("/getWaitingReservations", (req, res) => {
  const query =
    "SELECT * FROM VISITEUR, RESERVATION WHERE ext_id_reservation=id_reservation AND accepted!=true";

  db.query(query, (err, result) => {
    if (err) {
      console.error("Erreur lors de la récupération des données :", err);
      res.status(500).send("Erreur serveur", err);
    } else {
      res.json(result);
    }
  });
});


// Route pour insérer une nouvelle réservation
app.post("/postReservations", (req, resRoute) => {
  const { name, firstName, mail, promo } = req.body;
  console.log(req.body);

  if (name === "" || firstName === "" || mail === "" || promo === "") {
    return resRoute.status(400).json({ error: "Tous les champs sont requis" });
  }

  const insertReservationQuery =
    "INSERT INTO RESERVATION (dateResa) VALUES (NOW())";

  // Execute insertReservationQuery first
  db.query(insertReservationQuery, (err, resultReservation) => {
    if (err) {
      console.error(
        "Erreur lors de l'insertion de la réservation :",
        err
      );
      resRoute.status(500).json({ error: "Erreur serveur" });
    } else {
      // Récupérer l'ID généré
      const lastIdReservation = resultReservation.insertId;

      const insertionQuery =
        "INSERT INTO VISITEUR (name, firstName, mail, promo, ext_id_reservation) VALUES (?, ?, ?, ?, ?)";

      // Then execute insertionQuery with the retrieved lastIdReservation
      db.query(
        insertionQuery,
        [name, firstName, mail, promo, lastIdReservation],
        (err) => {
          if (err) {
            console.error(
              "Erreur lors de l'insertion des données dans VISITEUR :",
              err
            );
            resRoute.status(500).json({ error: "Erreur serveur" });
          } else {
            // Replace "Mail du visiteur" with the dynamically obtained email 'mail'
            // sendReceptionEmail(mail, firstName);

            resRoute.status(200).json({
              message: "Réservation ajoutée avec succès",
            });
          }
        }
      );
    }
  });
});


// Route pour accepter une réservation ou non
app.post("/acceptReservation", (req, res) => {
  const { id, adminResponse } = req.body;

  if (!id || adminResponse === undefined) {
    return res.status(400).json({ error: "ID et adminResponse requis" });
  }

  // Modifiez le nom du champ 'accepted' en fonction de votre structure de base de données
  const updateQuery =
    "UPDATE RESERVATION SET accepted = ? WHERE id_reservation = ?";

  // Utilisez une valeur booléenne en fonction de la réponse de l'admin
  const acceptedValue = adminResponse === true ? 1 : 0;

  db.query(updateQuery, [acceptedValue, id], (err) => {
    if (err) {
      console.error("Erreur lors de la mise à jour de la réservation :", err);
      res.status(500).send("Erreur serveur");
    } else {
      if (adminResponse) {
        // Récupérer le nom et le prénom du visiteur
        const getVisitorNameQuery =
          "SELECT name, firstName, mail, dateResa, id_reservation FROM VISITEUR JOIN RESERVATION ON ext_id_reservation = id_reservation WHERE ext_id_reservation = ?";
        db.query(getVisitorNameQuery, [id], (err, result) => {
          if (result) {
            const name = result[0].name;
            const firstName = result[0].firstName;
            const mail = result[0].mail;
            const idResa = result[0].id_reservation;
            const dateResa = result[0].dateResa;

            // Générer le PDF avec le nom et prénom du visiteur
            generatePDF(name, firstName, mail, idResa, dateResa);

            // Envoyer l'e-mail de confirmation
            sendConfirmationEmail(visitorEmail, name, firstName);
          } else {
            console.error(
              "Erreur lors de la récupération du nom et prénom du visiteur :",
              err
            );
            res.status(500).send("Erreur serveur");
          }
        });
      }
      const successMessage = adminResponse
        ? "Réservation acceptée avec succès"
        : "Réservation refusée avec succès";
      res.json({ message: successMessage });
    }
  });
});

// Ajoutez cette route à votre fichier de gestion des routes côté serveur
app.post("/cancelReservation", (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ error: "ID requis" });
  }

  const deleteQuery = "DELETE FROM RESERVATION WHERE id_reservation = ?";

  db.query(deleteQuery, [id], (err) => {
    if (err) {
      console.error("Erreur lors de la suppression de la réservation :", err);
      res.status(500).send("Erreur serveur");
    } else {
      res.json({ message: "Réservation annulée avec succès" });
    }
  });
});

//route pour envoyer le ticket la confirmation de visite au visiteur
function sendConfirmationEmail(visitorEmail, name, firstName) {
  const mailOptions = {
    from: "WebOdyssey <contact@webodyssey-mmi.fr>",
    to: visitorEmail,
    subject: "Ticket d'entrée",
    // text: "Votre réservation a été acceptée. Merci de votre visite!",
    html: `
    <html>
    <div style="padding:20px">
            <h1>Bonjour ` + visitorFirstName + ` !</h1>
            <p>Votre réservation a bien confirmée par nos administrateurs !</p>
            <p>Vous trouverez ci-joint votre ticket au format PDF. Pensez à vous munir d'une pièce d'identité le jour de l'évènement. Sans celle-ci, l'accès peut vous être refusé.</p>
            <p>En attendant, veuillez réserver la date du <b>13 juin, à partir de 18h, à l'IUT de Champs-sur-marne.</b></p>
            <p><b>Pour toute question, n'hésitez pas à nous contacter à l'adresse <a href="mailto:contact@webodyssey-mmi.fr">contact@webodyssey-mmi.fr</a>.</b></p>
            </br>
            <p style="opacity:0.7;">À très vite !</p>
            <p style="opacity:0.7;"><b>L'équipe WebOdyssey</b></p>
            </div>
            <style>
            h1, p {
                font-family: 'Helvetica', sans-serif;
                text-align: center;
                max-width: 1000px;
            }
            a {
                text-decoration:none;
                color:#6040ff !important;
            }
            h1 {
                color: #6040ff !important;
            }

            </style>
    </html>
    `,
    attachments: [
      {
        filename: `reservation_web_odyssey_${name}_${firstName}.pdf`,
        path: `./pdf/reservation_web_odyssey_${name}_${firstName}.pdf`,
      },
    ],
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Erreur lors de l'envoi de l'e-mail :", error);
    } else {
      console.log("E-mail envoyé avec succès :", info.response);
    }
  });
}


// // route pour envoyer l'accusé de reception au visiteur
function sendReceptionEmail(visitorEmail, visitorFirstName) {
  const mailOptions = {
    from: "WebOdyssey <contact@webodyssey-mmi.fr>",
    to: visitorEmail,
    subject: "Merci pour votre réservation !",
    //text: "Votre réservation a bien été prise en compte. Vous receverez prochainement un mail contenant votre ticket. Merci de votre réservation !",
    html: `
    <html>
    <div style="padding:20px">
            <h1>Merci ` + visitorFirstName + ` !</h1><p>Votre réservation a bien été enregistrée.</p>
            <p>Vous recevrez votre billet d'entrée par mail une fois votre inscription validée par l’équipe.</p>
            <p>En attendant, veuillez réserver la date du <b>13 juin, à partir de 18h, à l'IUT de Champs-sur-marne.</b></p>
            <p><b>Pour toute question, n'hésitez pas à nous contacter à l'adresse <a href="mailto:contact@webodyssey-mmi.fr">contact@webodyssey-mmi.fr</a>.</b></p>
            </br>
            <p style="opacity:0.7;">À bientôt !</p>
            <p style="opacity:0.7;"><b>L'équipe WebOdyssey</b></p>
            </div>
            <style>
            h1, p {
                font-family: 'Helvetica', sans-serif;
                text-align: center;
                max-width: 1000px;
            }
            a {
                text-decoration:none;
                color:#6040ff !important;
            }
            h1 {
                color: #6040ff !important;
            }

            </style>
    </html>
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Erreur lors de l'envoi de l'e-mail :", error);
    } else {
      console.log("E-mail envoyé avec succès à l'adresse ", visitorEmail, info.response);
    }
  });
}

function generatePDF(name, firstName, mail, idResa, dateResa) {
  console.log("Generating PDF for:", name, firstName);
  const formattedDate = formatDate(dateResa);

  // Read HTML Template
  var html = fs.readFileSync("template.html", "utf8");

  var options = {
    format: "A4",
    orientation: "portrait",
    width: "210mm",
    height: "297mm",
    border: "0mm",
    header: {
      height: "0mm",
    },
    footer: {
      height: "0mm",
    },
  };

  var users = [
    {
      name: name,
      firstName: firstName,
      dateResa: formattedDate,
      id: idResa,
      mail: mail,
    },
  ];

  var document = {
    html: html,
    data: {
      users: users,
    },
    path: `./pdf/reservation_web_odyssey_${name}_${firstName}.pdf`,
    type: "",
  };

  pdf
    .create(document, options)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.error("Error creating PDF:", error);
    });
}

// Fonction pour formater la date
function formatDate(date) {
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  };
  return new Date(date).toLocaleDateString("fr-FR", options).replace(',', 'à');
}

// Route pour modifié le mot de passe
app.post("/updatePassword", (req, res) => {
  const { password } = req.body;

  if (!password) {
    return res.status(400).json({ error: "Mot de passe requis" });
  }

  // Hasher le mot de passe avec SHA-256
  const hashedPassword = crypto
    .createHash("sha256")
    .update(password)
    .digest("hex");

  // Insérer l'utilisateur avec le mot de passe hashé
  const insertUserQuery = "ALTER TABLE USER (password) VALUES (?)";

  db.query(insertUserQuery, hashedPassword, (err, dbRes) => {
    if (err) {
      console.error("Erreur lors de la restauration du mot de passe :", err);
      res.status(500).send("Erreur serveur");
    } else {
      res.json({ message: "Mot de passe changé avec succès" });
    }
  });
});

// Route pour la connexion


app.post("/login", (req, res) => {
  const { login, password } = req.body;

  if (!login || !password) {
    return res
      .status(400)
      .json({ error: "Nom d'utilisateur et mot de passe requis" });
  }

  // Hash the password using SHA-256
  const hashedPassword = crypto
    .createHash("sha256")
    .update(password)
    .digest("hex");

  // Check the login and password in the USER table
  const checkUserQuery = "SELECT * FROM USER WHERE login = ? AND password = ?";

  db.query(checkUserQuery, [login, hashedPassword], (err, result) => {
    if (err) {
      console.error("Error while checking user:", err);
      return res.status(500).json({ error: "Erreur serveur" });
    }

    if (result.length > 0) {
      try {
        const user = result[0];
        const token = jwt.sign({ userId: user._id }, secretKey, {
          expiresIn: '1h',
        });
        return res.json({ message: "Connexion réussie", token: token });
      } catch (error) {
        return res.status(500).json({ error: 'Erreur lors de la génération du token' });
      }
    } else {
      return res.status(401).json({ error: "Nom d'utilisateur ou mot de passe incorrect" });
    }
  });
});

//check if Token is signed with secret key
app.post("/verifyToken", (req, res) => {
  const token = req.body;
  if (!token) {
    return res.status(400).json({ message: "Token not provided" });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Token invalid" });
    }
    // Token is valid
    res.json({ message: "Token verified", decoded });
  });
});

app.get("/countReservations", (req, res) => {
  const query = "SELECT COUNT(DISTINCT id_reservation) AS reservation_count FROM RESERVATION";

  db.query(query, (err, result) => {
    if (err) {
      console.error("Erreur lors de la récupération des données :", err);
      res.status(500).json({ error: "Erreur serveur" });
    } else {
      const count = result[0].reservation_count;
      res.json({ count });
    }
  });
});

app.get("/countAcceptedReservations", (req, res) => {
  const query = "SELECT COUNT(DISTINCT id_reservation) AS acceptedReservation_count FROM RESERVATION WHERE accepted = 1";

  db.query(query, (err, result) => {
    if (err) {
      console.error("Erreur lors de la récupération des données :", err);
      res.status(500).json({ error: "Erreur serveur" });
    } else {
      const count = result[0].acceptedReservation_count;
      res.json({ count }); 
    }
  });
});

app.get("/countWaitingReservations", (req, res) => {
  const query = "SELECT COUNT(DISTINCT id_reservation) AS waitingReservation_count FROM RESERVATION WHERE accepted = 0";

  db.query(query, (err, result) => {
    if (err) {
      console.error("Erreur lors de la récupération des données :", err);
      res.status(500).json({ error: "Erreur serveur" }); 
    } else {
      const count = result[0].waitingReservation_count;
      res.json({ count }); 
    }
  }
  );
});



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});