import 'dotenv-flow/config';
const getEnvVariable = (name, required, defaultValue="")=>{
  const value = process.env[name];
  if(required && (!value || value.trim() === "")){
    throw new Error(
      `ERROR: Environment variable "${name}" is missing or empty.`,
    );
  }
  return value || defaultValue;
}

const NODE_ENV = getEnvVariable("NODE_ENV", false, "local");

export const config = {
  app: {
    nodeEnv: NODE_ENV,
    host: getEnvVariable("HOST", true),
    port: parseInt(getEnvVariable("PORT", false, "5000"), 10),
  },
  database: {
    mongoDatabaseName: getEnvVariable("MONGO_INITDB_DATABASE", true),
    mongoRootUsername: getEnvVariable("MONGO_INITDB_ROOT_USERNAME", true),
    mongoRootPassword: getEnvVariable("MONGO_INITDB_ROOT_PASSWORD", true),
    mongoUrl: getEnvVariable("MONGO_URI", true),
  }
}
