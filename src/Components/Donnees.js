import React, { useState } from 'react'
import data from '../data/input.json'

function Donnees({ selectedGraph }) {
  const [dataSelection, setDataSelection] = useState(tempData)
  
  return (
    <div className='d-flex'>
      <h4 className='me-4'>Données :</h4>
      <div className='row'>
        {selectedGraph > -1 && Object.keys(dataSelection['generalites'][selectedGraph]).map((param, index) => 
          console.log(param + ' : ' + dataSelection['generalites'][selectedGraph][param])
        )}
      </div>
    </div>
  )
}  

const tempData = {
    "generalites": [
      {name: 'scatter', x: ['date dépot', 'date traitement'], y: data.onglets[0].dimesions, title: '', color: '', fig_title: '', libelle_x: '', libelle_y: ''},
      {name: 'bar', x: data.onglets[0].dimesions, y: data.onglets[0].mesures, title: '', color: '', libelle_fig: '', libelle_x: '', libelle_y: '', libelle_color: '', pallete_color: []},
      {name: 'bar_horizontal', x: data.onglets[0].mesures, y: data.onglets[0].dimesions, title: '', color: '', libelle_fig: '', libelle_x: '', libelle_y: '', libelle_color: '', pallete_color: []},
      {name: 'pie', values: data.onglets[0].mesures, names: data.onglets[0].dimesions.filter(x => x != 'Date depôt' && x != 'Date traitement'), title: '', libelle_values: '', libelle_names: '', pallete_color: []},
      {name: 'sunburst', path: [data.onglets[0].dimesions.filter(x => x != 'Date depôt' && x != 'Date traitement'), data.onglets[0].dimesions.filter(x => x != 'Date depôt' && x != 'Date traitement')], values: data.onglets[0].mesures, title: '', libelle_values: '', titre_path: [], pallete_color: []},
      {name: 'treemap', path: [data.onglets[0].dimesions.filter(x => x != 'Date depôt' && x != 'Date traitement'), data.onglets[0].dimesions.filter(x => x != 'Date depôt' && x != 'Date traitement'), data.onglets[0].dimesions.filter(x => x != 'Date depôt' && x != 'Date traitement')], values: data.onglets[0].mesures, title: '', pallete_color: []},
      {name: 'table', columns: data.onglets[0].mesures, title: ''},
      {name: 'indicator', indicateur: data.onglets[0].indicateurs, title: ''}
    ],
    "delais": [
      {name: 'scatter', x: ['date dépot', 'date traitement'], y: data.onglets[1].dimesions, title: '', color: '', fig_title: '', libelle_x: '', libelle_y: ''},
      {name: 'bar', x: data.onglets[1].dimesions, y: data.onglets[1].mesures, title: '', color: '', libelle_fig: '', libelle_x: '', libelle_y: '', libelle_color: '', pallete_color: []},
      {name: 'bar_horizontal', x: data.onglets[1].mesures, y: data.onglets[1].dimesions, title: '', color: '', libelle_fig: '', libelle_x: '', libelle_y: '', libelle_color: '', pallete_color: []},
      {name: 'pie', values: data.onglets[1].mesures, names: data.onglets[1].dimesions.filter(x => x != 'Date depôt' && x != 'Date traitement'), title: '', libelle_values: '', libelle_names: '', pallete_color: []},
      {name: 'sunburst', path: [data.onglets[1].dimesions.filter(x => x != 'Date depôt' && x != 'Date traitement'), data.onglets[1].dimesions.filter(x => x != 'Date depôt' && x != 'Date traitement')], values: data.onglets[1].mesures, title: '', libelle_values: '', titre_path: [], pallete_color: []},
      {name: 'treemap', path: [data.onglets[1].dimesions.filter(x => x != 'Date depôt' && x != 'Date traitement'), data.onglets[1].dimesions.filter(x => x != 'Date depôt' && x != 'Date traitement'), data.onglets[1].dimesions.filter(x => x != 'Date depôt' && x != 'Date traitement')], values: data.onglets[1].mesures, title: '', pallete_color: []},
      {name: 'table', columns: data.onglets[1].mesures, title: ''},
      {name: 'indicator', indicateur: data.onglets[1].indicateurs, title: ''}
    ]
}

export default Donnees