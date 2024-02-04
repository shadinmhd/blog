import SubscriberInterface from "@/interface/subscriber.interface";
import mongoose from "mongoose";

const subscriberSchema = new mongoose.Schema<SubscriberInterface>({
	email: {
		type: String,
		required: true
	},
	deleted: {
		type: Boolean,
		default: false
	}
}, { timestamps: true })

const SubscriberModel = mongoose.models.Subscriber as mongoose.Model<SubscriberInterface> || mongoose.model("Subscriber", subscriberSchema)
export default SubscriberModel
