export default function WeatherCard(props)
{
    return (
        <div className="weatherCard">
            <h3 className="provider">{props.provider}</h3>
            <p>{JSON.stringify(props.data)}</p>
        </div>
    );
}