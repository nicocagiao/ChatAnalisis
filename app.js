document.getElementById('inputfile').addEventListener('change', function() { 
    var fr = new FileReader(); 
    fr.onload = function(e){ 

        //Variables
        let data = e.target.result;        
        const regexFecha = /[0-9]{1,2}[\/][0-9]{1,2}[\/][0-9]{1,2}/g;
        let listFecha = [];
        let listDia = [];
        let listMes = [];
        let listYear = [];

        let separator = "-";
        let barra = "/";
        let puntos = ":";
        
        let nameRegex = /\W\s\w.*\W\W/;
        let tu_nombre = "] Ivan Marcasciano: "
        let listNombre1 = [];
        let listNombre2 = [];
        let interlocutor1  = {};
        let interlocutor2  = {};

        //crear colores

        // backgroundColorArray = ["rgba(20, 168, 204, 0.2)", "rgba(255, 72, 64, 0.2)"];
        // colorArray = ["rgb(20, 168, 204)", "rgb(255, 72, 64)"];
        
        // for (var i = 0; i < userStruct.length; i++) {
        //     colorArray.push(getRandomColor());
        // }
        //funcion para dividir cada linea

        function split_text(e,separador){
            var res = e.split(separador);
            return res;
        }

        let separador = /\n/g;
        let lineasChat = split_text(data, separador);
        
        //formato de linea de chat "[10/3/15 20:02:24] Ivan Marcasciano: Jajajajaja"

        //nombres
                
        function getNames(d){
            var uniqueNames = [];
            for(x=0; x <d.length; x++){
                    if(uniqueNames.length < 10){
                        uniqueNames.push(d[x].match(nameRegex));
                        

                    }
            }
            return uniqueNames;
        };

        let name1 = getNames(lineasChat);
        

        name1.forEach(function(x){
            interlocutor1[x] = (interlocutor1[x] || 0)+1;
        });

    
        
        //buscar fecha y hacer lista    

        //fecha completa

        function getFecha(d){
            for(x=0;x < d.length; x++){
                listFecha += separator + d[x].match(regexFecha);
            }
            return listFecha;
        }

        let fechas = getFecha(lineasChat).split(separator);
        
        //dias

        function getDia(d){
            for (let i = 0; i < d.length; i++) {
                listDia.push(fechas[i].split(barra)[0]);
            }
            return listDia;            
        }

        let dias = getDia(lineasChat);
        
         //meses

         function getMes(d){
            for (let i = 0; i < d.length; i++) {
                listMes.push(fechas[i].split(barra)[1]);
            }
            return listMes;            
        }

        let meses = getMes(lineasChat);

        //años

        function getYear(d){
            for (let i = 0; i < d.length; i++) {
                if(fechas[i].split(barra)[2] !== undefined && fechas[i].split(barra)[2] !== "20,19" && fechas[i].split(barra)[2] !== "20,20"){
                    listYear.push(fechas[i].split(barra)[2]);
                }
            }
            return listYear;            
        }

       getYear(lineasChat);
       

        //buscar hora y hacer lista

        var regexHora = /[0-9]{1,2}[:][0-9]{1,2}[:][0-9]{1,2}/g;
        let hora = fr.result.match(regexHora);

        let listHora = [];
        
        function getHora(e){
            
            for(x=0;x < e.length; x++){
                listHora += separator + e[x].match(regexHora);
            }
            return listHora;
        }
     
        let horas = getHora(lineasChat).split(separator);
        
        let totalHoras = {};

        for (const key in horas) {
                totalHoras += separator + horas[key].split(puntos)[0];       
            }
        console.log(totalHoras.split(separator));
        
        var horasResult = {};
        totalHoras.split(separator).forEach(function(x){
            horasResult[x] = (horasResult[x] || 0)+1; 
        });

        console.log(horasResult)
    
    //Cantidades por año    

        let totalYear  = {};
            
        listYear.forEach(function(x){
            totalYear[x] = (totalYear[x] || 0)+1;
        });

    //Chart mensajes por año

    let ctx = document.getElementById('myChart');
    let myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels:["2011","2012","2013","2014","2015","2016","2017","2018","2019","2020"],
        datasets: [{
            label: 'Mensajes por año',
            data: [totalYear[11],totalYear[12],totalYear[13],totalYear[14],totalYear[15], totalYear[16], totalYear[17],totalYear[18], totalYear[19], totalYear[20]],
                       
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)'
            ],
            borderWidth: 2
        }]
    },
    options: {
        legend: {
            display: true,
            labels: {
                fontColor: 'rgb(255, 99, 132)'
            }
        }
    }
});

var ctx2 = document.getElementById('myChart2');
    var myChart2 = new Chart(ctx2, {
    type: 'line',
    data: {
        labels: ["00","01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23"],
        datasets: [{
            label: 'Mensajes por hora',
            data: [horasResult["00"],horasResult["01"],horasResult["02"],horasResult["03"],horasResult["04"],horasResult["05"],horasResult["06"],horasResult["07"],horasResult["08"],horasResult["09"],horasResult[10],horasResult[11],horasResult[12],horasResult[13],horasResult[14],horasResult[15],horasResult[16],horasResult[17],horasResult[18],horasResult[19],horasResult[20],horasResult[21],horasResult[22],horasResult[23],],
            backgroundColor: [
                'rgba(153, 102, 255, 0.2)'
            ],
            borderColor: [
                'rgba(153, 102, 255, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                display: true,
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});


    //document.getElementById('output').textContent = data; 
} 
              
fr.readAsText(this.files[0]);
});

