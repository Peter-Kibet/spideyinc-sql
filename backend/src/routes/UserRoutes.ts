import { Router } from "express";
import { User } from "../entity/User";
import { getRepository } from "typeorm";
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";

const router = Router();

router.post("/register", async (req, res) => {
  const userRepo = getRepository(User);
  const { username, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = userRepo.create({ username, email, password: hashedPassword });
  await userRepo.save(user);
  res.send(user);
});

router.post("/login", async (req, res) => {
  const userRepo = getRepository(User);
  const { email, password } = req.body;

  const user = await userRepo.findOne({ email });
  if (!user) {
    return res.status(404).send("User not found");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).send("Invalid password");
  }

  const token = jwt.sign({ id: user.id }, "secretKey", { expiresIn: "1h" });
  res.send({ token });
});

export default router;
