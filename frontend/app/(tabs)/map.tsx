import useApi from "@/hooks/useApi";
import { useEffect, useState } from "react";
import { Button, Modal, SafeAreaView, StyleSheet, Text, View } from "react-native";
import MapView, { LatLng, Marker, MarkerPressEvent, Polygon } from "react-native-maps";

interface SafePlace {
    id: string,
    coordinate: LatLng,
    title: string,
    description: string
}

interface RiskArea {
    coordinates: LatLng[],
}

export default function Map() {
    const { api } = useApi()
    const [riskAreas, setRiskAreas] = useState<RiskArea[]>([]);
    const [safePlaces, setSafePlaces] = useState<SafePlace[]>([]);
    const [visible, setVisible] = useState(false)
    const [selectedMarker, setSelectedMarker] = useState<SafePlace>();

    const onMarkerPress = (e: MarkerPressEvent) => {
        const marker = safePlaces.find((m)=> m.id === e.nativeEvent.id)
        setSelectedMarker(marker)
        setVisible(true)
    }

    useEffect(()=>{
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
                coordinates: [
                    {latitude: -29.677382913206184, longitude: -53.82006642805862},
                    {latitude: -29.676098510850235, longitude: -53.80983339419876},
                    {latitude: -29.683121577855378, longitude: -53.809111647072505},
                    {latitude: -29.68275195554361, longitude: -53.81800649362528},
                    {latitude: -29.677382913206184, longitude: -53.82006642805862}
                ]
            }
        ])
    }, [])

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
            >
                {safePlaces.map((marker, index)=>(
                    <Marker
                        identifier={marker.id}
                        key={index}
                        coordinate={marker.coordinate}
                        title={marker.title}
                        description={marker.description}
                        image={require("@/assets/images/safeplace.png")}
                    />
                ))}
                {riskAreas.map((area, index)=>(
                    <Polygon key={index}
                        coordinates={area.coordinates}
                        fillColor="#FF000060"
                    />
                ))}
            </MapView>
            <Modal visible={visible && selectedMarker != undefined} style={{width: "80%", height: "60%"}}>
                <View style={styles.contaienr}>
                    <Button onPress={()=>setVisible(!visible)} title="close" />
                    <Text>{selectedMarker?.title ?? ""}</Text>
                </View>
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
    }
})