import { Router } from "express";
import { getVideoById, publishVideo } from "../controllers/video.controller.js";

import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/publish-video").post(
  verifyJWT,
  upload.fields([
    {
      name: "videoFile",
      maxCount: 10,
    },
    {
      name: "thumbnail",
      maxCount: 1,
    },
  ]),
  publishVideo,
);
router.route("/c/:videoId").get(verifyJWT, getVideoById);

export default router;
