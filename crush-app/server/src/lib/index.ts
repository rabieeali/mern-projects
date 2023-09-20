import mongoose from 'mongoose'

export const responser = (status: number, message: string, data: any) => {
    return { status, message, data }
}

export const isValidObjectId = (id: string) => {
    const result = mongoose.Types.ObjectId.isValid(id)
    return result
}