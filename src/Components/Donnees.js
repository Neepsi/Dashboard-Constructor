import { useState } from 'react'
import input from '../data/input.json'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import Form from 'react-bootstrap/Form'
import EChartsReact from 'echarts-for-react'
import data from '../data/data_generalites.json'

function Donnees({ selectedGraph, figTitle, setFigTitle, option }) {
  let countElement = []

  const [dataSelection, setDataSelection] = useState(tempData)
  const [count, setCount] = useState({})

  const handleTitle = (e) => setFigTitle(e.target.value) 

  const handleSelect = (e) => {  
    for(const key in count) delete count[key]
    console.log(count)

    countElement = Array.from(data.map(x => x[e.target.value])) 

    for(const element of countElement) {
      if(count[element]) count[element] += 1
      else count[element] = 1
    }
    
    setCount(count)

    console.log(count)

    console.log(optionTest)
  }

  const optionTest = [
    {
      "grid": {
        "top": 40,
        "right": 8,
        "bottom": 24,
        "left": 40
      },
      "xAxis": {
        data: Object.keys(count)
      },
      "yAxis": {},
      "series": [
        {
          "symbolSize": 20,
          "data": Object.values(count),
          "type": "scatter"
        }
      ],
      "tooltip": {
        "trigger": "axis"
      }
    },
    {
      "grid": {
        "top": 40,
        "right": 8,
        "bottom": 24,
        "left": 40
      },
      "xAxis": {
        "type": "category",
        "data": [
          "Mon",
          "Tue",
          "Wed",
          "Thu",
          "Fri",
          "Sat",
          "Sun"
        ]
      },
      "yAxis": {
        "type": "value"
      },
      "series": [
        {
          "data": [
            820,
            932,
            901,
            934,
            1290,
            1330,
            1320,
            1400,
            1500,
            1700,
            2000,
            800
          ],
          "type": "bar",
          "smooth": true
        }
      ],
      "tooltip": {
        "trigger": "axis"
      }
    },
    {
      "grid": {
        "top": 40,
        "right": 25,
        "bottom": 24,
        "left": 40
      },
      "yAxis": {
        "type": "category",
        "data": [
          "Mon",
          "Tue",
          "Wed",
          "Thu",
          "Fri",
          "Sat",
          "Sun"
        ]
      },
      "xAxis": {
        "type": "value"
      },
      "series": [
        {
          "data": [
            820,
            932,
            901,
            934,
            1290,
            1330,
            1320,
            1400,
            1500,
            1700,
            2000,
            800
          ],
          "type": "bar",
          "smooth": true
        }
      ],
      "tooltip": {
        "trigger": "axis"
      }
    },
    {
      "tooltip": {
        "trigger": "item"
      },
      "legend": {
        "orient": "vertical",
        "left": "left"
      },
      
      "series": [
        {
          "name": "Access From",
          "type": "pie",
          "radius": "50%",
          "data": [
            {
              "value": 1048,
              "name": "Search Engine"
            },
            {
              "value": 735,
              "name": "Direct"
            },
            {
              "value": 580,
              "name": "Email"
            },
            {
              "value": 484,
              "name": "Union Ads"
            },
            {
              "value": 300,
              "name": "Video Ads"
            }
          ],
          "emphasis": {
              "itemStyle": {
              "shadowBlur": 10,
              "shadowOffsetX": 0,
              "shadowColor": "rgba(0, 0, 0, 0.5)"
            }
          }
        }
      ]
    },
    {
      "series": {
        "type": "sunburst",
        "data": [
          {
            "name": "Grandpa",
            "children": [
              {
                "name": "Uncle Leo",
                "value": 15,
                "children": [
                  {
                    "name": "Cousin Jack",
                    "value": 2
                  },
                  {
                    "name": "Cousin Mary",
                    "value": 5,
                    "children": [
                      {
                        "name": "Jackson",
                        "value": 2
                      }
                    ]
                  },
                  {
                    "name": "Cousin Ben",
                    "value": 4
                  }
                ]
              },
              {
                "name": "Father",
                "value": 10,
                "children": [
                  {
                    "name": "Me",
                    "value": 5
                  },
                  {
                    "name": "Brother Peter",
                    "value": 1
                  }
                ]
              }
            ]
          },
          {
            "name": "Nancy",
            "children": [
              {
                "name": "Uncle Nike",
                "children": [
                  {
                    "name": "Cousin Betty",
                    "value": 1
                  },
                  {
                    "name": "Cousin Jenny",
                    "value": 2
                  }
                ]
              }
            ]
          }
        ],
        "radius": [
          0,
          "90%"
        ],
        "label": {
          "rotate": "radial"
        }
      }
    },
    {
      "series": [
        {
          "type": "treemap",
          "data": [
            {
              "name": "nodeA",
              "value": 10,
              "children": [
                {
                  "name": "nodeAa",
                  "value": 4
                },
                {
                  "name": "nodeAb",
                  "value": 6
                }
              ]
            },
            {
              "name": "nodeB",
              "value": 20,
              "children": [
                {
                  "name": "nodeBa",
                  "value": 20,
                  "children": [
                    {
                      "name": "nodeBa1",
                      "value": 20
                    }
  ]}]}]}]}]

  return (
    <div className='d-flex'>
      <h4 className='me-3'>Données</h4>
      <div className='row'>
        {selectedGraph > -1 && Object.keys(dataSelection['generalites'][selectedGraph]).filter(x => x !== 'name').map((param, index) => 
          <div key={param} className='col-sm-3'>         
            { (typeof dataSelection['generalites'][selectedGraph][param] === 'object') && (!Array.isArray(dataSelection['generalites'][selectedGraph][param][index]))
              ? <FloatingLabel key={param} controlId='floatingInput' label={(param === 'x' || param === 'y') ? 'Axis '+param : param} className='mb-3'>
                  <Form.Select onChange={(e) => handleSelect(e)} className='w-100'>
                    {dataSelection['generalites'][selectedGraph][param].map(x => <option key={x} value={x}>{x}</option>)}
                  </Form.Select>
                </FloatingLabel> : null
            } 

            { (typeof dataSelection['generalites'][selectedGraph][param] === 'object') && (Array.isArray(dataSelection['generalites'][selectedGraph][param][index]))
              ? dataSelection['generalites'][selectedGraph][param].map((x, index) => 
                  <FloatingLabel key={param+index} controlId='floatingInput' label={(param === 'x' || param === 'y') ? 'Axis '+param : param} className='mb-3'>
                    <Form.Select className='w-100 mb-3'>
                      {x.map(x => <option value={x}>{x}</option>)}
                    </Form.Select>
                  </FloatingLabel>) : null
            } 

            { (typeof dataSelection['generalites'][selectedGraph][param] === 'string') && 
              <FloatingLabel key={param+index} controlId='floatingInput' label={(param === 'x' || param === 'y') ? 'Axis '+param : param} className='mb-3'>
                <Form.Control type='text' maxLength={100} placeholder={param} onChange={(e) => (param === 'Titre') ? handleTitle(e) : null} /> 
              </FloatingLabel>
            }      
          </div>
        )}

        {selectedGraph !== -1 && option.map((x, index) => <div className='mt-2'>          
          {index === selectedGraph && 
            <div>
              <h4 className='text-center mt-3'>{figTitle}</h4>
              <EChartsReact option={optionTest[0]} style={{height: '500px'} } />
            </div>}
        </div>)}
      </div>
    </div>
  )
}  

const tempData = {
  "generalites": [
    {name: 'scatter', x: ['date dépot', 'date traitement'], y: input.onglets[0].dimesions, 'Mode': ['Lines', 'Markers', 'Lines + Markers'], 'Titre': '', 'Couleur': '', 'Titre figure': '', 'Libelle x': '', 'Libelle y': ''},
    {name: 'bar', x: input.onglets[0].dimesions, y: input.onglets[0].mesures, 'Titre': '', 'Couleur': '', 'Libelle figure': '', 'Libelle x': '', 'Libelle y': '', 'Libelle couleur': '', 'Palette couleur': []},
    {name: 'bar_horizontal', x: input.onglets[0].mesures, y: input.onglets[0].dimesions, 'Titre': '', 'Couleur': '', 'Libelle figure': '', 'Libelle x': '', 'Libelle y': '', 'Libelle couleur': '', 'Palette couleur': []},
    {name: 'pie', 'Valeur': input.onglets[0].mesures, 'Nom': input.onglets[0].dimesions.filter(x => x !== 'Date depôt' && x !== 'Date traitement'), 'Titre': '', 'Libelle valeur': '', 'Libelle nom': '', 'Palette coleur': []},
    {name: 'sunburst', 'Path': [input.onglets[0].dimesions.filter(x => x !== 'Date depôt' && x !== 'Date traitement'), input.onglets[0].dimesions.filter(x => x !== 'Date depôt' && x !== 'Date traitement')], 'Valeur': input.onglets[0].mesures, 'Titre': '', 'Libelle valeur': '', 'Titre path': [], 'Palette couleur': []},
    {name: 'treemap', 'Path': [input.onglets[0].dimesions.filter(x => x !== 'Date depôt' && x !== 'Date traitement'), input.onglets[0].dimesions.filter(x => x !== 'Date depôt' && x !== 'Date traitement'), input.onglets[0].dimesions.filter(x => x !== 'Date depôt' && x !== 'Date traitement')], 'Valeur': input.onglets[0].mesures, 'Titre': '', 'Palette couleur': []},
    {name: 'table', 'Colonne': input.onglets[0].dimesions, 'Mesure': input.onglets[0].mesures, Titre: ''},
    {name: 'indicator', 'Indicateur': input.onglets[0].indicateurs, 'Titre': ''}
  ],
  "delais": [
    {name: 'scatter', x: ['date dépot', 'date traitement'], y: input.onglets[1].dimesions, 'Titre': '', 'Couleur': '', 'Titre figure': '', 'Libelle x': '', 'Libelle y': ''},
    {name: 'bar', x: input.onglets[1].dimesions, y: input.onglets[1].mesures, 'Titre': '', 'Couleur': '', 'Libelle figure': '', 'Libelle x': '', 'Libelle y': '', 'Libelle couleur': '', 'Palette couleur': []},
    {name: 'bar_horizontal', x: input.onglets[1].mesures, y: input.onglets[1].dimesions, 'Titre': '', 'Couleur': '', 'Libelle figure': '', 'Libelle x': '', 'Libelle y': '', 'Libelle couleur': '', 'Palette coleur': []},
    {name: 'pie', 'Valeur': input.onglets[1].mesures, 'Nom': input.onglets[1].dimesions.filter(x => x !== 'Date depôt' && x !== 'Date traitement'), 'Titre': '', 'Libelle valeur': '', 'Libelle nom': '', 'Palette coleur': []},
    {name: 'sunburst', 'Path': [input.onglets[1].dimesions.filter(x => x !== 'Date depôt' && x !== 'Date traitement'), input.onglets[1].dimesions.filter(x => x !== 'Date depôt' && x !== 'Date traitement')], 'Valeur': input.onglets[1].mesures, 'Titre': '', 'Libelle valeur': '', 'Titre path': [], 'Palette couleur': []},
    {name: 'treemap', 'Path': [input.onglets[1].dimesions.filter(x => x !== 'Date depôt' && x !== 'Date traitement'), input.onglets[1].dimesions.filter(x => x !== 'Date depôt' && x !== 'Date traitement'), input.onglets[1].dimesions.filter(x => x !== 'Date depôt' && x !== 'Date traitement')], 'Valeur': input.onglets[1].mesures, 'Titre': '', 'Palette couleur': []},
    {name: 'table', 'Colonne': input.onglets[1].dimesions, 'Mesure': input.onglets[0].mesures, 'Titre': ''},
    {name: 'indicator', 'Indicateur': input.onglets[1].indicateurs, 'Titre': ''}
  ]
}

export default Donnees