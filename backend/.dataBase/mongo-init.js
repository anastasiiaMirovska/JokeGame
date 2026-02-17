db = db.getSiblingDB(process.env.TEST_MONGO_INITDB_DATABASE);

db.createUser({
  user: process.env.TEST_MONGO_INITDB_ROOT_USERNAME,
  pwd: process.env.TEST_MONGO_INITDB_ROOT_PASSWORD,
  roles: [
    { role: 'readWrite', db: process.env.TEST_MONGO_INITDB_DATABASE }
  ]
});
