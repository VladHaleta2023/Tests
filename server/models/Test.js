import mongoose from 'mongoose';

const TestSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model('Test', TestSchema);