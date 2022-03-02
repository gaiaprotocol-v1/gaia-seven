import { Schema } from "mongoose";

const userSchema = new Schema({
    user_id: String,
    talk_count: Number,
    pic_number: String,
    pic_address: String,
    chip: Number,
    chip_wallet: String,
    inventory: [{
        String
    }],
    applied_skill: String,
},
    {
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    }
);

export default userSchema;