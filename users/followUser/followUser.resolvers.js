import { protectedResolver } from "../users.utils";
import client from "../../client";

export default {
  Mutation: {
    followUser: protectedResolver(async (_, { userName }, { loggedInUser }) => {
      const ok = await client.user.findUnique({ where: { userName } });
      if (!ok) {
        return {
          ok: false,
          error: "That user does not exist.",
        };
      }
      try {
        await client.user.update({
          where: {
            id: loggedInUser.id,
          },
          data: {
            following: {
              connect: {
                userName,
              },
            },
          },
        });
        return {
          ok: true,
        };
      } catch (error) {
        console.error(error);
        return {
          ok: false,
          error: error.message,
        };
      }
    }),
  },
};
