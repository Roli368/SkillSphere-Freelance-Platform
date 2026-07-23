import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";

import * as dashboardService from "../services/dashboardService.js";

export const getDashboard =
asyncHandler(async(req,res)=>{

const stats=
await dashboardService.getDashboard(
req.user
);

res.json(
new ApiResponse(
200,
"Dashboard",
stats
)
);

});