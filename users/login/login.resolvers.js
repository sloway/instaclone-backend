import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import client from "../../client";

export default {
  Mutation: {
    login: async (_, { userName, password }) => {
      const user = await client.user.findFirst({ where: { userName } });
      if (!user) {
        return {
          ok: false,
          error: "User not found",
        };
      }
      const passwodOk = await bcrypt.compare(password, user.password);
      if (!passwodOk) {
        return {
          ok: false,
          error: "Incorrect password",
        };
      }
      const token = await jwt.sign({ id: user.id }, process.env.SECRET_KEY);
      return {
        ok: true,
        token,
      };
      // check password with args.password
      // issue a token and send it to the user
    },
  },
};
