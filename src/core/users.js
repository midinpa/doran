import createError from 'http-errors';
import {
  User,
} from '../db';
import { console } from '../lib';

export const register = async (req) => {
  const { body } = req;
  if (!body) {
    console.error('request body is not given');
    throw createError(400);
  }
  const {
    phoneId, nickname, age, sex, location,
  } = body;
  if (!phoneId || !nickname || !age || !sex || !location) {
    console.error('request body is not valid');
    throw createError(400);
  }

  const result = await User.create({
    phoneId, nickname, age, sex, location,
  });

  if (!result) {
    console.error('db creation error');
    throw createError(500);
  }
  return {};
};

export const login = async (req) => {
  const { body } = req;
  if (!body) {
    console.error('request body is not given');
    throw createError(400);
  }
  const { phoneId } = body;
  if (!phoneId) {
    console.error('request body is not valid');
    throw createError(400);
  }

  const result = await User.findOne({ phoneId });
  if (!result) {
    console.error('user is not authorized');
    throw createError(401);
  }
  return {};
};
