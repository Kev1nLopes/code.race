import axios from "axios"



export async function VerificarClimaSemanal(latitude: string, longitude: string){
    try{
        const response = await axios.get(`${process.env.TOMORROW_URL}`, {params: {
            location: `${latitude},${longitude}`,
            apiKey: process.env.TOMORROW_KEY
        }})
        
        console.log("🚀 ~ VerificarClimaSemanal ~ response:", response)
        

    }catch(error){
        console.log('Não foi possível consultar o clima')
    }
}