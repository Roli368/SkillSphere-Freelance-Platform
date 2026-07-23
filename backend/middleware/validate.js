const validate = (schema) => {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const errors = {};

      for (const key in result.error.flatten().fieldErrors) {
        errors[key] = result.error.flatten().fieldErrors[key][0];
      }

      return res.status(400).json({
        success: false,
        message: "Validation Failed",
        errors,
      });
    }

    req.body = result.data;

    next();
  };
};

export default validate;