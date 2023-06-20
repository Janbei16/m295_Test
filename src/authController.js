exports.login =
  ("/login",
  (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    //von stackoverflow kopiert
    const checkEmail = email
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );

    if (checkEmail && password === "m295") {
      req.session.user = { email: email, password: password };
      res.status(200).send("Login erfolgreich");
    } else {
      res.status(401).send("Login fehlgeschlagen");
    }
  });

exports.verify = (req, res) => {
  if (req.session.user) {
    res.status(200).json(req.session.user);
  } else {
    res.sendStatus(401);
  }
};

exports.logout = (req, res) => {
  req.session.destroy();
  res.status(200).json({ message: "Erfolgreich ausgeloggt" });
  res.sendStatus(204);
};
