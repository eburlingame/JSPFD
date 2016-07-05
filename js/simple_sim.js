function FlightSim()
{
	var self = this;

	self.data = {
		airspeed: 46.197176,
		latitude: -121.516602,
		longitude: 0,
		trueCourse: 0,
		heading: 180,
		headingBug: 200,
		groundSpeed: 100, 
		airspeedBug: 100,	
		altitude: 5000,
		altitudeBug: 5000,		
		verticalSpeed: 0,
		verticalSpeedBug: 1000,		
		bankAngle: 0,
		pitchAngle: 0,
		turnCoordinationAngle: 0,
		terrainAhead: 0,
	}

	// Variables 
	self.x = 0; // Horizontal position
	self.y = 1000; // Vertical position (altitude)

	self.V_a = 180; // Airspeed
	self.V_x = 180; // Horizontal velocity
	self.V_y = 0; // Vertical velocity

	self.A_x = 0; // Horizontal acceleration
	self.A_y = 0; // Vertical acceleration

	self.theta_a = 10; // Angle of attack 
	self.omega_a = 0; // Pitch angular velocity
	self.alpha_a = 0; // Pitch acceleration 

	// Calibration scalars
	self.C_T = 0.01; // Throttle force scalar
	self.C_D = 0.0001; // Drag force scalar
	self.C_L = 0.001; // Lift function
	self.C_E = 0.1; // Elevator torque scalar

	self.G = 0.5; // Gravitational force (mg)

	// Inputs
	self.I_t = 1; // Throttle input (0 to 1)
	self.I_e = 0; // Elevator input (-1, to 1)

	self.setControls = function(elevator, alerion, throttle)
	{
		self.I_e = elevator;
		self.I_t = throttle;
	}

	// Updates the simulation (dt in seconds)
	self.update = function(dt)
	{
		console.log(self.I_e);
		self.alpha_a = self.C_E * self.I_e * self.V_a;
		self.omega_a += self.alpha_a * dt;
		self.theta_a += self.omega_a * dt;

		self.A_x = self.C_T * self.I_t - self.C_D * self.theta_a * self.V_a;
		self.A_y = self.C_L * self.theta_a * self.V_a - self.G;

		self.V_a += self.A_x * dt;
		self.V_y += self.A_y * dt;
		self.V_x = Math.cos(self.theta_a) * self.V_a;

		self.y += self.V_y * dt;
		self.x += self.V_x * dt;

		self.transferData();
	}

	self.transferData = function()
	{
		self.data.altitude = self.y;
		self.data.verticalSpeed = self.V_y;
		self.data.trueCourse = 0;
		self.data.heading = 0;
		self.data.groundSpeed = self.V_x;
		self.data.airspeed = self.V_a;
		self.data.pitchAngle = self.theta_a;
		self.data.bankAngle = 0;

		self.data.latitude = 46.197176;
		self.data.longitude = -121.516602;
	}
}