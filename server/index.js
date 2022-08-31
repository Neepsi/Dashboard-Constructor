const express = require('express')
const app = express()
const mysql = require('mysql')
const cors = require('cors')
const { json } = require('express')
const { useState } = require('react')

app.use(cors())
app.use(express.json())

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: 'root',
    database: 'db_figures',
})


const scatter = (id,x,y,titre,libelle_x,libelle_y)=>
{
    let data = '';
    data={
        "nb_figure":"fig_"+id,
         "type_figure":"go.Scatter",
         "scatters":[
             {	
                 "dataframe":"df_3",
                 "mode":"markers",
                 "x":x,
                 "y":y,
                 "titre_scatter":"Dépôt",
                 "color":"rgba(46, 48, 146, 1)",
                 "dimensions":["Date depôt", "Nombre de demandes"]
             }, 	         
             {	
                 "dataframe":"df_4",
                 "mode":"lines+markers",
                 "x":x,
                 "y":y,
                 "titre_scatter":"Activité de traitement",
                 "color":"rgba(41, 169, 227, 1)",
                 "dimensions":["Date traitement", "Nombre de demandes"]
             }
         ],
         "titre_figure":titre,
         "libelle_x":libelle_x,
         "libelle_y":libelle_y
        }
        return data;
}
const bar = (id,x,y,couleur,libelle_figure,libelle_y,libelle_x,libelle_color)=>
{
    let data = '';
    data=
                {"nb_figure":"fig_"+id,
                 "dataframe":"df_6",
                 "type_figure":"px.bar",
                 "x":x,
                 "y":y,
                 "color":couleur,
                 "titre_figure":libelle_figure,
                 "libelle_y":libelle_y,
                 "libelle_x":libelle_x,
                 "libelle_color":libelle_color,
                 "libelle_figure":libelle_figure,
                 "dimensions":[x, couleur]
                }
                return data;
}
const barH = (id,x,y,titre,libelle_x,libelle_y)=>
{
    let data = '';
    data={
        "nb_figure":"fig_"+id,
         "dataframe":"df_1",
         "type_figure":"px.bar_h",
         "y":y,
         "x":x,
         "color":"",
         "titre_figure":titre,
         "libelle_x":libelle_x,
         "libelle_y":libelle_y,
         "libelle_figure":titre,
         "dimensions":[y]
        }
        return data;
}
const pie = (id,valeur,nom,libelleValeur,libelleNom,titre)=>
{
    let data = '';
    data={
        "nb_figure":"fig_"+id,
        "dataframe":"df_2",
        "type_figure":"px.pie",
        "values":valeur,
        "names":nom,
        "libelle_values":libelleValeur,
        "libelle_names":libelleNom,
        "titre_figure":titre,
        "dimensions":[nom]
       }
       return data;
}
const sunburst = (id,valeur,pathOne,pathTwo,titre,libelleValeur)=>
{
    let data = '';
    data={
        "nb_figure":"fig_"+id,
        "dataframe":"df_5",
        "type_figure":"px.sunburst",
        "values":valeur,
        "path":[pathOne, pathTwo],
        "libelle_values":libelleValeur,
        "titre_figure":titre,
        "dimensions":[pathTwo,pathOne]
         }
         return data;
}
const treemap = (id,pathOne,pathTwo,pathThree,valeur,titre)=>
{
    let data = '';
    data={
        "nb_figure":"fig_"+id,
        "dataframe":"df_9",
        "type_figure":"px.treemap",
        "path":[pathOne, pathTwo, pathThree],
        "values":valeur,
        "color":pathThree,
        "dimensions":[ pathOne, pathTwo, pathThree],
        "titre_figure":titre
         }
         return data;
}


const generateData = (graph,id) =>
{
    let data = '';
    
    switch(graph['type'])
    {
        case 0:
            {
               data= '';
                 break;
            }
            
        case 1:
            {
                data= bar(id,graph['option']['select'].x,graph['option']['select'].y,graph['option']['couleur'].color,graph['option']['title'].text,graph['option']['yAxis'].name,graph['option']['xAxis'].name,graph['option']['couleur'].libelleCouleur);
                 break;
            }
            
        case 2:
            {
                data= barH(id,graph['option']['select'].x,graph['option']['select'].y,graph['option']['title'].text,graph['option']['xAxis'].name,graph['option']['yAxis'].name);
                 break;
            }
           
        case 3:
            {
                data= pie(id,graph['option']['select'].valeur,graph['option']['select'].nom,graph['option']['title'].libelleValeur,graph['option']['title'].libelleNom,graph['option']['title'].text);
                 break;
            }
            
        case 4:
            {
                data= sunburst(id,graph['option']['select'].valeur,graph['option']['select'].pathOne,graph['option']['select'].pathTwo,graph['option']['title'].text,graph['option']['title'].libelleValeur);
                 break;
            }
            
        case 5:
            {
                data= treemap(id,graph['option']['select'].pathOne,graph['option']['select'].pathTwo,graph['option']['select'].pathThree,graph['option']['select'].valeur,graph['option']['title'].text);
                 break;
            }                    
    }
    return data;
}


/*app.post('/addBloc', (req, res)=>{
    const data = req.body.data
    const route = req.body.route
    const date = new Date()
    const fs = require('fs')

    
    let day = date.getDate();
    let month = date.getMonth()+1;
    let year = date.getFullYear();
    let currentDate = year+"-"+month+"-"+day;

    let fig_gen = "",fig_del=""
    let fig_genJson = "",fig_delJson=""    

    if(route=== "generalites")
    {
        let v = [],i=1    
        data.map(x=>v.push(generateData(x,i++)))
         fig_gen = data;
         fig_genJson = v;
         let gen_data = {figures_generalites : fig_genJson , figures_delais : fig_delJson}
        let gen_data_ = {figures_generalites : fig_gen , figures_delais : fig_del}
        db.query(`DELETE FROM figures`);
        db.query(`INSERT INTO figures (graph_data,dash_params,modification_date) VALUES('${JSON.stringify(gen_data_,null," ")}','${JSON.stringify(gen_data,null," ")}','${currentDate}')`,
        (err, result) => {
            if(err) console.log(err)
            else res.send('Data inserted')
        }        
    )
    console.log(gen_data_)
    /*fs.writeFile('../src/data/dash_params.json',JSON.stringify(gen_data,null, " "),function(err){
        if(err) throw err;
        console.log('fichier cree')
    })*/
   /* }
    else
    {
        let v=[],i=1
        data.map(x=>v.push(generateData(x,i++)))

        fig_del =  data;
        fig_delJson = v;

        let gen_data = {figures_generalites : fig_genJson , figures_delais : fig_delJson}
        let gen_data_ = {figures_generalites : fig_gen , figures_delais : fig_del}

        db.query(`DELETE FROM figures`);
        db.query(`INSERT INTO figures (graph_data,dash_params,modification_date) VALUES('${JSON.stringify(gen_data_,null," ")}','${JSON.stringify(gen_data,null," ")}','${currentDate}')`,
        (err, result) => {
            if(err) console.log(err)
            else res.send('Data inserted')
        }        
    )
 
    /*fs.writeFile('../src/data/dash_params.json',JSON.stringify(gen_data,null, " "),function(err){
        if(err) throw err;
        console.log('fichier cree')
    })*/


const createDashParams =()=>
{
    const fs = require('fs');
    if(fs.existsSync('../src/data/generalites.json') && !fs.existsSync('../src/data/delais.json'))
    {
        fs.readFile('../src/data/generalites.json','utf-8',function(err,donnees)
        {
            fs.writeFile('../src/data/dash_params.json',JSON.stringify({figures_generalites: JSON.parse(donnees).figures_generalites, figures_delais: " "},null, " "),function(err){
                if(err) throw err;
                console.log('fichier cree')
                        })      
        })
    }
    else if( fs.existsSync('../src/data/delais.json') && !fs.existsSync('../src/data/generalites.json'))
    {
        fs.readFile('../src/data/delais.json','utf-8',function(err,donnees)
        {
            fs.writeFile('../src/data/dash_params.json',JSON.stringify({figures_generalites: " ", figures_delais: JSON.parse(donnees).figures_delais},null, " "),function(err){
            if(err) throw err;
            console.log('fichier cree')
            })    
        })
    }
    else if(fs.existsSync('../src/data/generalites.json') && fs.existsSync('../src/data/delais.json'))
    {    
        fs.readFile('../src/data/delais.json','utf-8',function(err,donneesOne)
        {
            fs.readFile('../src/data/generalites.json','utf-8',function(err,donneesTwo)
            {
                fs.writeFile('../src/data/dash_params.json',JSON.stringify({figures_generalites: JSON.parse(donneesTwo).figures_generalites, figures_delais: JSON.parse(donneesOne).figures_delais},null, " "),function(err){
                if(err) throw err;
                console.log('fichier cree')
            })
        }) 
    })
        
    }
    else
    {
    fs.writeFile('../src/data/dash_params.json',JSON.stringify({figures_generalites: " ", figures_delais: " "},null, " "),function(err){
        if(err) throw err;
        console.log('fichier cree')
        })
    console.log("D")    
    }
}



   
app.post('/addBloc', (req, res)=>{
    const route = req.body.route
    const data = req.body.data
    const fs = require('fs')
    let v=[],i=1
    data.map(x=>v.push(generateData(x,i++)))
  
    if(route === "generalites")
    {
       db.query("Select delais from blocs",(err,result)=>{
                     
        if(err) console.log(err)            
        else
        {
            let gen_data = {figures_generalites : data}

            console.log(JSON.stringify(gen_data).toString().replaceAll("'", "\'"))
            if(result.length=== 0)
            {   
                fs.writeFile('../src/data/generalites.json',JSON.stringify({figures_generalites:v},null, " "),function(err){
        
                if(err) throw err;
                console.log('fichier cree')
                createDashParams()
                })
                fs.readFile('../src/data/dash_params.json','utf-8',function(err,donnees){
                db.query(`DELETE FROM blocs`);
                db.query(`INSERT INTO blocs (generalites,delais,dash_params) VALUES('${JSON.stringify(gen_data).replaceAll("'","''")}','${JSON.stringify({figures_delais: []})}','${donnees.replaceAll("'","''")}')`,
                (err, result) => {
                if(err) console.log(err)
                else res.send('Data inserted')
                            }        
                    )
                })
                
            }
            else
            {
                let t=[];
                t = JSON.stringify(result)
                let tt = JSON.parse(t)
                let ttt = JSON.parse(tt[0].delais)
                
                
                fs.writeFile('../src/data/generalites.json',JSON.stringify({figures_generalites:v},null, " "),function(err){
                    if(err) throw err;
                    console.log('fichier cree')
                    createDashParams()
                })
                fs.readFile('../src/data/dash_params.json','utf-8',function(err,donnees){
                db.query(`DELETE FROM blocs`);
                db.query(`INSERT INTO blocs (generalites,delais,dash_params) VALUES('${JSON.stringify(gen_data).replaceAll("'","''")}','${JSON.stringify(ttt).replaceAll("'","''")}','${donnees.replaceAll("'","''")}')`,
                (err, result) => {
                    if(err) console.log(err)
                    else res.send('Data inserted')
                }) 
            })
            }
        }                     
    })                       
    }

        else
            {       
            db.query("Select generalites from blocs",(err,result)=>{                 
                if(err) console.log(err)            
                else
                    {
                        let gen_data = {figures_delais : data}
                        if(result.length === 0)
                        {
                            fs.writeFile('../src/data/delais.json',JSON.stringify({figures_delais:v},null, " "),function(err){
                            if(err) throw err;
                            console.log('fichier cree')
                            createDashParams()
                            }) 
                            fs.readFile('../src/data/dash_params.json','utf-8',function(err,donnees){
                            db.query(`DELETE FROM blocs`);
                            db.query(`INSERT INTO blocs (generalites,delais,dash_params) VALUES('${JSON.stringify({figures_generalites:[]})}','${JSON.stringify(gen_data).replaceAll("'","''")}','${donnees.replaceAll("'","''")}')`,
                            (err, result) => {
                            if(err) console.log(err)
                            else res.send('Data inserted')
                            }) 
                        })
                        }
                        else
                        {
                            let t=[];
                            t = JSON.stringify(result)
                            let tt = JSON.parse(t)
                            let ttt = JSON.parse(tt[0].generalites)
                
                            fs.writeFile('../src/data/delais.json',JSON.stringify({figures_delais:v},null, " "),function(err){
                            if(err) throw err;
                            console.log('fichier cree')
                            createDashParams()
                            })
                            fs.readFile('../src/data/dash_params.json','utf-8',function(err,donnees){
                            db.query(`DELETE FROM blocs`);
                            db.query(`INSERT INTO blocs (generalites,delais,dash_params) VALUES('${JSON.stringify(ttt).replaceAll("'","''")}','${JSON.stringify(gen_data).replaceAll("'","''")}','${donnees.replaceAll("'","''")}')`,
                            (err, result) => {
                            if(err) console.log(err)
                            else res.send('Data inserted')
                            }) 
                            })
                        }
                    }                                    
            })           
        } 
})

  


app.post('/update_fig', (req, res)=>{
    const route = req.body.route
    const data = req.body.data
    const fs = require('fs')
    let v=[],i=1
    data.map(x=>v.push(generateData(x,i++)))
  
    if(route === "generalites")
    {
       db.query("Select delais from blocs",(err,result)=>{
                     
        if(err) console.log(err)            
        else
        {
            let gen_data = {figures_generalites : data}

            console.log(JSON.stringify(gen_data).toString().replaceAll("'", "\'"))
            if(result.length=== 0)
            {   
                fs.writeFile('../src/data/generalites.json',JSON.stringify({figures_generalites:v},null, " "),function(err){
        
                if(err) throw err;
                console.log('fichier cree')
                createDashParams()
                })
                fs.readFile('../src/data/dash_params.json','utf-8',function(err,donnees){
                db.query(`DELETE FROM blocs`);
                db.query(`INSERT INTO blocs (generalites,delais,dash_params) VALUES('${JSON.stringify(gen_data).replaceAll("'","''")}','${JSON.stringify({figures_delais: []})}','${donnees.replaceAll("'","''")}')`,
                (err, result) => {
                if(err) console.log(err)
                else res.send('Data inserted')
                            }        
                    )
                })
                
            }
            else
            {
                let t=[];
                t = JSON.stringify(result)
                let tt = JSON.parse(t)
                let ttt = JSON.parse(tt[0].delais)
                
                
                fs.writeFile('../src/data/generalites.json',JSON.stringify({figures_generalites:v},null, " "),function(err){
                    if(err) throw err;
                    console.log('fichier cree')
                    createDashParams()
                })
                fs.readFile('../src/data/dash_params.json','utf-8',function(err,donnees){
                db.query(`DELETE FROM blocs`);
                db.query(`INSERT INTO blocs (generalites,delais,dash_params) VALUES('${JSON.stringify(gen_data).replaceAll("'","''")}','${JSON.stringify(ttt).replaceAll("'","''")}','${donnees.replaceAll("'","''")}')`,
                (err, result) => {
                    if(err) console.log(err)
                    else res.send('Data inserted')
                }) 
            })
            }
        }                     
    })                       
    }

        else
            {       
            db.query("Select generalites from blocs",(err,result)=>{                 
                if(err) console.log(err)            
                else
                    {
                        let gen_data = {figures_delais : data}
                        if(result.length === 0)
                        {
                            fs.writeFile('../src/data/delais.json',JSON.stringify({figures_delais:v},null, " "),function(err){
                            if(err) throw err;
                            console.log('fichier cree')
                            createDashParams()
                            }) 
                            fs.readFile('../src/data/dash_params.json','utf-8',function(err,donnees){
                            db.query(`DELETE FROM blocs`);
                            db.query(`INSERT INTO blocs (generalites,delais,dash_params) VALUES('${JSON.stringify({figures_generalites:[]})}','${JSON.stringify(gen_data).replaceAll("'","''")}','${donnees.replaceAll("'","''")}')`,
                            (err, result) => {
                            if(err) console.log(err)
                            else res.send('Data inserted')
                            }) 
                        })
                        }
                        else
                        {
                            let t=[];
                            t = JSON.stringify(result)
                            let tt = JSON.parse(t)
                            let ttt = JSON.parse(tt[0].generalites)
                
                            fs.writeFile('../src/data/delais.json',JSON.stringify({figures_delais:v},null, " "),function(err){
                            if(err) throw err;
                            console.log('fichier cree')
                            createDashParams()
                            })
                            fs.readFile('../src/data/dash_params.json','utf-8',function(err,donnees){
                            db.query(`DELETE FROM blocs`);
                            db.query(`INSERT INTO blocs (generalites,delais,dash_params) VALUES('${JSON.stringify(ttt).replaceAll("'","''")}','${JSON.stringify(gen_data).replaceAll("'","''")}','${donnees.replaceAll("'","''")}')`,
                            (err, result) => {
                            if(err) console.log(err)
                            else res.send('Data inserted')
                            }) 
                            })
                        }
                    }                                    
            })           
        } 
})

app.get('/figuresGen',(req,res)=>{    
    db.query("Select generalites from blocs",(err,result)=>{
        if(err)console.log(err)
        else res.send(JSON.stringify(result))
    })
})
app.get('/figuresDel',(req,res)=>{    
    db.query("Select delais from blocs",(err,result)=>{
        if(err)console.log(err)
        else res.send(JSON.stringify(result))
    })
})

app.listen(3001, () => {
    console.log('server is running on port 3001')
});