import jwt from "jsonwebtoken";

const createTokenAndSaveCookie = async (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "1d" });

  res.cookie("jwt",token ,{
    httpOnly:true,  //xxs attack
    secure:true,   
    sameSite:"strict"   //csrf attack
  })
  return token;
};


export default createTokenAndSaveCookie;