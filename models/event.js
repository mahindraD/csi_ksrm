const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review");

const eventSchema = new Schema({
    title : {
        type: String,
        required: true,
    },
    date : {
        type: String,
        required: true,
    },
    coordinators: {
        type: [String],
        required: true,
    },
    rules: {
        type: [String],
        required: true,
    },
    winners:    {
        type: [String],
        required: true,
    },
    photos: {
        type: [{
                filename : String,
                url : String
            }
        ],
        required: true,
    },
    reviews: {
        type: [{
            type:Schema.Types.ObjectId,
            ref: "Review", 
        }]
    }
});

eventSchema.post("findOneAndDelete", async(event) => {
    if(event.reviews.length>0){
        await Review.deleteMany({_id: {$in: event.reviews}});
    }
});


const Event = mongoose.model("Event",eventSchema);
module.exports = Event;