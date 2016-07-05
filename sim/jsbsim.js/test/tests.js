(function() {
  var exec, expect;

  expect = require('chai').expect;

  exec = require("child_process").exec;

  describe('JSBSim.js', function() {
    return it('should generate output without error', function(done) {
      return exec('node index.js --aircraft=ball --initfile=reset01 --end=15', function(error, stdout, stderr) {
        expect(error).to.be["null"];
        return done();
      });
    });

    /*
    	describe 'output'
    	   it 'should match the output of the JSBSim native executable'
    	      * read in BallOut.csv
    	      * compare
     */
  });

}).call(this);
