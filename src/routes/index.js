import {
  register, login,
} from '../core/users';
import {
  writeBoard, readBoards,
} from '../core/boards';
import {
  createRoom, getRooms,
} from '../core/rooms';


const express = require('express');

const router = express.Router();

router.post('/register', async (req, res, next) => {
  try {
    const result = await register(req);
    res.status(201).send({ data: result });
  } catch (error) {
    next(error);
  }
});

router.post('/login', async (req, res, next) => {
  try {
    const result = await login(req);
    res.status(200).send({ data: result });
  } catch (error) {
    next(error);
  }
});

router.post('/boards', async (req, res, next) => {
  try {
    const result = await writeBoard(req);
    res.status(201).send({ data: result });
  } catch (error) {
    next(error);
  }
});

router.get('/boards', async (req, res, next) => {
  try {
    const result = await readBoards(req);
    res.status(200).send({ data: result });
  } catch (error) {
    next(error);
  }
});

router.post('/rooms', async (req, res, next) => {
  try {
    const result = await createRoom(req);
    const { created } = result;
    if (!created) {
      res.status(200).send({ data: result });
    } else {
      res.status(201).send({ data: result });
    }
  } catch (error) {
    next(error);
  }
});

router.get('/rooms', async (req, res, next) => {
  try {
    const result = await getRooms(req);
    res.status(200).send({ data: result });
  } catch (error) {
    next(error);
  }
});

export default router;
