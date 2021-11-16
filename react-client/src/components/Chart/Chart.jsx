import React from 'react'
import { ResponsivePie } from '@nivo/pie'
import styled from 'styled-components'


const ChartStyle = styled.div`
  width: 600px;
  height:500px;
`;


export default function Chart({data , label, interactive, enableArcLinkLabels}) {
  
  const MyResponsivePie = ({ data} ) => (
   
    <ResponsivePie
   
        data={data}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        innerRadius={0.75}
        padAngle={0.7}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        isInteractive={interactive}
        colors={{ scheme: 'paired' }}
        borderWidth={1}
        borderColor={{ from: 'color', modifiers: [ [ 'darker', 0.2 ] ] }}
        arcLinkLabelsSkipAngle={10}
        enableArcLabels={label}
        enableArcLinkLabels={enableArcLinkLabels}
        arcLinkLabelsTextColor="#333333"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: 'color' }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{ from: 'color', modifiers: [ [ 'darker', 2 ] ] }}
        legends={[
            {
                anchor: 'bottom',
                direction: 'row',
                justify: false,
                translateX: 0,
                translateY: 56,
                itemsSpacing: 0,
                itemWidth: 100,
                itemHeight: 18,
                itemTextColor: '#6b6565',
                itemDirection: 'left-to-right',
                itemOpacity: 1,
                symbolSize: 18,
                symbolShape: 'circle',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemTextColor: '#000'
                        }
                    }
                ]
            }
        ]}
    />
)

  return (
    <ChartStyle >
      {MyResponsivePie({data})}
    </ChartStyle>
      
    
  )
}
