import React, { useState } from 'react'
import data from '../data/input.json'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import EChartsReact from 'echarts-for-react'

function Donnees({ selectedGraph }) {
  const [dataSelection, setDataSelection] = useState(tempData)

  return (
    <div className='d-flex'>
      <h4 className='me-3'>Données</h4>
      <div className='row'>
        {selectedGraph > -1 && Object.keys(dataSelection['generalites'][selectedGraph]).filter(x => x !== 'name').map((param, index) => 
          <div key={param} className='col-sm-3'>         
            <FloatingLabel key={param} controlId='floatingInput' label={(param === 'x' || param === 'y') ? 'Axis '+param : param} className='mb-3'>
            { (typeof dataSelection['generalites'][selectedGraph][param] === 'object') && (!Array.isArray(dataSelection['generalites'][selectedGraph][param][index]))
              ? <Form.Select className='w-100'>
                  {dataSelection['generalites'][selectedGraph][param].map(x => <option key={x} value={x}>{x}</option>)}
                </Form.Select> : null
            } 

            { (typeof dataSelection['generalites'][selectedGraph][param] === 'object') && (Array.isArray(dataSelection['generalites'][selectedGraph][param][index]))
              ? dataSelection['generalites'][selectedGraph][param].map((x, index) => 
                  <FloatingLabel key={param+index} controlId='floatingInput' label={(param === 'x' || param === 'y') ? 'Axis '+param : param} className='mb-3'>
                    <Form.Select className='w-100 mb-3'>
                      {x.map(x => <option value={x}>{x}</option>)}
                    </Form.Select>
                  </FloatingLabel>) : null
            } 

            { (typeof dataSelection['generalites'][selectedGraph][param] === 'string') && <Form.Control type='text' placeholder={param} /> }
            </FloatingLabel>
          </div>
        )}
        <div className='mt-3'>
          {options[selectedGraph] && <EChartsReact option={options[selectedGraph]} /> }
          {console.log(options)}
        </div> 
      </div>
    </div>
  )
}  

const tempData = {
  "generalites": [
    {name: 'scatter', x: ['date dépot', 'date traitement'], y: data.onglets[0].dimesions, 'Mode': ['Lines', 'Markers', 'Lines + Markers'], 'Titre': '', 'Couleur': '', 'Titre figure': '', 'Libelle x': '', 'Libelle y': ''},
    {name: 'bar', x: data.onglets[0].dimesions, y: data.onglets[0].mesures, 'Titre': '', 'Couleur': '', 'Libelle figure': '', 'Libelle x': '', 'Libelle y': '', 'Libelle couleur': '', 'Palette couleur': []},
    {name: 'bar_horizontal', x: data.onglets[0].mesures, y: data.onglets[0].dimesions, 'Titre': '', 'Couleur': '', 'Libelle figure': '', 'Libelle x': '', 'Libelle y': '', 'Libelle couleur': '', 'Palette couleur': []},
    {name: 'pie', 'Valeur': data.onglets[0].mesures, 'Nom': data.onglets[0].dimesions.filter(x => x !== 'Date depôt' && x !== 'Date traitement'), 'Titre': '', 'Libelle valeur': '', 'Libelle nom': '', 'Palette coleur': []},
    {name: 'sunburst', 'Path': [data.onglets[0].dimesions.filter(x => x !== 'Date depôt' && x !== 'Date traitement'), data.onglets[0].dimesions.filter(x => x !== 'Date depôt' && x !== 'Date traitement')], 'Valeur': data.onglets[0].mesures, 'Titre': '', 'Libelle valeur': '', 'Titre path': [], 'Palette couleur': []},
    {name: 'treemap', 'Path': [data.onglets[0].dimesions.filter(x => x !== 'Date depôt' && x !== 'Date traitement'), data.onglets[0].dimesions.filter(x => x !== 'Date depôt' && x !== 'Date traitement'), data.onglets[0].dimesions.filter(x => x !== 'Date depôt' && x !== 'Date traitement')], 'Valeur': data.onglets[0].mesures, 'Titre': '', 'Palette couleur': []},
    {name: 'table', 'Colonne': data.onglets[0].dimesions, 'Mesure': data.onglets[0].mesures, Titre: ''},
    {name: 'indicator', 'Indicateur': data.onglets[0].indicateurs, 'Titre': ''}
  ],
  "delais": [
    {name: 'scatter', x: ['date dépot', 'date traitement'], y: data.onglets[1].dimesions, 'Titre': '', 'Couleur': '', 'Titre figure': '', 'Libelle x': '', 'Libelle y': ''},
    {name: 'bar', x: data.onglets[1].dimesions, y: data.onglets[1].mesures, 'Titre': '', 'Couleur': '', 'Libelle figure': '', 'Libelle x': '', 'Libelle y': '', 'Libelle couleur': '', 'Palette couleur': []},
    {name: 'bar_horizontal', x: data.onglets[1].mesures, y: data.onglets[1].dimesions, 'Titre': '', 'Couleur': '', 'Libelle figure': '', 'Libelle x': '', 'Libelle y': '', 'Libelle couleur': '', 'Palette coleur': []},
    {name: 'pie', 'Valeur': data.onglets[1].mesures, 'Nom': data.onglets[1].dimesions.filter(x => x !== 'Date depôt' && x !== 'Date traitement'), 'Titre': '', 'Libelle valeur': '', 'Libelle nom': '', 'Palette coleur': []},
    {name: 'sunburst', 'Path': [data.onglets[1].dimesions.filter(x => x !== 'Date depôt' && x !== 'Date traitement'), data.onglets[1].dimesions.filter(x => x !== 'Date depôt' && x !== 'Date traitement')], 'Valeur': data.onglets[1].mesures, 'Titre': '', 'Libelle valeur': '', 'Titre path': [], 'Palette couleur': []},
    {name: 'treemap', 'Path': [data.onglets[1].dimesions.filter(x => x !== 'Date depôt' && x !== 'Date traitement'), data.onglets[1].dimesions.filter(x => x !== 'Date depôt' && x !== 'Date traitement'), data.onglets[1].dimesions.filter(x => x !== 'Date depôt' && x !== 'Date traitement')], 'Valeur': data.onglets[1].mesures, 'Titre': '', 'Palette couleur': []},
    {name: 'table', 'Colonne': data.onglets[1].dimesions, 'Mesure': data.onglets[0].mesures, 'Titre': ''},
    {name: 'indicator', 'Indicateur': data.onglets[1].indicateurs, 'Titre': ''}
  ]
}

const options = [
  {
    grid: { top: 40, right: 8, bottom: 24, left: 40 },
    xAxis: {},
    yAxis: {},
    series: [
      {
        symbolSize: 20,
        data: [
          [10.0, 8.04], [8.07, 6.95], [13.0, 7.58], [9.05, 8.81], [11.0, 8.33], [14.0, 7.66], [13.4, 6.81], [10.0, 6.33], [14.0, 8.96], [12.5, 6.82], [9.15, 7.2], [11.5, 7.2], [3.03, 4.23], [12.2, 7.83], [2.02, 4.47], [1.05, 3.33], [4.05, 4.96], [6.03, 7.24], [12.0, 6.26], [12.0, 8.84], [7.08, 5.82], [5.02, 5.68]
        ],
        type: 'scatter'
      }
    ],
    title: {
      text: 'Scatter',
      left: 'center'
    },
    tooltip: {
      trigger: 'axis',
    },
  },
  {
    grid: { top: 40, right: 8, bottom: 24, left: 40 },
    xAxis: {
      type: 'category',
      data:  ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: [820, 932, 901, 934, 1290, 1330, 1320, 1400, 1500, 1700, 2000, 800],
        type: 'bar',
        smooth: true,
      },
    ],
    title: {
      text: 'Bar',
      left: 'center'
    },
    tooltip: {
      trigger: 'axis',
    },
  },
  {
    grid: { top: 40, right: 25, bottom: 24, left: 40 },
    yAxis: {
      type: 'category',
      data:  ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    xAxis: {
      type: 'value',
    },
    series: [
      {
        data: [820, 932, 901, 934, 1290, 1330, 1320, 1400, 1500, 1700, 2000, 800],
        type: 'bar',
        smooth: true,
      },
    ],
    title: {
      text: 'Horizontal bar',
      left: 'center'
    },
    tooltip: {
      trigger: 'axis',
    },
  },
  {
    title: {
      text: 'Referer of a Website',
      left: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      left: 'left'
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: '50%',
        data: [
          { value: 1048, name: 'Search Engine' },
          { value: 735, name: 'Direct' },
          { value: 580, name: 'Email' },
          { value: 484, name: 'Union Ads' },
          { value: 300, name: 'Video Ads' }
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  },   
] 

export default Donnees