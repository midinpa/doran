const user = 'doranAdmin';
const password = '123';
const host = 'localhost';
const port = '27017';
const db = 'doran';

const uri = `mongodb://${user}:${password}@${host}:${port}/${db}`;
// const uri = `mongodb://${host}:${port}/${db}`;
export default uri;
