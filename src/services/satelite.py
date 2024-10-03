from flask import Flask, request, jsonify
from flask_cors import CORS
from skyfield.api import Topos, load
from datetime import timedelta

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# URL to fetch live TLE data for active Earth observation satellites
tle_url = 'http://celestrak.com/NORAD/elements/gp.php?GROUP=active&FORMAT=tle'

def get_satellite_data(satellite_name):
    try:
        # Load real-time TLE data from the Celestrak URL
        satellites = load.tle_file(tle_url)
        satellite_dict = {sat.name.upper(): sat for sat in satellites}
        
        # Find the requested satellite by name
        return satellite_dict.get(satellite_name.upper())
    except Exception as e:
        print(f"Error loading TLE data: {e}")
        return None

@app.route('/distance', methods=['POST'])
def calculate_distance():
    try:
        data = request.json
        latitude = data['latitude']
        longitude = data['longitude']
        satellite_name = data['satellite']

        # Fetch satellite TLE data in real-time
        selected_satellite = get_satellite_data(satellite_name)
        if not selected_satellite:
            return jsonify({'error': 'Satellite not found!'}), 404

        # Define the point on Earth using latitude and longitude
        earth_point = Topos(latitude_degrees=latitude, longitude_degrees=longitude)

        # Calculate the current position of the satellite at a given time
        ts = load.timescale()
        t = ts.now()

        # Get satellite position relative to Earth at the current time
        satellite_position = selected_satellite.at(t)
        earth_position = earth_point.at(t)

        # Calculate the distance between the point and the satellite
        difference = satellite_position - earth_position
        distance_km = difference.distance().km

        # Return the distance and satellite name as JSON
        return jsonify({'satellite': satellite_name, 'distance_km': distance_km})

    except Exception as e:
        return jsonify({'error': str(e)}), 500

def get_overpass_time(satellite, latitude, longitude):
    try:
        location = Topos(latitude_degrees=latitude, longitude_degrees=longitude)

        ts = load.timescale()
        t0 = ts.now()  # Current time
        t1 = ts.utc(t0.utc_datetime() + timedelta(days=1))  # One day from now

        # Find satellite pass events
        times, events = satellite.find_events(location, t0, t1, altitude_degrees=30.0)
        for ti, event in zip(times, events):
            if event == 0:  # Overpass event
                return ti.utc_iso()

        return "No overpass found in the next 24 hours"
    
    except Exception as e:
        print(f"Error calculating overpass time: {e}")
        return None

@app.route('/overpass', methods=['POST'])
def overpass():
    try:
        data = request.json
        latitude = data['latitude']
        longitude = data['longitude']
        satellite_name = data['satellite']

        # Fetch satellite TLE data
        selected_satellite = get_satellite_data(satellite_name)
        if not selected_satellite:
            return jsonify({'error': 'Satellite not found!'}), 404

        # Calculate overpass time
        overpass_time = get_overpass_time(selected_satellite, latitude, longitude)
        if overpass_time:
            return jsonify({'overpass_time': overpass_time})
        else:
            return jsonify({'error': 'Unable to calculate overpass time.'}), 500

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
