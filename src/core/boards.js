import createError from 'http-errors';
import {
  Board,
} from '../db';
import console from '../lib/console';

export const writeBoard = async (req) => {
  const { body } = req;
  if (!body) {
    console.error('request body is not given');
    throw createError(400);
  }
  const {
    sender, message,
  } = body;
  if (!sender || !message) {
    console.error('request body is not valid');
    throw createError(400);
  }

  const result = await Board.create({
    sender, message,
  });

  if (!result) {
    console.error('db creation error');
    throw createError(500);
  }
  return {};
};

export const readBoards = async (req) => {
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

  const result = await Board
    .aggregate()
    .skip(skip * limit)
    .limit(limit)
    .sort('createdAt')
    .lookup({
      from: 'users',
      localField: 'sender',
      foreignField: '_id',
      as: 'sender',
    })
    .unwind('$sender')
    .exec();

  return result;
};
