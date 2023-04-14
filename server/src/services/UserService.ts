import { User, OrganizedReturn } from "../types/index"
import userModel from "../models/userModel"
import StatusCodes from "../errors/statusCode"
import { UserValidators } from '../errors/validators/index'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

class UserService {
    async signup(user: User): Promise<OrganizedReturn> {
        try {
            // Validate user
            const errors = UserValidators.userValidator(user)
            if (errors.length > 0) {
                return new OrganizedReturn([], true, errors.join(', '), StatusCodes.BAD_REQUEST).toJson()
            }

            // Hash password
            const salt = await bcrypt.genSaltSync(10)
            const hashedPassword = await bcrypt.hashSync(user.password, salt)

            // Create user
            const result: User = await userModel.create(new User(null, user.name, user.email, hashedPassword))
            return new OrganizedReturn(result, false, "User created successfully", StatusCodes.CREATED).toJson()
        } catch (error: any) {
            return new OrganizedReturn([], true, error.message, error.status).toJson()
        }
    }

    async login(user: User): Promise<OrganizedReturn> {
        try {
            // Get user
            const result: User = await userModel.getByEmail(user.email)
            if (!result) {
                return new OrganizedReturn([], true, "User not found", StatusCodes.NOT_FOUND).toJson()
            }

            // Check password
            const validPassword = await bcrypt.compareSync(user.password, result.password)
            if (!validPassword) {
                return new OrganizedReturn([], true, "Invalid password", StatusCodes.BAD_REQUEST).toJson()
            }

            // Create and assign a token
            const token = jwt.sign(result.toJson(), process.env.TOKEN_SECRET as string)

            return new OrganizedReturn({ token, user: result }, false, "User logged in successfully", StatusCodes.OK).toJson()
        } catch (error: any) {
            console.error(error)
            return new OrganizedReturn([], true, error.message, error.status).toJson()
        }
    }

    async getAll(): Promise<OrganizedReturn> {
        try {
            const result: User[] = await userModel.getAll()
            return new OrganizedReturn(result, false, "Users retrieved successfully", StatusCodes.OK).toJson()
        } catch (error: any) {
            return new OrganizedReturn([], true, error.message, error.status).toJson()
        }
    }

    async getById(id: number): Promise<OrganizedReturn> {
        try {
            const result: User = await userModel.getById(id)
            return new OrganizedReturn(result, false, "Users retrieved successfully", StatusCodes.OK).toJson()
        } catch (error: any) {
            return new OrganizedReturn([], true, error.message, error.status).toJson()
        }
    }

    async update(id: number, data: User): Promise<OrganizedReturn> {
        try {
            const result: User = await userModel.update(id, data)
            return new OrganizedReturn(result, false, "User updated successfully", StatusCodes.OK).toJson()
        } catch (error: any) {
            return new OrganizedReturn([], true, error.message, error.status).toJson()
        }
    }

    async delete(id: number): Promise<OrganizedReturn> {
        try {
            const result: User = await userModel.delete(id)
            return new OrganizedReturn(result, false, "User deleted successfully", StatusCodes.OK).toJson()
        } catch (error: any) {
            return new OrganizedReturn([], true, error.message, error.status).toJson()
        }
    }
}

export default new UserService()