import GoogleMapReact from 'google-map-react'

export const DetailsMap = ({address, summary, loc }) => {
  const KEY_API = 'AIzaSyCSTYpS7R9HWo0VhmC5M81BkN-O0jP-o0I'

  const lan = loc.lat
  const lat = loc.lan

  const defaultProps = {
    center: {
      lat: lat,
      lng: lan,
    },
    zoom: 14,
  }


  const apiIsLoaded = (map, maps) => {
    return new maps.Marker({
      position: { lat: lat, lng: lan },
      map,      
    })
  }

  return (
    <div className="details-map-wrapper">
      <h1>Where you’ll be</h1>
      <div className="details-map">
        <GoogleMapReact
          bootstrapURLKeys={{
            key: KEY_API,
          }}
          defaultCenter={defaultProps.center}
          defaultZoom={defaultProps.zoom}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => apiIsLoaded(map, maps)}
        />
      </div>
      <div className="place-info">
        <h3>{address}</h3>
        <p>{summary}</p>
        <a href="">Show more</a>
      </div>
    </div>
  )
}
