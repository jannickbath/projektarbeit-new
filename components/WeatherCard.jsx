import Utility from "../Classes/Utility";

export default function WeatherCard(props)
{
    if (Utility.isEmpty(props.data)) {
        return (
            <div className="weatherCard invalid">
                <h1>Invalid Location</h1>
            </div> 
        )
    }else {
        return (
            <div className="weatherCard">
                <h3 className="provider">{props.provider}</h3>
                {
                Object.entries(props.data).map(([key, value]) => (
                <div key={key} className="property">
                    <span>{key}: </span>
                    <span>{value}</span>
                </div>
                ))}
            </div>
        );
    }
}