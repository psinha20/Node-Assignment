import Players from '../models/players';
import Games from '../models/games';
import Responder from '../../lib/expressResponder';
import 'babel-polyfill';
const _ = require('lodash');
export default class gamesController {

  static checkGame(id) {
    if(!_.isString(id) || !id.length===24) return Responder.operationFailed(res, new BadRequestError('Pass only objectId'));
    Games.findOne({
        _id: id
      })
      .then(
        results => {
          let player1Moves = [];
          let player2Moves = [];
          player1Moves = results.player1_moves;
          player2Moves = results.player2_moves;
          const wins = [
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9],
            [1, 4, 7],
            [2, 5, 8],
            [3, 6, 9],
            [1, 5, 9],
            [3, 5, 7]
          ];
          for (var i = 0; i < wins.length; i++) {
            const [a, b, c] = wins[i];
            if (player1Moves.includes(a) && player1Moves.includes(b) && player1Moves.includes(c)) {
              Games.update({
                  _id: req.params.id
                }, {
                  result: 'player1'
                })
                .then((update) => {
                  if (update.n === 0) return Responder.operationFailed(res, new BadRequestError('Game not found'));
                  if (!update.ok) return Responder.operationFailed(res, new BadRequestError('Wrong body pattern'));
                  else Responder.success(res, update)
                });

              Players.update({
                  _id: results.player1_id
                }, {
                  $inc: {
                    matches_won: 1
                  }
                })
                .then((update) => {
                  if (update.n === 0) return Responder.operationFailed(res, new BadRequestError('Player not found'));
                  if (!update.ok) return Responder.operationFailed(res, new BadRequestError('Wrong body pattern'));
                  else Responder.success(res, update);
                  return console.log('Player 1 wins!!');
                });
            }
          }

          for (var i = 0; i < wins.length; i++) {
            const [a, b, c] = wins[i];
            if (player2Moves.includes(a) && player2Moves.includes(b) && player2Moves.includes(c)) {
              Games.update({
                  _id: req.params.id
                }, {
                  result: 'player2'
                })
                .then((update) => {
                  if (update.n === 0) return Responder.operationFailed(res, new BadRequestError('Game not found'));
                  if (!update.ok) return Responder.operationFailed(res, new BadRequestError('Wrong body pattern'));
                  else Responder.success(res, update)
                });
              Players.update({
                  _id: results.player2_id
                }, {
                  $inc: {
                    matches_won: 1
                  }
                })
                .then((update) => {
                  if (update.n === 0) return Responder.operationFailed(res, new BadRequestError('Player not found'));
                  if (!update.ok) return Responder.operationFailed(res, new BadRequestError('Wrong body pattern'));
                  else Responder.success(res, update);
                  return console.log('Player 2 wins!!');
                });
            }
          }
        })
    return console.log('..');
  }
  static add(req, res) {
    Games.create(req.body)
      .then((records) => {
        console.log('inserted', records);
      })
  }

  static movePlayer1(req, res) {
    if(req.body.move > 9) return Responder.operationFailed(res, new BadRequestError('There are only 9 squares'));
    Games.update({
        _id: req.params.id
      }, {
        $push: {
          player1_moves: req.body.move
        }
      })
      .then((update) => {
        if (update.n === 0) return Responder.operationFailed(res, new BadRequestError('Game not found'));
        if (!update.ok) return Responder.operationFailed(res, new BadRequestError('Wrong body pattern'));
        else {
          Responder.success(res, update);
          gamesController.checkGame(req.params.id);

        }
      })
  }

  static movePlayer2(req, res) {
    
    Games.findOne({
        _id: req.params.id
      })
      .then(
        records => {
          if (records.cpu === true) {
            let player1Moves, player2Moves, finalSet;
            let avlSet = [1, 2, 3, 4, 5, 6, 7, 8, 9];
            Games.findOne({
                _id: req.params.id
              })
              .then(
                results => {
                  player1Moves = results.player1_moves;
                  player2Moves = results.player2_moves;

                  const wins = [
                    [1, 2, 3],
                    [4, 5, 6],
                    [7, 8, 9],
                    [1, 4, 7],
                    [2, 5, 8],
                    [3, 6, 9],
                    [1, 5, 9],
                    [3, 5, 7]
                  ];

                  for (var j = 0; j < wins.length; j++) {
                    let [a, b, c] = wins[j];
                    // console.log(a + "<<");
                    if (player1Moves.includes(a) && player1Moves.includes(b) && !player2Moves.contains(c) && !player1Moves.contains(c)) {
                      // console.log(c + "<<<<<<");
                      Games.update({
                          _id: req.params.id
                        }, {
                          $push: {
                            player2_moves: c
                          }
                        })
                        .then((update) => {
                          if (update.n === 0) return Responder.operationFailed(res, new BadRequestError('Game not found'));
                          if (!update.ok) return Responder.operationFailed(res, new BadRequestError('Wrong body pattern'));
                          else Responder.success(res, update)
                        });
                      gamesController.checkGame(req.params.id);
                      return res.send('Player 2 move complete');
                    } else if (player1Moves.includes(a) && player1Moves.includes(c) && !player2Moves.contains(b) && !player1Moves.contains(b)) {
                      // console.log(b + "<<<<<<");
                      Games.update({
                          _id: req.params.id
                        }, {
                          $push: {
                            player2_moves: b
                          }
                        })
                        .then((update) => {
                          if (update.n === 0) return Responder.operationFailed(res, new BadRequestError('Game not found'));
                          if (!update.ok) return Responder.operationFailed(res, new BadRequestError('Wrong body pattern'));
                          else Responder.success(res, update)
                        });
                      gamesController.checkGame(req.params.id);
                      return res.send('Player 2 move complete');
                    } else if (player1Moves.includes(b) && player1Moves.includes(c) && !player2Moves.contains(a) && !player1Moves.contains(a)) {
                      // console.log(a + "<<<<<<");
                      Games.update({
                          _id: req.params.id
                        }, {
                          $push: {
                            player2_moves: a
                          }
                        })
                        .then((update) => {
                          if (update.n === 0) return Responder.operationFailed(res, new BadRequestError('Game not found'));
                          if (!update.ok) return Responder.operationFailed(res, new BadRequestError('Wrong body pattern'));
                          else Responder.success(res, update)
                        })
                      gamesController.checkGame(req.params.id);
                      return res.send('Player 2 move complete');
                    } else if (player2Moves.includes(a) && player2Moves.includes(b) && !player2Moves.contains(c) && !player1Moves.contains(c)) {
                      // console.log(c + "<<<<<<");
                      Games.update({
                          _id: req.params.id
                        }, {
                          $push: {
                            player2_moves: c
                          }
                        })
                        .then((update) => {
                          if (update.n === 0) return Responder.operationFailed(res, new BadRequestError('Game not found'));
                          if (!update.ok) return Responder.operationFailed(res, new BadRequestError('Wrong body pattern'));
                          else Responder.success(res, update)
                        })
                      gamesController.checkGame(req.params.id);
                      return res.send('Player 2 move complete');
                    } else if (player2Moves.includes(a) && player2Moves.includes(c) && !player2Moves.contains(b) && !player1Moves.contains(b)) {
                      // console.log(c + "<<<<<<");
                      Games.update({
                          _id: req.params.id
                        }, {
                          $push: {
                            player2_moves: c
                          }
                        })
                        .then((update) => {
                          if (update.n === 0) return Responder.operationFailed(res, new BadRequestError('Game not found'));
                          if (!update.ok) return Responder.operationFailed(res, new BadRequestError('Wrong body pattern'));
                          else Responder.success(res, update)
                        })
                      gamesController.checkGame(req.params.id);
                      return res.send('Player 2 move complete');
                    } else if (player2Moves.includes(b) && player2Moves.includes(c) && !player2Moves.contains(a) && !player1Moves.contains(a)) {
                      // console.log(a + "<<<<<<");
                      Games.update({
                          _id: req.params.id
                        }, {
                          $push: {
                            player2_moves: a
                          }
                        })
                        .then((update) => {
                          if (update.n === 0) return Responder.operationFailed(res, new BadRequestError('Game not found'));
                          if (!update.ok) return Responder.operationFailed(res, new BadRequestError('Wrong body pattern'));
                          else Responder.success(res, update)
                        })
                      gamesController.checkGame(req.params.id);
                      return res.send('Player 2 move complete');
                    }
                  }
                  finalSet = _.difference(avlSet, player1Moves);
                  finalSet = _.difference(finalSet, player2Moves);
                  let rand = finalSet[Math.floor(Math.random() * finalSet.length)];
                  Games.update({
                      _id: req.params.id
                    }, {
                      $push: {
                        player2_moves: rand
                      }
                    })
                    .then((update) => {
                      if (update.n === 0) return Responder.operationFailed(res, new BadRequestError('Training not found'));
                      if (!update.ok) return Responder.operationFailed(res, new BadRequestError('Wrong body pattern'));
                      else Responder.success(res, update)
                    })
                  gamesController.checkGame(req.params.id);
                  res.send('Player 2 move complete');
                });
          } else {
            if(!_.isNumber(req.body.move)) return Responder.operationFailed(res, new BadRequestError('Only numbers allowed'));
            if(req.body.move > 9) return Responder.operationFailed(res, new BadRequestError('There are only 9 squares'));
            Games.update({
                _id: req.params.id
              }, {
                $push: {
                  player2_moves: req.body.move
                }
              })
              .then((update) => {
                if (update.n === 0) return Responder.operationFailed(res, new BadRequestError('Game not found'));
                if (!update.ok) return Responder.operationFailed(res, new BadRequestError('Wrong body pattern'));
                else {
                  gamesController.checkGame(req.params.id);
                  console.log('Player 2 move complete');
                  Responder.success(res, update)
                }
              })
          }
        }
      )
  }

  static show(req, res) {
    Games.findOne({
        _id: req.params.id
      })
      .then(records => Responder.success(res, records))
      .catch(error => Responder.operationFailed(res, new BadRequestError('Bad Request')));
  }

  static join(req, res) {
    Games.find({
        _id: req.params.id
      })
      .then(records => {
        if (records[0].cpu === true) {
          Games.update({
              _id: req.params.id
            }, {
              player2_id: req.body.player_id
            })
            .then((update) => {
              if (update.n === 0) return Responder.operationFailed(res, new BadRequestError('Game not found(player2 joining)'));
              if (!update.ok) return Responder.operationFailed(res, new BadRequestError('Wrong body pattern'));
              else Responder.success(res, update);
            })
          Games.update({
              _id: req.params.id
            }, {
              cpu: false
            })
            .then((update) => {
              if (update.n === 0) return Responder.operationFailed(res, new BadRequestError('Game not found(cpu)'));
              if (!update.ok) return Responder.operationFailed(res, new BadRequestError('Wrong body pattern'));
              else Responder.success(res, update)
            })
          return res.send('Added to selected game');
        } else return res.send('2 players already playing');
      })
  }
}