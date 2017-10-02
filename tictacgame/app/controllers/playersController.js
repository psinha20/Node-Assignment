import Players from '../models/players';
import Games from '../models/games';
const _ = require('lodash');

export default class playersController {
  static add(req, res) {
    Players.create(req.body)
      .then((records) => {
        res.send('inserted player');
      })
  }
  static stats(req, res) {
    if(!_.isString(req.params.id) || !(req.params.id).length===24) return Responder.operationFailed(res, new BadRequestError('Pass only objectId'));
    let response = '';
    Players.findOne({
        _id: req.params.id
      })
      .then((records) => {
        response = response + " Name: " + records.name + " NickName: " + records.nickname + " Matches-won: " + records.matches_won;
        console.log(response);
      })
      .then(
        Games.count({
          $or: [{
            player1_id: req.params.id
          }, {
            player2_id: req.params.id
          }]
        }).then(
          records => {
            console.log(" Total matches played: "+records);
          }
        )
      )

  }
}