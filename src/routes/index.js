import {
  register, login,
} from '../core/users';

const express = require('express');

const router = express.Router();

router.post('/register', async (req, res, next) => {
  try {
    const result = await register(req, next);
    res.status(201).send({ data: result });
  } catch (error) {
    next(error);
  }
});

router.post('/login', async (req, res, next) => {
  try {
    const result = await login(req, next);
    res.status(200).send({ data: result });
  } catch (error) {
    next(error);
  }
});

export default router;
