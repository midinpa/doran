import createError from 'http-errors';
import {
  Room,
} from '../db';
import { console } from '../lib';
import {
  getUser,
} from './lib';


export const createRoom = async (req) => {
  const { _id: host } = await getUser(req);
  const { body } = req;
  if (!body) {
    console.error('request body is not given');
    throw createError(400);
  }

  const {
    guest,
  } = body;
  if (!guest) {
    console.error('request body is not valid');
    throw createError(400);
  }

  // room already exists
  const existingRoom = await Room.findOne({ host, guest });
  if (existingRoom) {
    return { roomId: existingRoom, created: false };
  }

  // create new room
  const result = await Room.create({
    host, guest,
  });

  if (!result) {
    console.error('db creation error');
    throw createError(500);
  }
  return { roomId: result, created: true };
};

export const getRooms = async (req) => {
  const { _id: host } = await getUser(req);
  const { query } = req;
  if (!query) {
    console.error('request query is not given');
    throw createError(400);
  }

  let { skip, limit } = query;
  if (!skip || !limit) {
    console.error('request query is not valid');
    throw createError(400);
  }
  skip = Number(skip);
  limit = Number(limit);

  const result = await Room
    .aggregate()
    .match({ host })
    .skip(skip * limit)
    .limit(limit)
    .sort('updatedAt')
    .exec();

  return result;
};
