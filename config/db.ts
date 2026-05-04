interface DBConfig {
  uri: string;
  options: {
    useNewUrlParser: boolean;
    useUnifiedTopology: boolean;
  };
}

const dbConfig: DBConfig = {
  uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/bangang-connect',
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
};

export default dbConfig;