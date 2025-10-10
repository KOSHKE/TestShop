export default () => ({
  // Joi validation ensures these values exist before this function runs
  port: parseInt(process.env.PORT!, 10),
  serviceName: process.env.SERVICE_NAME!,
  nodeEnv: process.env.NODE_ENV!,
  database: {
    url: process.env.DATABASE_URL!,
  },
});

