import { useState, useRef } from 'react'
import input from '../data/input.json'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import Form from 'react-bootstrap/Form'
import EChartsReact from 'echarts-for-react'
import data from '../data/data_generalites.json'

function Donnees({ selectedGraph, changeOption }) {
  let inputField = [], colorField = [], group = [], secondGroup = []
  
  const [dataSelection, setDataSelection] = useState(tempData)
  const [newOption, setNewOption] = useState([])

  const [countInput, setCountInput] = useState({})
  const [countColor, setCountColor] = useState({})
  const [countPath, setCountPath] = useState({})
  const [countTreeMap1, setCountTreeMap1] = useState({})
  const [countTreeMap2, setCountTreeMap2] = useState({})

  const [libelleFigure, setLibelleFigure] = useState('')
  const [libelleX, setLibelleX] = useState('')
  const [libelleY, setLibelleY] = useState('')
  const [libelleCouleur, setLibelleCouleur] = useState('')
  const [paletteCouleur, setPaletteCouleur] = useState('')

  const getLevelOption = () => {
    return [
      {
        itemStyle: {
          borderColor: '#777',
          borderWidth: 0,
          gapWidth: 1
        },
        upperLabel: {
          show: false
        }
      },
      {
        itemStyle: {
          borderColor: '#555',
          borderWidth: 5,
          gapWidth: 1
        },
        emphasis: {
          itemStyle: {
            borderColor: '#ddd'
          }
        }
      },
      {
        colorSaturation: [0.35, 0.5],
        itemStyle: {
          borderWidth: 5,
          gapWidth: 1,
          borderColorSaturation: 0.6
        }
      }
    ];
  }

  const AddGraph = (param) => {
    const secondSelect = document.getElementsByTagName('select')[1].value

    const groupBy = (firstParam, secondParam) => { return ({ name: Object.values(data.filter(x => x[firstParam] === secondParam).map(x => x[secondSelect]))[0], 
      value: data.filter(x => x[firstParam] === secondParam).map(x => x[secondSelect]).length }) }

    for(const key in countInput) delete countInput[key]
    inputField = Array.from(data.map(x => x[param.target.value])) 

    for(const element of inputField) {
      if(countInput[element]) countInput[element] += 1
      else countInput[element] = 1
    }

    setCountInput(countInput)

    Object.keys(countInput).map((x, i) => group.push(groupBy(param.target.value, Object.keys(countInput)[i])) )

    const optionTest = [
      {
        title: { text: libelleFigure, left: 'center' },
        grid: { top: 40, right: 20, bottom: 24, left: 140, height: '70%'},
        xAxis: { name: libelleX, nameLocation: 'center', nameTextStyle: { padding: 30, fontSize: 18 }, axisTick: { show: false }, axisLine: { show: true, lineStyle: { color: "rgba(137, 137, 137, 1)" }}  },
        yAxis: { name: libelleY, data: Object.keys(countInput), nameLocation: 'center', nameTextStyle: { padding: 80, fontSize: 18 } },
        series: [ { symbolSize: 20, data: Object.values(countInput), type: 'scatter' } ],
        tooltip: { trigger: 'axis' }
      },
      {
        title: { text: libelleFigure, left: 'center' },
        grid: { top: 40, right: 8, bottom: 24, left: 70, height: '70%' },
        xAxis: { name: libelleX, type: 'category', data: Object.keys(countInput), nameLocation: 'center', nameTextStyle: { padding: 30, fontSize: 18 }, axisTick: { show: false } },
        yAxis: { name: libelleY, type: 'value', nameLocation: 'center', nameTextStyle: { padding: 30, fontSize: 18 }, axisLine: { show: true, lineStyle: { color: "rgba(137, 137, 137, 1)" }} },
        series: [ { data: Object.values(countInput), type: 'bar', smooth: true } ],
        tooltip: { trigger: 'axis' },
      },
      {
        title: { text: libelleFigure, left: 'center' },
        grid: { top: 70, right: 25, bottom: 24, left: (libelleY === '') ? 70 : 150, height: '70%' },
        yAxis: { name: libelleY, type: 'value', nameLocation: 'center', axisLabel: { rotate: 45 }, nameTextStyle: { padding: 90, fontSize: 18 }, type: 'category', data: Object.keys(countInput) }, 
        xAxis: { name: libelleX, nameLocation: 'center', nameTextStyle: { padding: 30, fontSize: 18 }, axisTick: { show: false }, axisLine: { show: true, lineStyle: { color: "rgba(137, 137, 137, 1)" }}, type: 'value' },
        series: [ { data: Object.values(countInput), type: 'bar', smooth: true } ],
        tooltip: { trigger: 'axis' }
      },
      {
        title: { text: libelleFigure, left: 'center' },
        tooltip: { trigger: 'item' },
        legend: { orient: 'vertical', left: 'left', top: 50 },
        series: [ {
            name: 'Nombre de demandes',
            type: 'pie',
            radius: '50%',
            data: Object.keys(countInput).map(x => ({ value: countInput[x], name: x }) ),
            emphasis: { itemStyle: { shadowBlur: 10, shadowOffsetX: 0, shadowColor: 'rgba(0, 0, 0, 0.5)' } }
          } ]
      },
      {
        title: { text: libelleFigure, left: 'center' },
        series: { type: 'sunburst', data: Object.entries(countInput).map((x, i) => ({ name: x[0], children: [{name: group[i]['name'], value: group[i]['value'] }] }) ), 
        radius: [ 0, '90%' ], label: { rotate: 'radial' } },
      },
      {
        title: { text: libelleFigure, left: 'center' },
        series: [ { type: 'treemap',  visibleMin: 300, label: {show: true, formatter: '{b}'}, upperLabel: {show: true, height: 30}, itemStyle: {borderColor: '#fff'}, levels: getLevelOption(), 
        data: [ ] 
        }]
      }
    ] 

    setNewOption(optionTest)
  }

  const AddColor = (param) => {
    const firstSelect = document.getElementsByTagName('select')[0].value
    const thirdSelect = document.getElementsByTagName('select')[2].value

    for(const key in countColor) delete countColor[key]
    colorField = Array.from(data.map(x => x[param.target.value])) 

    for(const element of colorField) {
      if(countColor[element]) countColor[element] += 1
      else countColor[element] = 1
    }

    setCountColor(countColor)

    const optionTest = [
      {
        grid: { top: 40, right: 15, bottom: 24, left: 120 },
        xAxis: { data: Object.keys(countColor), axisLabel: { show: true, padding: 0, width: 100 } }, 
        yAxis: { },
        series: [ { symbolSize: 20, data: Object.values(countColor), type: 'scatter' } ],
        tooltip: { trigger: 'axis' }
      },
      {
        title: { text: libelleFigure, left: 'center' },
        grid: { top: 80, right: 15, bottom: 24, left: 70, height: '70%' },
        xAxis: { name: libelleX, type: 'category', data: Object.keys(countColor), nameLocation: 'center', nameTextStyle: { padding: 30, fontSize: 18 }, axisTick: { show: false } }, 
        yAxis: { name: libelleY, type: 'value', nameLocation: 'center', nameTextStyle: { padding: 30, fontSize: 18 }, axisLine: { show: true, lineStyle: { color: "rgba(137, 137, 137, 1)" }} }, 
        series: [ { name: firstSelect, data: Object.values(countInput), type: 'bar', stack: 'one', smooth: true }, { name: thirdSelect, data: Object.values(countColor), type: 'bar', stack: 'one', smooth: true } ],
        legend: { data: [ firstSelect, param.target.value ], left: '10%' },
        tooltip: { trigger: 'axis' }
      },
      {
        grid: { top: 40, right: 25, bottom: 24, left: 100 },
        xAxis: { type: 'value' },
        yAxis: { type: 'category', data: Object.keys(countColor) }, 
        series: [ { data: Object.values(countColor), type: 'bar', smooth: true } ],
        tooltip: { trigger: 'axis' }
      },
      {
        tooltip: { trigger: 'item' },
        legend: { orient: 'vertical', left: 'left' },
        series: [ {
            name: 'Nombre de demandes',
            type: 'pie',
            radius: '50%',
            data: Object.keys(countColor).map(x => ({ value: countColor[x], name: x }) ),
            emphasis: { itemStyle: { shadowBlur: 10, shadowOffsetX: 0, shadowColor: 'rgba(0, 0, 0, 0.5)' } }
          } ]
      },
      {
        series: { type: 'sunburst', data: [], radius: [ 0, '90%' ], label: { rotate: 'radial' } }
      },
      {
        series: [ { type: 'treemap', data: [] } ]
      }
    ]

    setNewOption(optionTest)
  }

  const AddSunburst = (param) => {
    const firstSelect = document.getElementsByTagName('select')[0].value
    
    const groupBy = (firstParam, secondParam) => { return ({ name: Object.values(data.filter(x => x[firstParam] === secondParam).map(x => x[param.target.value]))[0], 
      value: data.filter(x => x[firstParam] === secondParam).map(x => x[param.target.value]).length }) }

    for(const key in countInput) delete countInput[key]
    inputField = Array.from(data.map(x => x[firstSelect])) 

    for(const element of inputField) {
      if(countInput[element]) countInput[element] += 1
      else countInput[element] = 1
    }

    setCountInput(countInput)

    Object.keys(countInput).map((x, i) => group.push(groupBy(firstSelect, Object.keys(countInput)[i])) )

    const optionTest = [
      {
        grid: { top: 40, right: 8, bottom: 24, left: 40},
        xAxis: { }, yAxis: { data: Object.keys(countInput) },
        series: [ { symbolSize: 20, data: Object.values(countInput), type: 'scatter' } ],
        tooltip: { trigger: 'axis' }
      },
      {
        title: { text: libelleFigure, left: 'center' },
        grid: { top: 80, right: 15, bottom: 24, left: 70, height: '70%' },
        xAxis: { name: libelleX, type: 'category', data: Object.keys(countInput), nameLocation: 'center', nameTextStyle: { padding: 30, fontSize: 18 }, axisTick: { show: false } },
        yAxis: { name: libelleY, type: 'value', nameLocation: 'center', nameTextStyle: { padding: 30, fontSize: 18 }, axisLine: { show: true, lineStyle: { color: "rgba(137, 137, 137, 1)" }} },
        series: [ { data: Object.values(countInput), type: 'bar', smooth: true } ],
        tooltip: { trigger: 'axis' }
      },
      {
        grid: { top: 40, right: 25, bottom: 24, left: 100 },
        yAxis: { type: 'category', data: Object.keys(countInput) }, xAxis: { type: 'value' },
        series: [ { data: Object.values(countInput), type: 'bar', smooth: true } ],
        tooltip: { trigger: 'axis' }
      },
      {
        tooltip: { trigger: 'item' },
        legend: { orient: 'vertical', left: 'left' },
        series: [ {
            name: 'Nombre de demandes',
            type: 'pie',
            radius: '50%',
            data: Object.keys(countInput).map(x => ({ value: countInput[x], name: x }) ),
            emphasis: { itemStyle: { shadowBlur: 10, shadowOffsetX: 0, shadowColor: 'rgba(0, 0, 0, 0.5)' } }
          } ]
      },
      {
        series: { type: 'sunburst', data: Object.entries(countInput).map((x, i) => ({ name: x[0], children: [{name: group[i]['name'], value: group[i]['value'] }] }) ), 
        radius: [ 0, '90%' ], label: { rotate: 'radial' } }
      },
      {
        series: [ { type: 'treemap',  visibleMin: 300, label: {show: true, formatter: '{b}'}, upperLabel: {show: true, height: 30}, itemStyle: {borderColor: '#fff'}, levels: getLevelOption(), 
        data: [  ] }]
      }
    ] 

    setNewOption(optionTest)
  }

  const AddTreeMap = (param) => {
    const firstSelect = document.getElementsByTagName('select')[0].value
    const secondSelect = document.getElementsByTagName('select')[1].value
    const thirdSelect = document.getElementsByTagName('select')[2].value

    const groupBy = (firstParam, secondParam, thirdParam) => {
      return ({ name: Object.values(data.filter(x => x[firstParam] === secondParam).map(x => x[thirdParam]))[0], 
        value: data.filter(x => x[firstParam] === secondParam).map(x => x[param.target.value]).length }) }

    for(const key in countInput) delete countInput[key]
    inputField = Array.from(data.map(x => x[firstSelect]))  

    for(const element of inputField) {
      if(countInput[element]) countInput[element] += 1
      else countInput[element] = 1
    }

    for(const key in countTreeMap1) delete countTreeMap1[key]
    colorField = Array.from(data.map(x => x[secondSelect])) 

    for(const element of colorField) {
      if(countTreeMap1[element]) countTreeMap1[element] += 1
      else countTreeMap1[element] = 1
    }

    setCountInput(countInput) 

    setCountTreeMap1(countTreeMap1)
    
    Object.keys(countInput).map((x, i) => group.push(groupBy(firstSelect, Object.keys(countInput)[i], secondSelect)) )    
    Object.keys(countTreeMap1).map((x, i) => secondGroup.push(groupBy(secondSelect, Object.keys(countTreeMap1)[i], param.target.value)) )

    const optionTest = [
      {
        grid: { top: 40, right: 15, bottom: 24, left: 120 },
        xAxis: { data: Object.keys(countColor), axisLabel: { show: true, padding: 0, width: 100 } }, 
        yAxis: { },
        series: [ { symbolSize: 20, data: Object.values(countColor), type: 'scatter' } ],
        tooltip: { trigger: 'axis' }
      },
      {
        title: { text: libelleFigure, left: 'center' },
        grid: { top: 80, right: 15, bottom: 24, left: 70, height: '70%' },
        xAxis: { name: libelleX, type: 'category', data: Object.keys(countColor), nameLocation: 'center', nameTextStyle: { padding: 30, fontSize: 18 }, axisTick: { show: false } }, 
        yAxis: { name: libelleY, type: 'value', nameLocation: 'center', nameTextStyle: { padding: 30, fontSize: 18 }, axisLine: { show: true, lineStyle: { color: "rgba(137, 137, 137, 1)" }} }, 
        series: [ { name: firstSelect, data: Object.values(countInput), type: 'bar', stack: 'one', smooth: true }, { name: thirdSelect, data: Object.values(countColor), type: 'bar', stack: 'one', smooth: true } ],
        legend: { data: [ firstSelect, param.target.value ], left: '10%' },
        tooltip: { trigger: 'axis' }
      },
      {
        grid: { top: 40, right: 25, bottom: 24, left: 100 },
        xAxis: { type: 'value' },
        yAxis: { type: 'category', data: Object.keys(countColor) }, 
        series: [ { data: Object.values(countColor), type: 'bar', smooth: true } ],
        tooltip: { trigger: 'axis' }
      },
      {
        tooltip: { trigger: 'item' },
        legend: { orient: 'vertical', left: 'left' },
        series: [ {
            name: 'Nombre de demandes',
            type: 'pie',
            radius: '50%',
            data: Object.keys(countColor).map(x => ({ value: countColor[x], name: x }) ),
            emphasis: { itemStyle: { shadowBlur: 10, shadowOffsetX: 0, shadowColor: 'rgba(0, 0, 0, 0.5)' } }
          } ]
      },
      {
        series: { type: 'sunburst', data: [ ], 
        radius: [ 0, '90%' ], label: { rotate: 'radial' } }
      },
      {
        title: { text: libelleFigure, left: 'center' },
        series: [ { type: 'treemap', visibleMin: 300, label: {show: true, formatter: '{b}'}, upperLabel: {show: true, height: 30}, itemStyle: {borderColor: '#fff'}, levels: getLevelOption(), 
        data: Object.entries(countInput).map((x, i) => ({ name: x[0], children: [{name: group[i]['name'], value: group[i]['value'], 
                children: Object.entries(countTreeMap1).map((x, i) => ({ name: secondGroup[i]['name'], value: secondGroup[i]['value'] }) )  }] } ) )
        }]
      }
    ]

    setNewOption(optionTest)
  }

  return (
    <div className='d-flex'>
      <h4 className='me-3'>Données</h4>
      <div className='container'>
        <div className='row justify-content-center'>
          <div className='col-sm-6'>
            {selectedGraph > -1 && Object.keys(dataSelection['generalites'][selectedGraph]).filter(x => x !== 'name').map((param, index) =>         
              (typeof dataSelection['generalites'][selectedGraph][param] === 'string') && 
                <FloatingLabel key={param+index} controlId='floatingInput' label={(param === 'x' || param === 'y') ? 'Axis '+param : param} className='mb-3'>
                  <Form.Control type='text' maxLength={100} placeholder={param} onChange={(param === 'Libelle x') ? e => { setLibelleX(e.target.value) }
                  : (param === 'Libelle y') ? e => { setLibelleY(e.target.value) } : (param === 'Libelle figure') ? e => { setLibelleFigure(e.target.value) } : (param === 'Libelle couleur') ? e => { setLibelleCouleur(e.target.value) } : null } />
                </FloatingLabel>)
            }
          </div>

          <div className='col-sm-6'>
            {selectedGraph > -1 && Object.keys(dataSelection['generalites'][selectedGraph]).filter(x => x !== 'name').map((param, index) =>
              (typeof dataSelection['generalites'][selectedGraph][param] === 'object') && (!Array.isArray(dataSelection['generalites'][selectedGraph][param][index]))
                ? <FloatingLabel key={param} controlId='floatingInput' label={(param === 'x' || param === 'y') ? 'Axis '+param : param} className='mb-3'>             
                    <Form.Select  id={param} onChange={param === 'x' || (param === 'Path 1' && selectedGraph !== 5 ) ? (e => AddGraph(e)) 
                    : param === 'Couleur' ? (e => AddColor(e)) 
                    : param === 'Path 2' && selectedGraph === 4 ? (e => AddSunburst(e)) 
                    : param === 'Path 3' ? (e => AddTreeMap(e))
                    : param === 'y' || param === 'Nom' ? (e => AddGraph(e))
                    : null } onClick={() => changeOption(newOption[selectedGraph])} className='w-100'>
                      {dataSelection['generalites'][selectedGraph][param].map(x => <option key={x} value={x}>{x}</option>)}
                    </Form.Select> 
                  </FloatingLabel> : null)
            }
          </div>
        </div>

      {selectedGraph !== -1 && newOption.map((x, index) => <div className='mt-2'>          
        {index === selectedGraph && 
          <div>
            <EChartsReact option={newOption[selectedGraph]} style={{ height: '500px' }} />
          </div>}
        </div>)} 
      </div>
    </div>
  )
}  

const tempData = {
  "generalites": [
    {name: 'scatter', x: ['Date depôt', 'Date traitement'], y: input.onglets[0].mesures, 'Mode': ['Lines', 'Markers', 'Lines + Markers'], 'Palette couleur': '', 'Libelle figure': '', 'Libelle x': '', 'Libelle y': ''},
    {name: 'bar', x: input.onglets[0].dimesions, y: input.onglets[0].mesures, 'Couleur': input.onglets[0].dimesions, 'Libelle x': '', 'Libelle y': '', 'Libelle couleur': '', 'Libelle figure': '', 'Palette couleur': []},
    {name: 'bar_horizontal', x: input.onglets[0].mesures, y: input.onglets[0].dimesions, 'Couleur': '', 'Libelle figure': '', 'Libelle x': '', 'Libelle y': '', 'Libelle couleur': '', 'Palette couleur': []},
    {name: 'pie', 'Valeur': input.onglets[0].mesures, 'Nom': input.onglets[0].dimesions.filter(x => x !== 'Date depôt' && x !== 'Date traitement'), 'Libelle figure': '', 'Libelle valeur': '', 'Libelle nom': '', 'Palette couleur': []},
    {name: 'sunburst', 'Path 1': Array.from(input.onglets[0].dimesions.filter(x => x !== 'Date depôt' && x !== 'Date traitement')), 'Path 2': Array.from(input.onglets[0].dimesions.filter(x => x !== 'Date depôt' && x !== 'Date traitement')), 'Valeur': input.onglets[0].mesures, 'Libelle figure': '', 'Libelle valeur': '', 'Titre path': '', 'Palette couleur': []},
    {name: 'treemap', 'Path 1': Array.from(input.onglets[0].dimesions.filter(x => x !== 'Date depôt' && x !== 'Date traitement')), 'Path 2': Array.from(input.onglets[0].dimesions.filter(x => x !== 'Date depôt' && x !== 'Date traitement')), 'Path 3': Array.from(input.onglets[0].dimesions.filter(x => x !== 'Date depôt' && x !== 'Date traitement')), 'Valeur': input.onglets[0].mesures, 'Libelle figure': '', 'Palette couleur': []},
    {name: 'table', 'Colonnes': input.onglets[0].dimesions, 'Libelle figure': ''},
    {name: 'indicator', 'Indicateur': input.onglets[0].indicateurs, 'Libelle figure': ''}
  ],
  "delais": [
    {name: 'scatter', x: ['date dépot', 'date traitement'], y: input.onglets[1].mesures, 'Palette couleur': '', 'Couleur': '', 'Libelle figure': '', 'Libelle x': '', 'Libelle y': ''},
    {name: 'bar', x: input.onglets[1].dimesions, y: input.onglets[1].mesures, 'Couleur': '', 'Libelle figure': '', 'Libelle x': '', 'Libelle y': '', 'Libelle couleur': '', 'Palette couleur': []},
    {name: 'bar_horizontal', x: input.onglets[1].mesures, y: input.onglets[1].dimesions, 'Couleur': '', 'Libelle figure': '', 'Libelle x': '', 'Libelle y': '', 'Libelle couleur': '', 'Palette couleur': []},
    {name: 'pie', 'Valeur': input.onglets[1].mesures, 'Nom': input.onglets[1].dimesions.filter(x => x !== 'Date depôt' && x !== 'Date traitement'), 'Libelle figure': '', 'Libelle valeur': '', 'Libelle nom': '', 'Palette coleur': []},
    {name: 'sunburst', 'Path 1': Array.from(input.onglets[1].dimesions.filter(x => x !== 'Date depôt' && x !== 'Date traitement')), 'Path 2': Array.from(input.onglets[1].dimesions.filter(x => x !== 'Date depôt' && x !== 'Date traitement')), 'Valeur': input.onglets[1].mesures, 'Libelle figure': '', 'Libelle valeur': '', 'Titre path': '', 'Palette couleur': []},
    {name: 'treemap', 'Path 1': Array.from(input.onglets[1].dimesions.filter(x => x !== 'Date depôt' && x !== 'Date traitement')), 'Path 2': Array.from(input.onglets[1].dimesions.filter(x => x !== 'Date depôt' && x !== 'Date traitement')), 'Path 3': Array.from(input.onglets[1].dimesions.filter(x => x !== 'Date depôt' && x !== 'Date traitement')), 'Valeur': input.onglets[1].mesures, 'Libelle figure': '', 'Palette couleur': []},
    {name: 'table', 'Colonnes': input.onglets[1].dimesions, 'Libelle figure': ''},
    {name: 'indicator', 'Indicateur': input.onglets[1].indicateurs, 'Libelle figure': ''}
  ]
}

export default Donnees