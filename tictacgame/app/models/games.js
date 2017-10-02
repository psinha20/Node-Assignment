import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import Players from '../models';

const gamesSchema = new Schema ({
	player1_id: {type: mongoose.Schema.Types.ObjectId, required: true,ref: 'players'},
	player2_id: {type: mongoose.Schema.Types.ObjectId, ref: 'players'},
	player1_moves: Array,
	player2_moves: Array,
	cpu: {type: Boolean, default: true},
	result: {
		type: String, 
		enum: ['none','player1','player2'],
		default: 'none'
	}
},{collection: 'games'});

export default mongoose.model('Games', gamesSchema);