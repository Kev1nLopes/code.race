import useApi from "@/hooks/useApi";
import { LucideCheck, LucideX } from "lucide-react-native";
import { useEffect, useState } from "react";
import { Alert, Button, Image, Modal, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import MapView, { LatLng, MapPressEvent, Marker, MarkerPressEvent, Polygon, PolygonPressEvent } from "react-native-maps";

interface SafePlace {
    id: string,
    coordinate: LatLng,
    latitude?: number
    longitude?: number
    title: string,
    description: string
}

interface Perimetro {
    perimetro: LatLng[]
}

interface RiskArea {
    id: number,
    tipo: string,
    coordinates: Perimetro,
    aprovado: boolean
}

export default function Map() {
    const { api } = useApi()
    const [riskAreas, setRiskAreas] = useState<RiskArea[]>([]);
    const [safePlaces, setSafePlaces] = useState<SafePlace[]>([]);
    const [visible, setVisible] = useState(false)
    const [selectedMarker, setSelectedMarker] = useState<SafePlace>();

    const [riskModal, setRiskModal] = useState(false);
    const [risk, setRisk] = useState<any>({});
    const [position, setPosition] = useState({latitude: -29.69195740604275, longitude: -53.79072837121402})

    const [positioning, setPositioning] = useState(false);

    const onMarkerPress = (e: MarkerPressEvent) => {
        const marker = safePlaces.find((m)=> m.id === e.nativeEvent.id)
        setSelectedMarker(marker)
        setVisible(true)
    }

    useEffect(()=>{
        api.get<SafePlace[]>("/pontos").then((res)=>{
            const data = res.data;
            data.forEach(e=> e.coordinate = {latitude: e.latitude!, longitude: e.longitude!})
            setSafePlaces([...data, ...safePlaces])
        }).catch((err)=>{
            console.log("[GET/MARKERS] "+err)
        })
        api.get<RiskArea[]>("/areas").then((res)=>{
            setRiskAreas([...res.data, ...riskAreas]);
        }).catch((err)=>{
            console.log("[GET/AREAS] "+ err)
        })
        setSafePlaces([
            {
                id: "1",
                coordinate: {latitude: -29.691828842370427, longitude:-53.80606971771388},
                title: "Hospital",
                description: "Descrição hospital"
            }
        ])
        setRiskAreas([
            {
                aprovado: true,
                id: 1,
                tipo: "aaa",
                coordinates: {
                    perimetro: [
                        {latitude: -29.677382913206184, longitude: -53.82006642805862},
                        {latitude: -29.676098510850235, longitude: -53.80983339419876},
                        {latitude: -29.683121577855378, longitude: -53.809111647072505},
                        {latitude: -29.68275195554361, longitude: -53.81800649362528},
                        {latitude: -29.677382913206184, longitude: -53.82006642805862}
                    ]
                }
            }
        ])
    }, [])

    const addRisk = () => {
        setRiskModal(true)
    }

    const createRisk = () => {
        Alert.alert("Posicione o nmarcador", "Voce deve posivionar o marcador no local que o problema esta localizado")
        setPositioning(true)
        setRiskModal(false)
    }

    const mapPress = (e: MapPressEvent) => {
        const point = e.nativeEvent.coordinate
        const area = riskAreas.find((e)=> isPointInPolygon(point, e))
        if(area){
            setSelectedMarker({coordinate: 
                {
                    latitude: area.coordinates.perimetro[0].latitude,
                    longitude: area.coordinates.perimetro[0].longitude
                },
                description: "Area com severo risco de deslizamento, se houver mais chuvas os destroços podem se espalhar ainda mais",
                id: "3",
                title: "Deslizamento"
            })
            setVisible(true)
        }
    }
 
    const saveRisk = () => {
        api.post("/ponto", 
            {
                titulo: risk.titulo,
                descricao: risk.descricao,
                latitude: position.latitude,
                longitude: position.longitude
            }).then((res)=>{
            console.log("sla poha")
            Alert.alert("Sucesso!", "Problema enviado e sera avaliado pelas entidades responsaveis")
        }).finally(()=>{
            setRisk(undefined)
        })
    }

    const polygonCalback = (e: PolygonPressEvent) => {
        console.log(e.nativeEvent)
    }

    return (
        <SafeAreaView style={styles.contaienr}>
            <MapView style={styles.map}
                initialRegion={{
                    latitude: -29.69195740604275, 
                    longitude: -53.79072837121402,
                    latitudeDelta: 0.05,
                    longitudeDelta: 0.05
                }}
                onMarkerPress={onMarkerPress}
                onPress={mapPress}
            >
                {!positioning ? safePlaces.map((marker, index)=>(
                    <Marker
                        identifier={marker.id}
                        key={index}
                        coordinate={marker.coordinate}
                        title={marker.title}
                        description={marker.description}
                        image={require("@/assets/images/safeplace.png")}
                    />
                )) : (
                    <Marker 
                        coordinate={position}
                        draggable={true}
                        onDragEnd={(e)=>setPosition(e.nativeEvent.coordinate)}
                    />
                )}
                {riskAreas.map((area, index)=>(
                    <Polygon key={index}
                        coordinates={area.coordinates.perimetro}
                        fillColor="#FF000060"
                        onPress={(e)=>{polygonCalback(e)}}
                    />
                ))}
            </MapView>
            <Modal visible={visible && selectedMarker != undefined} style={{width: "80%", height: "60%"}}>
                <View style={{height: "95%", justifyContent: 'flex-start', alignItems: 'center'}}>
                    <Image
                        style={{width: 450, height: 400}}
                        source={
                            selectedMarker?.id == "1" ?
                            require("@/assets/images/abrigo.webp") :
                            require("@/assets/images/desliz.webp")
                        }
                    />
                    <Text style={{fontWeight: 'bold', fontSize: 20}}>{selectedMarker?.title}</Text>
                    <Text>{selectedMarker?.description}</Text>
                </View>
                <Button 
                    onPress={()=>{
                        setVisible(!visible)
                        setSelectedMarker(undefined)
                    }} 
                    title="Fechar"
                />
            </Modal>
            { !positioning ? (
                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={addRisk}
                    style={styles.touchableOpacityStyle}>
                    <Image
                        source={{
                            uri: 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/plus_icon.png',
                        }}
                        style={styles.floatingButtonStyle}
                    />
                </TouchableOpacity>
            ) : (
                <View>
                    <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={saveRisk}
                        style={styles.touchableOpacityStyle2}>
                        <Image
                            source={{
                                uri: 'https://cdn4.iconfinder.com/data/icons/web-ui-color/128/Checkmark-512.png',
                            }}
                            style={styles.floatingButtonStyle}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={()=>{
                            setPositioning(false)
                            setRisk(undefined)
                        }}
                        style={styles.touchableOpacityStyle}>
                        <Image
                            source={{
                                uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Eo_circle_red_letter-x.svg/2048px-Eo_circle_red_letter-x.svg.png',
                            }}
                            style={styles.floatingButtonStyle}
                        />
                    </TouchableOpacity>
                </View>
            )}
            <Modal visible={riskModal}>
                <View style={{height: "95%", justifyContent: 'center', alignItems: 'center'}}>
                    <TextInput style={styles.input} placeholder="Problema" value={risk?.titulo ?? ""} 
                        onChangeText={(t)=>setRisk({...risk, titulo: t})}
                    />
                    <TextInput style={styles.input} placeholder="Descrição" value={risk?.descricao ?? ""}
                        onChangeText={(t)=>setRisk({...risk, descricao: t})}
                    />
                    <Button title="Criar" onPress={createRisk} />
                </View>
                <Button 
                    onPress={()=>{
                        setRiskModal(!riskModal)
                        setRisk(undefined)
                    }}
                    title="Fechar"
                />
            </Modal>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    contaienr: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
    },
    map: {
        width: '100%',
        height: '100%',
    },
    touchableOpacityStyle: {
      position: 'absolute',
      width: 50,
      height: 50,
      alignItems: 'center',
      justifyContent: 'center',
      right: 30,
      bottom: 30,
    },
    floatingButtonStyle: {
      resizeMode: 'contain',
      width: 50,
      height: 50,
    },
    touchableOpacityStyle2: {
      position: 'absolute',
      width: 50,
      height: 50,
      alignItems: 'center',
      justifyContent: 'center',
      left: 30,
      bottom: 30,
    },
    input: {
        borderRadius: 10,
        borderWidth: 1,
        width: "90%",
        height: 40,
        margin: 5,
        padding: 5
    }
})

function isPointInPolygon(point: LatLng, polygon: RiskArea) {
    let x = point.latitude, y = point.longitude;
    let inside = false;
    
    for (let i = 0, j = polygon.coordinates.perimetro.length - 1; i < polygon.coordinates.perimetro.length; j = i++) {
      let xi = polygon.coordinates.perimetro[i].latitude, yi = polygon.coordinates.perimetro[i].longitude;
      let xj = polygon.coordinates.perimetro[j].latitude, yj = polygon.coordinates.perimetro[j].longitude;
      
      let intersect = ((yi > y) !== (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
      if (intersect) inside = !inside;
    }
    
    return inside;
  }