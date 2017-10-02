import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const playersSchema = new Schema ({
  name: {type : String, required : true },
  nickname: {type : String, required : true },
  age: {type: Number, required: true},
  matches_won: {type: Number, default: 0}
},{collection : 'players'});

export default mongoose.model('Players', playersSchema);


