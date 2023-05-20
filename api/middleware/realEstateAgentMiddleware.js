import { db } from "../db/mongo.js";

export async function realEstateAgentMiddleware(req, res, next) {
  const loggedInUser = req.user;
  console.log('loggedinUser', loggedInUser);

  if (loggedInUser !== undefined) {
    const userRole = await db.collection("userRoles").findOne({ userId: loggedInUser._id });
    console.log('userRole', userRole);

    if (userRole && (userRole.role === 'realEstateAgent' || userRole.role === 'admin')) {
      return next();
    } else {
      return res.status(403).json({
        error: "Forbidden, you don't have the correct role to access this route.",
      });
    }
  }

  return res.status(401).json({
    error: "Unauthorized",
  });
}
