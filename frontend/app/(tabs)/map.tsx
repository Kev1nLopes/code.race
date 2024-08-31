import { useState } from "react";
import { SafeAreaView, StyleSheet, Text } from "react-native";
import MapView, { LatLng, MapMarker, MapPolygon, Marker } from "react-native-maps";

interface SafePlace {
    coordinate: LatLng,
    title: string,
    description: string
}

export default function Map() {
    const [riskAreas, setRiskAreas] = useState<MapPolygon[]>([]);
    const [safePlaces, setSafePlaces] = useState<SafePlace[]>([]);

    ()=>{
        setSafePlaces([
            {
                coordinate: {latitude: -29.691828842370427, longitude:-53.80606971771388},
                title: "Hospital",
                description: "Descrição hospital"
            }
        ])
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
            >
                {safePlaces.map((marker, index)=>(
                    <Marker
                        key={index}
                        coordinate={marker.coordinate}
                        title={marker.title}
                        description={marker.description}
                    />
                ))}
            </MapView>
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