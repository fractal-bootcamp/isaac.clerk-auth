import express, { NextFunction, Request, Response } from "express";
import { clerkClient, getAuth, requireAuth } from "@clerk/express";
import { clerkMiddleware } from "@clerk/express";

const app = express();
app.use(express.json());
app.use(clerkMiddleware());

const requireAuthMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const auth = getAuth(req);
  if (!auth.userId) {
    res.status(403).send("Forbidden");
    return;
  }
  return next();
};

app.get("/protected", requireAuthMiddleware, async (req, res) => {
  const { userId, sessionId } = getAuth(req);

  // Retrieve the token using getToken()
  const token = await req.auth.getToken();
  console.log("User Token:", token); // Log the token here

  const user = await clerkClient.users.getUser(userId);
  res.json({ user });
  return;
});

app.get("/sign-in", (req, res) => {
  // Assuming you have a template engine installed and are using a Clerk JavaScript SDK on this page
  res.render("sign-in");
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
