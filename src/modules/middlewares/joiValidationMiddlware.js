export const validate = (Schema) => {
  return (req, res, next) => {
    let validationParams = {};
    Object.assign(validationParams, req.body, req.params, req.query);
    let { error } = Schema.validate(validationParams, {
      abortEarly: false,
    });
    if (error) {
      error = error.details.map((details) => details.message);
      return res.json({ error });
    }

    next();
  };
};
