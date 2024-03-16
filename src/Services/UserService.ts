import { UserModel } from "../Models/UserModel";
import { User, UserBuilder } from "../Entities/User";
import UserValidationError from "../Exception/UserValidationError";
import UserNotFoundError from "../Exception/UserNotFoundError";
import { UserDocument } from "../types/UserTypes";


/** A Service responsible for all user features.
 * 
 * @author dhouglasbn
 */
export default class UserService {

    async createUser(user: User) {
        const userModel = new UserModel({
            fullName: user.getFullName(),
            gender: user.getGender(),
            age: user.getAge(),
            email: user.getEmail(),
            password: user.getPassword()
        });

        const error = userModel.validateSync();

        if (error) throw new UserValidationError(error.message);
    
        return (await userModel.save()).toJSON();
    }

    async getUserById(id: String): Promise<User> {
        const userFromDB: UserDocument | null = await UserModel.findById(id);

        if (!userFromDB) throw new UserNotFoundError();
        
        return new UserBuilder()
        .setFullName(userFromDB.fullName)
        .setGender(userFromDB.gender)
        .setAge(userFromDB.age)
        .setEmail(userFromDB.email)
        .setPassword(userFromDB.password)
        .build();
    }

    async userAlreadyExists(email: String): Promise<Boolean> {
        const existingUser = await UserModel.findOne({ email });

        return Boolean(existingUser);
    }
}