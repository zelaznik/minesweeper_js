(function() {
  'use strict';

  window.RobotView = function RobotView(options) {
    View.call(this, options);
    this.setActive(true);
  };

  RobotView.inherits(View, mixin(CompetitiveView, {
    gameType: window.RobotGame,

    setActive: function(value) {
      this._active = value;
    },

    active: function() {
      return !!this._active;
    },

    start: function(options) {
      if (!this.active()) {
        return;
      }

      var randomMoves, randomFlags, debugGetValues;
      var pos, view, match, x, i, n, ct, p, totalMoves;

      View.prototype.start.call(this, options);

      randomMoves = this.game.mineField.randomMoves;
      randomFlags = this.game.mineField.randomFlags;
      pos = randomMoves.pop(); // Pre-load first move.
      view = this;

      this._tick = setInterval(function() {
        // Either flag a mine or reveal a new square.
        var successfulMove = false;
        while (!successfulMove) {
          totalMoves = randomFlags.length + randomMoves.length;
          p = (totalMoves === 0) ? 0 : randomFlags.length / totalMoves;
          if (Math.random() < (1 + p) / 2) {
            if (view.game.get(pos) === undefined) {
              view.toggleFlag(randomFlags.pop());
              successfulMove = true;
              break;
            }

          } else {
            while (view.game.get(pos) !== undefined) {
              pos = randomMoves.pop();
            }
            view.reveal(pos);
            successfulMove = true;
            break;
          }

        }
        view.draw();

      }.bind(this), 50);
    },

    stop: function(options) {
      CompetitiveView.prototype.stop.call(this, options);
      clearInterval(this._tick);
    },

    reset: function(newOptions) {
      CompetitiveView.prototype.reset.call(this, newOptions);
      clearInterval(this._tick);
    }
  }));

})();
