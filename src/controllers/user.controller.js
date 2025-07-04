import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
  // return res.status(200).json({ message: "ok" });
  //get user detail from frontend
  //validation - field not empty
  //check if user already exist: username,email
  //check for image and check for avatar
  //upload them to cloudary, avatar
  //create user object -create entry in db
  //remove password and refresh token field from response
  //check for user creation
  //return res

  //we can get form or json data from req.body
  //extract data by destructring
  const { fullName, email, username, password } = req.body;
  // console.log("email", email);

  //vatlidation
  if (
    [fullName, email, username, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }

  //check user already exist
  const userExisted = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (userExisted) {
    throw new ApiError(406, "User with these credentials already exist");
  }

  //check for image and check for avatar
  const avartarLocalPath = req.files?.avatar[0]?.path;
  // const coverImageLocalPath = req.files?.coverImage[0]?.path;

  let coverImageLocalPath;
  if (
    req.files &&
    Array.isArray(req.files.coverImage) &&
    req.files.coverImage.length > 0
  ) {
    coverImageLocalPath = req.files.coverImage[0].path;
  }

  if (!avartarLocalPath) {
    throw new ApiError(400, "Avatar file is required");
  }
  // console.log("Avatar Path:", avartarLocalPath);
  // console.log("Cover Path:", coverImageLocalPath);

  //upload them to cloudary, avatar
  const avatar = await uploadOnCloudinary(avartarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  if (!avatar) {
    throw new ApiError(400, "Avatar file is required");
  }

  //create user object -create entry in db
  const user = await User.create({
    fullName,
    email,
    password,
    username: username.toLowerCase(),
    coverImage: coverImage?.url || "",
    avatar: avatar.url,
  });
  //check for user creation
  //remove password and refresh token field from response
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken",
  );

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering user");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User registered Successfully"));
});

export { registerUser };
