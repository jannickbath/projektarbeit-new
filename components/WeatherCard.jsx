export default function WeatherCard(props)
{
    if (isEmpty(props.data)) {
        return (
            <div className="weatherCard">
                <h1>Invalid Location</h1>
            </div> 
        )
    }else {
        return (
            <div className="weatherCard">
                <h3 className="provider">{props.provider}</h3>
                {
                Object.entries(props.data).map(([key, value]) => (
                    <div key={key}>
                    <span>{key}: </span>
                    <span>{value}</span>
                </div>
                ))}
            </div>
        );
    }
}

function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}