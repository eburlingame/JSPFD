function PIDController(Kp, Ki, Kd)
{
	var self = this;
	self.e = 0; // Current error
	self.e0 = 0; // Last error
	self.Ie = 0; // Sum of errors
	self.de_dt = 0; // Derivative of errors

	self.Kp = Kp;
	self.Ki = Ki;
	self.Kd = Kd;

	self.elapsed = 0;
	self.reset = 1;

	self.update = function(delta, input, desiredInput)
	{
		self.elapsed += delta;
		self.e0 = self.e;
		self.e = desiredInput - input;
		self.Ie += self.e
		if (self.elapsed > 1)
			self.Ie = 0;
		self.de_dt = (self.e - self.e0) / delta;
	}

	self.getControl = function()
	{	
		return self.Kp * self.e 
			+  self.Ki * self.Ie
			+  self.Kd * self.de_dt;
	}

}