export default () => ({
  // Joi validation ensures these values exist before this function runs
  port: parseInt(process.env.PORT!, 10),
  nodeEnv: process.env.NODE_ENV!,
  services: {
    userService: process.env.USER_SERVICE_URL!,
    inventoryService: process.env.INVENTORY_SERVICE_URL!,
  },
});

