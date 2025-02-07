import User from "../modal/userdata.js";

const MongoDb = process.env.MongoDb

const generaterecordId = () => {
  return Math.floor(Math.random() * 9000000) + (1000000).toString();
};

export const userSaveData = async (req, res) => {
  try {
    const { usertododata } = req.body;

    const user = new User({
      recordId: generaterecordId(),
      usertododata,
    });
    await user.save();
    res
      .status(201)
      .json({
        message: "User Data Saved Successfully",
        user: req.body,
        success: true,
        recordId:user.recordId,
      });
  } catch (error) {
    console.error(error, "Error in data saving");
  }
};




