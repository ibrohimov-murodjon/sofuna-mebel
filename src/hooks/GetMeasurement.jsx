import { useState, useEffect} from "react"

const url = 'https://custom.uz/products/measurement/'
const GetMeasurement = (id) => {
    const [data, setData] = useState(null)
    const [measurementName, setMeasurementName] = useState('')
    useEffect(() => {
        const getData = async () => {
            try {
               const req = await fetch(url)
               const result = await req.json()
               setData(result)
            } catch (err) {
                alert(err.message)
            }
        }
        getData()
        const measurement = data?.filter(measurement => {
            if(measurement.id == id){
                return measurement.name
            }
        })
        if(measurement){
            let {name} = measurement[0]
            setMeasurementName(name)
        }
    }, [url, id])
    return {measurementName}
}
export { GetMeasurement }
