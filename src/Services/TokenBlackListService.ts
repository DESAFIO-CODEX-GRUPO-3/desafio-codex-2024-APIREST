import { UserModel } from "../Models/UserModel";
import { User, UserBuilder } from "../Entities/User";
import UserValidationError from "../Exception/UserValidationError";
import UserNotFoundError from "../Exception/UserNotFoundError";
import { UserDocument } from "../types/UserTypes";
import UserAlreadyExistsError from "../Exception/UserAlreadyExistsError";
import { BlacklistedTokenModel } from "../Models/BlackListedTokenModel";
import UserJWTIsInvalidError from "../Exception/UserJWTIsInvalidError";
import jwt from "jsonwebtoken";
import { OurJWTPayload } from "../types/RequestTypes";

/** A Service responsible for all user features.
 *  Works in the logic and business rules layer of the software
 * 
 * @author dhouglasbn
 */
class TokenBlackListService {

    async saveTokenInBlackList(token: string) {
        const decodedToken: any = jwt.decode(token, { complete: true });
        const expiryUnix = decodedToken.payload.exp;
        const expiryDate = new Date(expiryUnix * 1000);
        
        const TokenModel = new BlacklistedTokenModel({token, expiry: expiryDate});
        const error = TokenModel.validateSync();
        if (error) throw new UserJWTIsInvalidError();
        return (await TokenModel.save()).toJSON();
    }

    async findTokenInBlackList(token: String) {
        return BlacklistedTokenModel.findOne({token});
    }
}

const tokenBlackListService: TokenBlackListService = new TokenBlackListService();

export default tokenBlackListService;