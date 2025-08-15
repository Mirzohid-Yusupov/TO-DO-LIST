const response = require("../utils/response.helper");
const check = require("../utils/validate.helper");

class authValidation {
  async create(req, res, next) {
    const schema = {
      type: "object",
      properties: {
        task: {
          type: "string",
          minLength: 1,
          maxLength: 255,
          errorMessage: {
            type: "Task must be a string",
            minLength: "Task cannot be empty",
            maxLength: "Task must be less than 255 characters",
          },
        },
        start: {
          type: "string",
          format: "date-time",
          errorMessage: {
            type: "Start must be a string",
            format: "Start must be a valid date-time (YYYY-MM-DDTHH:MM:SSZ)",
          },
        },
        end: {
          type: "string",
          format: "date-time",
          errorMessage: {
            type: "End must be a string",
            format: "End must be a valid date-time (YYYY-MM-DDTHH:MM:SSZ)",
          },
        },
        description: {
          type: "string",
          minLength: 1,
          maxLength: 255,
          errorMessage: {
            type: "Description must be a string",
            minLength: "Description cannot be empty",
            maxLength: "Description must be less than 255 characters",
          },
        },
        user_id: {
          type: "string",
          minLength: 1,
          maxLength: 20,
          errorMessage: {
            type: "User ID must be a string",
            minLength: "User ID cannot be empty",
            maxLength: "User ID must be less than 20 characters",
          },
        },
        status: {
          type: ["string", "integer", "null"],
          errorMessage: {
            type: "Status must be a string, number or null",
          },
        },
        category: {
          type: ["string", "null"],
          errorMessage: {
            type: "Category must be a string or null",
          },
        },
        type: {
          type: ["string", "null"],
          errorMessage: {
            type: "Type must be a string or null",
          },
        },
      },
      required: ["task", "start", "end", "description", "user_id"],
      additionalProperties: false,
    };

    try {
      const validate = await check(schema, req.body);
      if (validate) {
        // Extract only messages from AJV error array
        const messages = validate.map(err => err.message);
        return response.warning(res, messages);
      }

      next();
    } catch (error) {
      console.error(error);
      return response.error(res, "Validation error occurred");
    }
  }

  async logout(req, res, next) {
    next();
  }
}

module.exports = new authValidation();
