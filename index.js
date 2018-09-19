const $ = require('jquery');

const Game = require('./Game');

const app = {
  game: new Game(),

  init: function () {
    // console.log('initializing');
    $( 'button#start' ).on('click', app.start)
    app.updateBoard();
    // console.log('init finished')
  },

  updateBoard: function () {
    $( 'table' ).html(app.game.generateBoard());
    $( 'td' ).on('click', app.add);
  },

  start: function () {
    app.game = new Game();
    app.updateBoard();
  },

  add: function () {
    // console.log(`adding at col ${$(this).data('col')}`);
    if (app.game.addTurn($(this).data('col'))) {
      $( 'p#info' ).html(`${app.game.turn === 1 ? 'red' : 'yellow'} won`)
    }
    app.updateBoard();
  }
};

$(document).ready(function () {
  app.init()
});