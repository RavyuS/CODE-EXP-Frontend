import { LineChart, YAxis, Grid, XAxis } from 'react-native-svg-charts'
import * as scale from 'd3-scale'
import { View, useWindowDimensions, Text } from 'react-native'
import React from 'react'


export default ({ placeSlotsArray, predict }) => {
    const axesSvg = { fontSize: 10, fill: 'grey' };
    const verticalContentInset = { top: 10, bottom: 10 }
    const xAxisHeight = 30
    let data
    const YAxisData = [...placeSlotsArray, 0]
    predict ? data = predictorArrayGenerate(placeSlotsArray) : data = placeSlotsArray
    return (
        <>
            <View style={{ height: useWindowDimensions().height * 0.50, padding: 20, flexDirection: 'row' }}>
                <YAxis
                    data={YAxisData}
                    style={{ marginBottom: xAxisHeight }}
                    contentInset={verticalContentInset}
                    svg={axesSvg}
                />
                <View style={{ flex: 1, marginLeft: 10 }}>
                    <LineChart
                        style={{ flex: 1 }}
                        data={data}
                        contentInset={verticalContentInset}
                        // svg={{ stroke: '#EE964B',strokeWidth:2 }}
                        svg={({ item }) => item.svg}
                        animate={true}
                    >
                        <Grid />
                    </LineChart>
                    <XAxis
                        style={{ marginHorizontal: -10, height: xAxisHeight }}
                        data={xAxisData}
                        formatLabel={(_, index) => xAxisData[index]}
                        contentInset={{ left: 10, right: 10 }}
                        svg={axesSvg}
                    />
                </View>


            </View>
            <View style={{ flexDirection: 'row', marginHorizontal: 30 }}>
                <Text>Actual Data</Text>
                <View style={{ flex: 1, height: 3, backgroundColor: '#EE964B', marginTop: 10, marginHorizontal: 10 }} />
                <Text style={{ marginLeft: 20 }}>Predicted Data</Text>
                <View style={{ flex: 1, height: 3, backgroundColor: '#233D4D', marginTop: 10, marginHorizontal: 10 }} />
            </View>
        </>
    )
}

const slotsToData = placeSlotsArray => {

}

const xAxisData = ["   00:00", "06:00", "12:00", "18:00", "23:59   "]


const predictorArrayGenerate = placeSlotsArray => {
    // const predictedData = predictedDataNTUC.map(ele => ele*2)
    const predictedData = predictedDataNTUC.slice(35).map(ele => ele * 2)
    let data = placeSlotsArray.slice(0, 35)
    data.push(...predictedData)

    data.map((ele, index) => {
        if (index < 35) {
            return {
                data: ele,
                svg: { stroke: '#EE964B', strokeWidth: 2 }
            }
        }
        else {
            return {
                data: ele,
                svg: { stroke: '#233D4D', strokeWidth: 2 }
            }
        }
    })

    // const data = [
    //     {
    //         data:placeSlotsArray,
    //         svg:{ stroke: '#EE964B',strokeWidth:2 }
    //     },
    //     {
    //         data:predictedData,
    //         svg:{ stroke: '#233D4D',strokeWidth:2 }
    //     }

    // ]
    return data
}

const predictedDataNTUC = [
    12.516380
    , 14.061520
    , 9.897364
    , 11.102422
    , 10.092754
    , 13.534723
    , 13.634956
    , 23.066833
    , 20.981383
    , 26.622325
    , 34.689610
    , 31.754079
    , 53.399394
    , 59.137634
    , 75.399283
    , 78.651786
    , 79.492840
    , 85.913344
    , 75.044122
    , 74.819764
    , 80.819765
    , 84.623605
    , 109.137704
    , 116.203090
    , 108.165900
    , 101.492832
    , 87.717188
    , 69.651802
    , 78.586415
    , 68.427446
    , 49.464636
    , 61.464636
    , 69.240280
    , 70.913348
    , 88.558219
    , 80.109507
    , 95.978734
    , 102.791568
    , 116.754378
    , 103.109507
    , 90.464636
    , 84.165900
    , 67.240280
    , 54.483839
    , 44.006931
    , 29.810771
    , 18.137704
    , 18.044120
]