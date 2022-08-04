import React, { useState } from 'react'
import data from '../data/input.json'

function Donnees({ selectedGraph }) {
  const [dataSelection, setDataSelection] = useState(tempData)
  
  return (
    <div className='d-flex'>
      <h4 className='me-3'>Données</h4>
      <div className='row'>
          {selectedGraph > -1 && Object.keys(dataSelection['generalites'][selectedGraph]).filter(x => x !== 'name').map((param, index) => 
            <div key={param} className='col-sm-3'>         
              <label key={param} className='w-100'>{param} :</label>
              { (typeof dataSelection['generalites'][selectedGraph][param] === 'object') && (!Array.isArray(dataSelection['generalites'][selectedGraph][param][index]))
                ? <select className='w-100'>
                    {dataSelection['generalites'][selectedGraph][param].map(x => <option key={x} value={x}>{x}</option>)}
                  </select> : null
              } 

              { (typeof dataSelection['generalites'][selectedGraph][param] === 'object') && (Array.isArray(dataSelection['generalites'][selectedGraph][param][index]))
                ? dataSelection['generalites'][selectedGraph][param].map(x => 
                  <select className='w-100 mb-3'>
                    {x.map(x => <option value={x}>{x}</option>)}
                  </select>) : null
              } 

              { (typeof dataSelection['generalites'][selectedGraph][param] === 'string') && <input className='w-100' type='text' /> }
            </div>
          )}
      </div>
    </div>
  )
}  

const tempData = {
    "generalites": [
      {name: 'scatter', x: ['date dépot', 'date traitement'], y: data.onglets[0].dimesions, 'Titre': '', 'Couleur': '', 'Titre figure': '', 'Libelle x': '', 'Libelle y': ''},
      {name: 'bar', x: data.onglets[0].dimesions, y: data.onglets[0].mesures, 'Titre': '', 'Couleur': '', 'Libelle figure': '', 'Libelle x': '', 'Libelle y': '', 'Libelle couleur': '', 'Palette couleur': []},
      {name: 'bar_horizontal', x: data.onglets[0].mesures, y: data.onglets[0].dimesions, 'Titre': '', 'Couleur': '', 'Libelle figure': '', 'Libelle x': '', 'Libelle y': '', 'Libelle couleur': '', 'Palette couleur': []},
      {name: 'pie', 'Valeur': data.onglets[0].mesures, 'Nom': data.onglets[0].dimesions.filter(x => x !== 'Date depôt' && x !== 'Date traitement'), 'Titre': '', 'Libelle valeur': '', 'Libelle nom': '', 'Palette coleur': []},
      {name: 'sunburst', 'Path': [data.onglets[0].dimesions.filter(x => x !== 'Date depôt' && x !== 'Date traitement'), data.onglets[0].dimesions.filter(x => x !== 'Date depôt' && x !== 'Date traitement')], 'Valeur': data.onglets[0].mesures, 'Titre': '', 'Libelle valeur': '', 'Titre path': [], 'Palette couleur': []},
      {name: 'treemap', 'Path': [data.onglets[0].dimesions.filter(x => x !== 'Date depôt' && x !== 'Date traitement'), data.onglets[0].dimesions.filter(x => x !== 'Date depôt' && x !== 'Date traitement'), data.onglets[0].dimesions.filter(x => x !== 'Date depôt' && x !== 'Date traitement')], 'Valeur': data.onglets[0].mesures, 'Titre': '', 'Palette couleur': []},
      {name: 'table', 'Colonne': data.onglets[0].dimesions, 'Mesure': data.onglets[0].mesures, Titre: ''},
      {name: 'indicator', 'Indicateur': data.onglets[0].indicateurs, Titre: ''}
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

export default Donnees