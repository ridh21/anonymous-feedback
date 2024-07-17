import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import bcrypt from "bcryptjs";

import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";

export async function POST(request: Request){
    await dbConnect()

    try{
        const {username, email, password } = await request.json()
        const existingUsernameVerifiedByUsername = await UserModel.findOne({
            username,
            isVerified: true
        })

        if (existingUsernameVerifiedByUsername) {
            return Respose.json({
                success: false,
                message: "Username is already taken"
            }, {status: 400})
        }
    } catch (error) {
        console.log("Error registering user", error);
        return Response.json(
            {
                success: false,
                message: "Error registering user"
            },
            {
                status: 500
            }
        )
        
    }
}
