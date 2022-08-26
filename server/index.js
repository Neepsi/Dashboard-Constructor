const express = require('express')
const app = express()
const mysql = require('mysql')
const cors = require('cors')
const { json } = require('express')

app.use(cors())
app.use(express.json())

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: 'root',
    database: 'db_figures',
})

const generateData = (graph,id) =>
{
    let data = '';
    
    switch(graph)
    {
        case 0:
            {
                data={
                "nb_figure":"fig_"+id,
                 "type_figure":"go.Scatter",
                 "scatters":[
                     {	
                         "dataframe":"df_3",
                         "mode":"markers",
                         "x":"Date depôt",
                         "y":"Nombre de demandes",
                         "titre_scatter":"Dépôt",
                         "color":"rgba(46, 48, 146, 1)",
                         "dimensions":["Date depôt", "Nombre de demandes"]
                     }, 	         
                     {	
                         "dataframe":"df_4",
                         "mode":"lines+markers",
                         "x":"Date traitement",
                         "y":"Nombre de demandes",
                         "titre_scatter":"Activité de traitement",
                         "color":"rgba(41, 169, 227, 1)",
                         "dimensions":["Date traitement", "Nombre de demandes"]
                     }
                 ],
                 "titre_figure":"Nombre de demandes par date",
                 "libelle_x":"Date",
                 "libelle_y":"Nombre de demandes"
                }
                 break;
            }
            
        case 1:
            {
                 data=
                {"nb_figure":"fig_"+id,
                 "dataframe":"df_6",
                 "type_figure":"px.bar",
                 "x":"Thème/Sous Thème",
                 "y":"Nombre de demandes",
                 "color":"Etat demande",
                 "titre_figure":"Nombre de demandes par thème, sous thème et dépassement",
                 "libelle_y":"Nombre de demandes",
                 "libelle_x":"Thème et sous thème",
                 "libelle_color":"Dépassement",
                 "libelle_figure":"Nombre de demandes",
                 "dimensions":["Thème/Sous Thème", "Etat demande"]
                }
                 break;
            }
            
        case 2:
            {
                 data={
                "nb_figure":"fig_"+id,
                 "dataframe":"df_1",
                 "type_figure":"px.bar_h",
                 "y":"Statut",
                 "x":"Nombre de demandes",
                 "color":"",
                 "titre_figure":"Nombre de demandes par statut",
                 "libelle_x":"Nombre de demandes",
                 "libelle_y":"Statut",
                 "libelle_figure":"Nombre de demandes",
                 "dimensions":["Statut"]
                }
                 break;
            }
           
        case 3:
            {
                 data={
                 "nb_figure":"fig_"+id,
                 "dataframe":"df_2",
                 "type_figure":"px.pie",
                 "values":"Nombre de demandes",
                 "names":"Urgence",
                 "libelle_values":"Nombre de demandes",
                 "libelle_names":"Urgence",
                 "titre_figure":"Nombre de demandes par urgence",
                 "dimensions":["Urgence"]
                }
                 break;
            }
            
        case 4:
            {
                 data={
                "nb_figure":"fig_"+id,
			    "dataframe":"df_5",
			    "type_figure":"px.sunburst",
			    "values":"Nombre de demandes",
			    "path":["Thème", "Sous thème"],
			    "libelle_values":"Nombre de demandes",
			    "titre_figure":"Nombre de demandes par thème et sous thème",
			    "dimensions":["Sous thème","Thème"]
                 }
                 break;
            }
            
        case 5:
            {
                 data={
                "nb_figure":"fig_"+id,
			    "dataframe":"df_9",
			    "type_figure":"px.treemap",
			    "path":["Thème", "Sous thème", "Type demande"],
			    "values":"Nombre de demandes",
			    "color":"Type demande",
			    "dimensions":[ "Thème", "Sous thème", "Type demande"],
			    "titre_figure":"Nombre de demandes par thème et sous thème et type",
                 }
                 break;
            }                    
    }
    return data;
}


app.post('/addBloc', (req, res)=>{
    const data = req.body.data
    
   /*db.query(`DELETE FROM figures`);
    db.query(`INSERT INTO figures (graph_data) VALUES('${JSON.stringify(data)}')`,
        (err, result) => {
            if(err) console.log(err)
            else res.send('Data inserted')
        }
    )*/
    const fs = require('fs')
    let v = [],i=1
    data.map(x=>v.push(generateData(x['type'],i++)))    
    console.log(JSON.stringify(v,null," "))
    /*fs.writeFile('../src/data/dah_params.json',JSON.stringify(v,null," "),function(err){
        if(err) throw err;
        console.log('fichier cree')
    })*/          
})

app.post('/update_fig', (req, res)=>{
    const data = req.body.data
    let v =[],i=1;
   /*db.query(`DELETE FROM figures`);
    db.query(`INSERT INTO figures (graph_data) VALUES('${JSON.stringify(data)}')`,
        (err, result) => {
            if(err) console.log(err)
            else res.send('Data inserted')
        }
    )*/
    data.map(x=>v.push(generateData(x['type'],i++)))    
    console.log(JSON.stringify(v,null," "))
})

app.get('/figures',(req,res)=>{
    db.query("Select graph_data from figures",(err,result)=>{
        if(err)console.log(err)
        else res.send(JSON.stringify(result))
    })
})

app.listen(3001, () => {
    console.log('server is running on port 3001')
});