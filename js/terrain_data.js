
var elevationData;

function TerrainData()
{
	this.url = "http://nationalmap.gov/epqs/pqs.php";
	//x=string&y=string&units=string&output=string
	this.elevationArr = [];
	this.getElevation = function(latitude, longitude, id)
	{
		var self = this;
		$.post(this.url, 
			{ 
				y: latitude, 
				x: longitude, 
				unit: "feet", 
				output: "json", 
			},
			function(data)
			{
				self.saveData(data, id);
			},
			"json"
			);
	}

	this.saveData = function(data, id)
	{
  		var elevation = data.USGS_Elevation_Point_Query_Service.Elevation_Query.Elevation;
  		this.elevationArr[id].elevation = elevation;
	}

	this.getRelativePoint = function(latitude, longitude, bearing, nm)
	{
		var initalPoint = new LatLon(latitude, longitude);
		var distance = nm * 1852;
		return initalPoint.rhumbDestinationPoint(distance, bearing);
	}

	this.getElevationArray = function(latitude, longitude, bearing, nmStart, nmStop, stepSizeNm)
	{
		var i = 0;
		for (var dist = nmStart; dist <= nmStop; dist += stepSizeNm)
		{
			var newPoint = this.getRelativePoint(latitude, longitude, bearing, nmStart + dist);
			if (this.elevationArr[i] == null)
			{
				this.elevationArr[i] = { 
				"location" : newPoint, 
				"distance" : dist,
				"stepSize" : stepSizeNm,
				"bearing" : bearing
			};
			}
			else
			{
				this.elevationArr[i].location = newPoint;
				this.elevationArr[i].distance = dist;
				this.elevationArr[i].stepSize = stepSizeNm;
				this.elevationArr[i].bearing = bearing;
			}

			
			this.getElevation(newPoint.lat, newPoint.lon, i);
			i++; 
		}
	}
}
