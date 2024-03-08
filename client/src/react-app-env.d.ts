/// <reference types="react-scripts" />
type ErrorQuery = {
  response: {
    data: {
      message: string|string[];
      statusCode: number;
    }
  };
};

type User = {
  name: string;
  email: string;
  password: string;
}
