import { BarChart, YAxis, Grid, XAxis } from 'react-native-svg-charts'
import * as scale from 'd3-scale'
import { View, useWindowDimensions, Text } from 'react-native'
import React from 'react'
import moment from 'moment';
import utils from '../../utils'

export default ({ placeSlotsArray, predict }) => {
    const axesSvg = { fontSize: 10, fill: 'grey' };
    const verticalContentInset = { top: 10, bottom: 10 }
    const xAxisHeight = 0
    let data
    const YAxisData = [...placeSlotsArray, 0]
    predict ? data = predictorArrayGenerate(placeSlotsArray) : data = placeSlotsArray.map(ele=>({value:ele,svg:{fill: '#EE964B', strokeWidth: 2}}))
    console.log(getTimeIndex())

    return (
        <>
        <View style={{ height: useWindowDimensions().height * 0.30, padding: 20, flexDirection: 'row' }}>
            <YAxis
                data={YAxisData}
                style={{ marginBottom: xAxisHeight }}
                contentInset={verticalContentInset}
                svg={axesSvg}
            />
            <View style={{ flex: 1, marginLeft: 10 }}>
                <BarChart
                    style={{ height: 200 }}
                    data={data}
                    gridMin={0}
                    svg={{ fill: 'rgba(134, 65, 244, 0.8)' }}
                    yAccessor={({ item }) => item.value}
                    contentInset={{ top: 20, bottom: 20 }}
                >
                    <Grid />
                    
                </BarChart>
                <XAxis
                    style={{ marginHorizontal: -10, height: xAxisHeight }}
                    data={xAxisData}
                    formatLabel={(_, index) => xAxisData[index]}
                    contentInset={{ left: 10, right: 10 }}
                    svg={axesSvg}
                />
            </View>
        </View>
        <View style={{ flexDirection: 'row', marginHorizontal: 30, marginVertical:20 }}>
        <Text>Actual Data</Text>
        <View style={{ flex: 1, height: 20, backgroundColor: '#EE964B',  marginHorizontal: 20 }} />
        <Text style={{ marginLeft: 20 }}>Predicted Data</Text>
        <View style={{ flex: 1, height: 20, backgroundColor: '#233D4D',  marginHorizontal: 20 }} />
    </View>
    </>
    )
}


const predictorArrayGenerate = placeSlotsArray => {
    // const predictedData = predictedDataNTUC.map(ele => ele*2)
    
    const predictedData = predictedDataNTUC.slice(35).map(ele => ele * 2)
    let data = placeSlotsArray.slice(0, 35)
    data.push(...predictedData)
    // data = dataCompressor(data)

    data = data.map((ele, index) => {
        if (index < 35) {
            return ({
                value: ele,
                svg: { fill: '#EE964B', strokeWidth: 2 }
            })
        }
        else {
            return {
                value: ele,
                svg: { fill: '#233D4D', strokeWidth: 2 }
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


const getTimeIndex = () => {
    const time = moment(new Date()).format('HHmm')
    // console.log(time)
    let splitTime = time.split('')
    
    if ((Number(splitTime[2])*10) + Number(splitTime[3])>30) {
        if(splitTime[0]==='2',splitTime[1]==='3'){
            splitTime[0]= 0
            splitTime[1] = 0
        }
        splitTime[1] =Number(splitTime[1])+1
        splitTime[2]='0'
    }
    else {splitTime[2]='3'}
    splitTime[3]=0
    const roundedTime = splitTime.join('')
    // console.log(roundedTime)

    let timeIndex 
    utils.getTimeOptions().forEach((ele,index)=>{
        if(roundedTime===ele){
            timeIndex = index
            return 
        }
    })
    return timeIndex
    // console.log(timeIndex)

}

// WORK IN PROGRESS DO NOT USE
const dataCompressor = data => {
    let compressedData 
    for (let i = 0; i<12 ; i++){
        let dataSlice = data.slice(0,4)
        // console.log(dataSlice)
        compressedData.push(Math.max(...dataSlice))
    }
    return compressedData

}

const xAxisData = ["   00:00", "06:00", "12:00", "18:00", "23:59   "]

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