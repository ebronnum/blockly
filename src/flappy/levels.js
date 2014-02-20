/*jshint multistr: true */

// todo - i think our prepoluated code counts as LOCs
// todo - some ideal numbers are inflated bc of room for noises. can i do this better?

var Direction = require('./tiles').Direction;

var tb = function(blocks) {
  return '<xml id="toolbox" style="display: none;">' + blocks + '</xml>';
};

var category = function (name, blocks) {
  return '<category id="' + name + '" name="' + name + '">' + blocks + '</category>';
};

var flapBlock = '<block type="flappy_flap"></block>';
var flapHeightBlock = '<block type="flappy_flap_height"></block>';
var endGameBlock = '<block type="flappy_endGame"></block>';
var playSoundBlock =  '<block type="flappy_playSound"></block>';
var incrementScoreBlock = '<block type="flappy_incrementPlayerScore"></block>';

var setSpeedBlock = '<block type="flappy_setSpeed"></block>';
var setBackgroundBlock = '<block type="flappy_setBackground"></block>';
var setGapHeightBlock = '<block type="flappy_setGapHeight"></block>';
var setPlayerBlock = '<block type="flappy_setPlayer"></block>';
var setObstacleBlock = '<block type="flappy_setObstacle"></block>';
var setGroundBlock = '<block type="flappy_setGround"></block>';

var COL_WIDTH = 240;
var COL1 = 20;
var COL2 = 20 + COL_WIDTH;

var ROW_HEIGHT = 120;
var ROW1 = 20;
var ROW2 = ROW1 + ROW_HEIGHT;
var ROW3 = ROW2 + ROW_HEIGHT;

var CATEGORY_BUFFER = 0;

var eventBlock = function (type, x, y, child) {
  return '<block type="' + type + '" deletable="false"' +
    ' x="' + x + '"' +
    ' y="' + y + '">' +
    (child ? '<next>' + child + '</next>' : '') +
    '</block>';
};

/*
 * Configuration for all levels.
 */

module.exports = {
  '1': {
    'ideal': 2,
    'requiredBlocks': [
      [{'test': 'flap', 'type': 'flappy_flap'}]
    ],
    'obstacles': false,
    'ground': false,
    'score': false,
    'infoText': true,
    'freePlay': false,
    'tickLimit': 80,
    'goal': {
      x: 103,
      y: 0
    },
    'scale': {
      'snapRadius': 2
    },
    'toolbox':
      tb(flapBlock + playSoundBlock),
    'startBlocks':
      eventBlock('flappy_whenClick', COL1, ROW1)
  },

  '2': {
    'ideal': 3,
    'requiredBlocks': [
      [{'test': 'endGame', 'type': 'flappy_endGame'}]
    ],
    'obstacles': false,
    'ground': true,
    'score': false,
    'infoText': true,
    'freePlay': false,
    'tickLimit': 120, // how long it takes to fly just past first obstacle
    'goal': {
      x: 106,
      y: 320,
      validation: function () {
        return (Flappy.gameState === Flappy.GameStates.OVER);
      }
    },
    'scale': {
      'snapRadius': 2
    },
    'toolbox':
      tb(flapBlock + endGameBlock + playSoundBlock),
    'startBlocks':
      eventBlock('flappy_whenClick', COL1, ROW1, flapBlock) +
      eventBlock('flappy_whenCollideGround', COL1, ROW2)
  },

  '3': {
    'ideal': 3,
    'requiredBlocks': [
      [{'test': 'endGame', 'type': 'flappy_endGame'}]
    ],
    'obstacles': true,
    'ground': true,
    'score': false,
    'infoText': true,
    ' freePlay': false,
    'tickLimit': 140,
    'goal': {
      validation: function () {
        // meant to test that we're crashing into first obstacle, but right now we
        // will also pass by crashing into ground in obstacle location without
        // ever having attached to obstacle collide event
        var obstacle0x = document.getElementById('obstacle_top0').getAttribute('x');
        return (parseInt(obstacle0x, 10) <= 144 &&
          Flappy.gameState === Flappy.GameStates.OVER);
      }
    },
    'scale': {
      'snapRadius': 2
    },
    'toolbox':
      tb(flapBlock + endGameBlock + playSoundBlock),
    'startBlocks':
      eventBlock('flappy_whenClick', 20, 20, flapBlock) +
      eventBlock('flappy_whenCollideGround', COL1, ROW2, endGameBlock) +
      eventBlock('flappy_whenCollideObstacle', COL2, ROW2)
  },

  '4': {
    'ideal': 5,
    'requiredBlocks': [
      [{'test': 'incrementPlayerScore', 'type': 'flappy_incrementPlayerScore'}]
    ],
    'obstacles': true,
    'ground': true,
    'score': true,
    'infoText': true,
    'freePlay': false,
    'tickLimit': 140,
    'goal': {
      validation: function () {
        // bird got into first obstacle and has score of 1
        return (Flappy.tickCount - Flappy.firstActiveTick >= 114 &&
          Flappy.playerScore === 1);
      }
    },
    'scale': {
      'snapRadius': 2
    },
    'toolbox':
      tb(flapBlock + endGameBlock + incrementScoreBlock + playSoundBlock),
    'startBlocks':
      eventBlock('flappy_whenClick', COL1, ROW1, flapBlock) +
      eventBlock('flappy_whenCollideGround', COL1, ROW2, endGameBlock) +
      eventBlock('flappy_whenCollideObstacle', COL2, ROW2, endGameBlock) +
      eventBlock('flappy_whenEnterObstacle', COL2, ROW1)
  },

  '5': {
    'ideal': 5,
    'requiredBlocks': [
      [{'test': 'flap', 'type': 'flappy_flap_height'}]
    ],
    'obstacles': true,
    'ground': true,
    'score': true,
    'infoText': true,
    'freePlay': false,
    'tickLimit': 140,
    'goal': {
      validation: function () {
        // bird got into first obstacle and has score of 1
        return (Flappy.tickCount - Flappy.firstActiveTick >= 114 &&
          Flappy.playerScore === 1);
      }
    },
    'scale': {
      'snapRadius': 2
    },
    'toolbox':
      tb(flapHeightBlock + endGameBlock + incrementScoreBlock + playSoundBlock),
    'startBlocks':
      eventBlock('flappy_whenClick', COL1, ROW1) +
      eventBlock('flappy_whenCollideGround', COL1, ROW2, endGameBlock) +
      eventBlock('flappy_whenCollideObstacle', COL2, ROW2, endGameBlock) +
      eventBlock('flappy_whenEnterObstacle', COL2, ROW1, incrementScoreBlock)
  },

  '11': {
    'requiredBlocks': [
    ],
    'obstacles': true,
    'ground': true,
    'score': true,
    'infoText': true,
    'freePlay': true,
    'scale': {
      'snapRadius': 2
    },
    'freePlay': true,
    'toolbox':
      tb(
        category('game',
          flapHeightBlock +
          playSoundBlock +
          incrementScoreBlock +
          endGameBlock
        ) +
        category('setters',
          setSpeedBlock +
          setGapHeightBlock +
          setBackgroundBlock +
          setPlayerBlock +
          setObstacleBlock +
          setGroundBlock
          )
        ),
    'startBlocks':
      eventBlock('flappy_whenClick', CATEGORY_BUFFER + COL1, ROW1) +
      eventBlock('flappy_whenCollideGround', CATEGORY_BUFFER + COL1, ROW2) +
      eventBlock('flappy_whenCollideObstacle', CATEGORY_BUFFER + COL2, ROW2) +
      eventBlock('flappy_whenEnterObstacle', CATEGORY_BUFFER + COL2, ROW1) +
      eventBlock('flappy_whenRunButtonClick', CATEGORY_BUFFER + COL1, ROW3)
  }
};
