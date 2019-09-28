import createError from 'http-errors';
import {
  User,
} from '../../db';
import { console } from '../../lib';

const getUser = async (req) => {
  const { headers } = req;

  if (!headers) {
    console.error('request header is not given');
    throw createError(400);
  }

  const { phoneid: phoneId } = headers;

  if (!phoneId) {
    console.error('request header is not valid');
    throw createError(400);
  }

  const host = await User.findOne({ phoneId });

  if (!host) {
    console.error('phoneId is not valid');
    throw createError(400);
  }

  return host;
};

export default getUser;
