import {config} from "../config"

db = db.getSiblingDB(config.database.mongoDatabaseName);

db.createUser({
  user: config.database.mongoRootUsername,
  pwd: config.database.mongoRootPassword,
  roles: [
    { role: 'readWrite', db: config.database.mongoDatabaseName }
  ]
});
