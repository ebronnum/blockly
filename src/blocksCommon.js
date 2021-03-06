/**
 * Defines blocks useful in multiple blockly apps
 */
'use strict';

var REPEAT_IMAGE_URL = 'media/sharedBlocks/repeat.png';
var REPEAT_IMAGE_WIDTH = 53;
var REPEAT_IMAGE_HEIGHT = 57;

/**
 * Install extensions to Blockly's language and JavaScript generator
 * @param blockly instance of Blockly
 */
exports.install = function(blockly) {
  // Re-uses the repeat block generator from core
  blockly.JavaScript.controls_repeat_simplified = blockly.JavaScript.controls_repeat;

  blockly.Blocks.controls_repeat_simplified = {
    // Repeat n times (internal number) with simplified UI
    init: function() {
      this.setHelpUrl(blockly.Msg.CONTROLS_REPEAT_HELPURL);
      this.setHSV(322, 0.90, 0.95);
      this.appendStatementInput('DO')
        .appendTitle(new blockly.FieldImage(
          blockly.assetUrl(REPEAT_IMAGE_URL), REPEAT_IMAGE_WIDTH, REPEAT_IMAGE_HEIGHT));
      this.appendDummyInput()
        .appendTitle(blockly.Msg.CONTROLS_REPEAT_TITLE_REPEAT)
        .appendTitle(new Blockly.FieldTextInput('10',
          blockly.FieldTextInput.nonnegativeIntegerValidator), 'TIMES');
      this.setPreviousStatement(true);
      this.setNextStatement(true);
      this.setTooltip(blockly.Msg.CONTROLS_REPEAT_TOOLTIP);
    }
  };
};
