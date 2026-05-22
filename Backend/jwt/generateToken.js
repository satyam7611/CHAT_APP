import jwt from "jsonwebtoken";

const createTokenAndSaveCookie = async (userId, res) => {
  const token = jwt.sign(
    { userId },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: true,        // required on HTTPS (Render + Vercel)
    sameSite: "none",    // allow frontend-backend on different domains
    maxAge: 24 * 60 * 60 * 1000
  });

  return token;
};

export default createTokenAndSaveCookie;
