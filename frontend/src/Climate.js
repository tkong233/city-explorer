import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Brightness5Icon from '@material-ui/icons/Brightness5';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Result from './ClimateResult/Result';
import PrecipitationResult from './ClimateResult/PrecipitationResult';
import TemperatureDiffResult from './ClimateResult/TemperatureDiffResult';
import WeatherCard from './ClimateResult/WeatherCard';
import { CardColumns } from "react-bootstrap";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Climate Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = theme => ({
  root: {
	height: '230vh',
  },
  rainImg: {
  	backgroundImage: 'url(https://images.unsplash.com/photo-1619233651146-7364c945c3ee?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyNnx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60)',
  	backgroundRepeat: 'no-repeat',
	backgroundColor:
	  theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
	backgroundSize: 'cover',
	backgroundPosition: 'center',
	margin: theme.spacing(3, 0, 3),
  },
  image: {
	backgroundImage: 'url(https://images.unsplash.com/photo-1619203596659-6029850f0c73?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw2MHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60)',
	backgroundRepeat: 'no-repeat',
	backgroundColor:
	  theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
	backgroundSize: 'cover',
	backgroundPosition: 'center',
  },
  paper: {
	margin: theme.spacing(8, 4),
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
  },
  avatar: {
	margin: theme.spacing(1),
	backgroundColor: theme.palette.secondary.main,
  },
  form: {
	width: '100%', // Fix IE 11 issue.
	marginTop: theme.spacing(1),
  },
  form1: {
	width: '100%', // Fix IE 11 issue.
  },
  submit: {
	margin: theme.spacing(3, 0, 15),
  },
  result: {
  	padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'row',
  },
  singleWeatherCard: {
	display: 'table',
  }
});

class Climate extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			climateCity:"",
			climateState:"",
			precYear:"",
			precMonth:"",
			tempYear:"",
			tempMonth:"",
			forecastCity:"",
			displayForecastCity:"",
			climateR: [],
			precR: [],
			tempR: [],
			weatherapiKey: "182d6cd6eca58af2af3d43c704b7657b",
			forecastData: [],
			forecastDailyData: []
		};

		this.getClimateResult = this.getClimateResult.bind(this);
		this.getPrecResult = this.getPrecResult.bind(this);
		this.getTempResult = this.getTempResult.bind(this);
		this.getWeatherForcast = this.getWeatherForcast.bind(this);
	}

	getClimateResult (){
		fetch("http://localhost:8081/climate/city/monthly_climate/"+this.state.climateCity+"/"+this.state.climateState,{
		  method: "GET"
		})
		.then(res => {
		    return res.json();
		}, err => {
		  console.log(err);
		})
		.then(climate_l => {
		  if (!climate_l) return;
		  climate_l = Array.from(climate_l);

		  this.setState({
		    climateR: climate_l
		  });
		}, err => {
		  // Print the error if there is one.
		  console.log(err);
		});
	}
	getPrecResult (){
		fetch("http://localhost:8081/climate/time/prcp/"+this.state.precYear+"/"+this.state.precMonth,{
		  method: "GET"
		})
		.then(res => {
		    return res.json();
		}, err => {
		  console.log(err);
		})
		.then(climate_l => {
		  if (!climate_l) return;
		  climate_l = Array.from(climate_l);

		  this.setState({
		    precR: climate_l
		  });
		}, err => {
		  // Print the error if there is one.
		  console.log(err);
		});
	}
	getTempResult (){
		fetch("http://localhost:8081/climate/time/temp_diff/"+this.state.tempYear+"/"+this.state.tempMonth,{
		  method: "GET"
		})
		.then(res => {
		    return res.json();
		}, err => {
		  console.log(err);
		})
		.then(climate_l => {
		  if (!climate_l) return;
		  climate_l = Array.from(climate_l);

		  this.setState({
		    tempR: climate_l
		  });
		}, err => {
		  // Print the error if there is one.
		  console.log(err);
		});
	}

	getWeatherForcast() {
		fetch("http://api.openweathermap.org/data/2.5/forecast?q="+this.state.forecastCity + "&appid=" + this.state.weatherapiKey,{
			method: "GET"
		})
		.then(res => {
		    return res.json();
		}, err => {
		  console.log(err);
		})
		.then(data => 
			{
				const dailyData = data.list.filter(reading => {return reading.dt_txt.includes("00:00:00")})
			    this.setState({
				    forecastData: data.list,
					forecastDailyData: dailyData
			    })
		    }
		  )
		this.setState({
			displayForecastCity: this.state.forecastCity
		})
	}

	forecastDailyWeatherCards = () => {
		console.log(this.state.forecastDailyData);
		return this.state.forecastDailyData.map((data, index) => <WeatherCard data={data} key={index} />)
	}

	render() {
		const { classes } = this.props;
		const handleCityChange = (e) => {
			this.setState({
				climateCity: e.target.value
			});
		};
		const handleStateChange = (e) => {
			this.setState({
				climateState: e.target.value
			});
		};
		const handlePrecYearChange = (e) => {
			this.setState({
				precYear: e.target.value
			});
		};
		const handlePrecMonthChange = (e) => {
			this.setState({
				precMonth: e.target.value
			});
		};
		const handleTempYearChange = (e) => {
			this.setState({
				tempYear: e.target.value
			});
		};
		const handleTempMonthChange = (e) => {
			this.setState({
				tempMonth: e.target.value
			});
		};

		const handleWeatherForecastState = (e) => {
			this.setState({
				forecastCity: e.target.value
			});
		};

		return (
			<Grid container component="main" className={classes.root}>
			  <CssBaseline />
			  <Grid item xs={false} sm={4} md={5} className={classes.image} />
			  <Grid item xs={12} sm={8} md={7} component={Paper} elevation={6} square>
				<div className={classes.paper}>
				  <Avatar className={classes.avatar}>
					<Brightness5Icon />
				  </Avatar>
				  <Typography component="h1" variant="h5">
					City Overview
				  </Typography>
				  <form className={classes.form} noValidate>
					<TextField
					  variant="outlined"
					  margin="normal"
					  required
					  fullWidth
					  id="city"
					  label="City"
					  name="city"
					  onChange={handleCityChange}
					  autoFocus
					/>
					<TextField
					  variant="outlined"
					  margin="normal"
					  required
					  fullWidth
					  name="state"
					  label="State"
					  type="state"
					  id="state"
					  onChange={handleStateChange}
					/>
					<Button
					  fullWidth
					  variant="contained"
					  color="primary"
					  className={classes.submit}
					  onClick={this.getClimateResult}
					>
					  City Overview
					</Button>
				  	<Result data={this.state.climateR}/>
				  </form>
				</div>
			  </Grid>
			  <Grid item xs={12} className={classes.rainImg} />
			  <Grid item xs={6} component={Paper} elevation={6} square>
			  	<form className={classes.form1} noValidate>
					<TextField
					  variant="outlined"
					  margin="normal"
					  required
					  id="month"
					  label="Month"
					  name="month"
					  onChange={handlePrecMonthChange}
					/>
					<TextField
					  variant="outlined"
					  margin="normal"
					  required
					  name="year"
					  label="Year"
					  type="year"
					  id="year"
					  onChange={handlePrecYearChange}
					/>
					<Button
					  variant="contained"
					  color="primary"
					  onClick={this.getPrecResult}
					>
					  Query
					</Button>
				  	<PrecipitationResult data={this.state.precR}/>
				</form>
			  </Grid>
			  <Grid item xs={6} component={Paper} elevation={6} square>
			  	<form className={classes.form1} noValidate>
					<TextField
					  variant="outlined"
					  margin="normal"
					  required
					  id="month"
					  label="Month"
					  name="month"
					  onChange={handleTempMonthChange}
					/>
					<TextField
					  variant="outlined"
					  margin="normal"
					  required
					  name="year"
					  label="Year"
					  type="year"
					  id="year"
					  onChange={handleTempYearChange}
					/>
					<Button
					  variant="contained"
					  color="primary"
					  onClick={this.getTempResult}
					>
					  Query
					</Button>
			  		<TemperatureDiffResult data={this.state.tempR}/>
			  	</form>
			  </Grid>
			  <Grid item xs = {12} component={Paper} elevation={12} square>
			    <form className={classes.form1} noValidate>
			        <TextField
					  variant="outlined"
					  margin="normal"
					  required
					  name="city"
					  label="city"
					  id="forecastcity"
					  onChange={handleWeatherForecastState}
					/>
					<Button
					  variant="contained"
					  color="primary"
					  onClick={this.getWeatherForcast}
					>
						Search
					</Button>
				</form>
				<div>
                    <h1 className="weather forecast title">5-Day Forecast</h1>
                    <h5 className="display weather forecast city">{this.state.displayForecastCity}</h5>
					<div class="singleWeatherCard">
                        {this.forecastDailyWeatherCards()}
					</div>
                </div>
			  </Grid>

			  <Grid item xs={12}>
			  	<Box mt={4}>
					<Copyright />
				</Box>
			  </Grid>
			</Grid>
		);
	}
}

export default  withStyles(useStyles)(Climate);