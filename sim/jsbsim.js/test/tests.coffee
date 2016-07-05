expect = require('chai').expect
exec = require("child_process").exec

describe 'JSBSim.js', ->
	it 'should generate output without error', (done) ->
	   exec 'node index.js --aircraft=ball --initfile=reset01 --end=15', (error, stdout, stderr) ->
	   	expect(error).to.be.null
	   	done()
   ###
	describe 'output'
	   it 'should match the output of the JSBSim native executable'
	     # read in BallOut.csv
	     # compare
   ###

		