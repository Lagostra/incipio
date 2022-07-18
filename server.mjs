import express from "express";
import fetch from "node-fetch";
import crypto from "crypto";
import dotenv from "dotenv";
dotenv.config();

const app = express();

const config = {
  redirectUri:
    process.env.REDIRECT_URI || "http://localhost:3000/auth/callback",
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  scope: process.env.SCOPE || "user repo",
  port: process.env.PORT || 3001,
};

const validStates = [];

app.use(
  express.static("dist", {
    etag: true,
    lastModified: true,
    setHeaders: (res, path) => {
      const bundleHashRegex = new RegExp("\\.[0-9a-f]{8}\\.");
      if (path.endsWith(".html")) {
        // Cacher aldri index.html
        res.setHeader("Cache-Control", "no-cache");
      } else if (bundleHashRegex.test(path)) {
        // Cacher bundle i 5 dager
        res.setHeader("Cache-Control", "public, max-age=432000");
      }
    },
  })
);

app.use("/oauth/authorize", (req, res) => {
  const state = crypto.randomBytes(48).toString("hex");
  validStates.push(state);
  const url = `https://github.com/login/oauth/authorize?client_id=${
    config.clientId
  }&redirect_uri=${encodeURIComponent(
    config.redirectUri
  )}&scope=${encodeURIComponent(config.scope)}&state=${state}`;
  console.log(url, config);
  res.redirect(url);
});

app.use("/oauth/access_token", async (req, res) => {
  const { code, state } = req.query;
  if (!validStates.includes(state)) {
    res.status(400).send("Invalid state");
    return;
  }

  const response = await fetch(`https://github.com/login/oauth/access_token`, {
    method: "POST",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify({
      client_id: config.clientId,
      client_secret: config.clientSecret,
      code,
      redirect_uri: config.redirectUri,
    }),
  });

  const content = await response.json();
  res.send({ accessToken: content.access_token });
});

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});
