/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */





var min=0;
var sec =10;
var chrono=null;
var tableaupartie;
var compteurtemps;
var nbtapis = 14;//nombre de fond d'écran disponible dans le fichier
var numtapis = 1;
var proposition =     Array(0,10, 10, 20, 30, 40, 60, 80,100,150,200,300,400 );
var propositionante = Array(0, 0,  0,  0,  0,  0, 10, 20, 20, 30, 40, 60, 80 );
var proposition2 = Array(0,5, 10, 15, 20, 30, 40,50,75,100,125,150,200 );
var compteur = proposition.length-1;
var fondaleatoire = true;
var tmprecave = 60;
var tmphorsrecave = 15;


function setFondAleatoire(chkbox)
{
    if(chkbox.checked == true)fondaleatoire = true;
    else fondaleatoire = false;
    
}

function proposer()
{
    
    fondEcranAleatoire();

    ecriretableau("tableaublind", proposition, propositionante);
     $("table").show(3000);
     $("img#chips").animate({top:5,right:5,opacity:0.8},3000,"swing");
//preparation page
    movelogo();

$("div#slider").slider({orientation:"vertical",value:50,
    slide : function (event)
    {
    var value=$("div#slider").slider("value")*8;
    //alert(value);
    $("div#chrono").css("fontSize",value+"px");
    }
});
}


function fondEcranAleatoire()
{
    if(fondaleatoire==true)
        {                    
            //fond décran
/*var tapisaleatoire = Math.round((Math.random()*(nbtapis-1)))+1;*/
var image = "url(images/Fond/tapis"+numtapis+".jpg) ";

if(numtapis == 1)
        {
        $("html").css("background",image);
        $("html").css("-webkit-background-size","initial");
        $("html").css("-moz-background-size","initial");
        }
        else{
            $("html").css("background",image+"no-repeat center center fixed");
            $("html").css("-webkit-background-size","cover");
            $("html").css("-moz-background-size","cover");
            }
numtapis++;
if(numtapis > nbtapis)numtapis=1;
        } 
    
}


function ecriretableau(idtab,tabdonnée,tabante)
{
   
    compteur = tabdonnée.length-1;
    var tableau = document.getElementById(idtab);
    var temps;

    for(var i=1;i<tabdonnée.length;i++)
        {


    var tr=document.createElement("tr");
    var tdtemps = document.createElement("td");
    var tdpetite = document.createElement("td");
    var tdgrosse = document.createElement("td");
    var tdante = document.createElement("td");

    var Itemps = document.createElement("input");
    Itemps.setAttribute("id", "temps"+i);
    if(i==1)temps=tmprecave;
    else temps=tmphorsrecave;
    Itemps.setAttribute("value", temps);

    var Iblind = document.createElement("input");
    Iblind.setAttribute("id", "petite"+i);
    Iblind.setAttribute("onkeyup", "calculergrosse("+i+")");
    Iblind.setAttribute("value", tabdonnée[i]);


    var Sgrosse = document.createElement("span");
    Sgrosse.setAttribute("id", "grosse"+i);
    Sgrosse.appendChild(document.createTextNode(tabdonnée[i]*2));

    var Iante = document.createElement("input");
     Iante.setAttribute("class", "fondrose");
    Iante.setAttribute("id", "ante"+i);
    Iante.setAttribute("value", tabante[i]);

    tdtemps.appendChild(Itemps);
    tdpetite.appendChild(Iblind);
    tdgrosse.appendChild(Sgrosse);
    tdante.appendChild(Iante);

    tr.appendChild(tdtemps);
    tr.appendChild(tdpetite);
    tr.appendChild(tdgrosse);
    tr.appendChild(tdante);

    tableau.appendChild(tr);
        }
       
}

function movelogo()
{
   $("div#logo").animate({left:100},1000,"swing").animate({left:-50},500,"swing").animate({left:50},500,"swing").animate({left:-20},500,"swing").animate({left:20},500,"swing").animate({left:0},500,"swing");

}

function grossit(obj)
{
 $(obj).animate({width:"+=30px"},100);
   //$(obj).animate({width:"+=30%"},0);
  
  
}
function retrecit(obj)
{
  $(obj).animate({width:"-=30px"},800);
   // $(obj).animate({width:"-=30%"},100);
}

function start()
{
    

    if(chrono==null) chrono = setInterval("timer()", 1000);
    effectblindes();
}

function timer()
{
    var pauseok=false;
    //alert("la");
    sec--;

    if(sec==-1)
        {
            sec=59;
            min--;
        }
     if(sec==0 && min==0)
         {
             if(compteurtemps==1)pauseok=true;
             
            sound();
            
            augmenteblind();
            
             //compteurtemps++;
            
             //min=tableaupartie[compteurtemps][0];
             //ecrireblind();
            
         }

ecrirechrono();
if(pauseok)pause();

}


function augmenteblind()
{
    
    compteurtemps++;
     if(compteurtemps>compteur)
                 {
                     
                     terminer();
                 }
                 else
                     {
    min=tableaupartie[compteurtemps][0];
    sec=0;
    fondEcranAleatoire();
    ecrirechrono();
    ecrireblind();
    }
}


function push(obj)
{
    $(obj).animate({width:"-=10"},10);
}
function up(obj)
{
    $(obj).animate({width:"+=10"},50);
    
}

function pause()
{
    
    clearInterval(chrono);
    chrono=null;
    effectblindes();
}

function effectblindes()
{
    if(chrono==null)
        {
            
        }
        else
            {
                
            }
}


function terminer()
{
    pause();
    var lblchrono = document.getElementById("chrono");
    lblchrono.style.fontSize = "300px";    
    lblchrono.innerHTML = "<blink>game over</blink>";
}

function ecrirechrono()
{
    var seconde=sec;
    if(sec<10)seconde=0+""+sec;
    var minute=min;
    if(min<10)minute=0+""+min;

    document.getElementById("chrono").innerHTML = minute+" : "+seconde;
    //if(min==0)document.getElementById("chrono").style.color = 'red';
    
    if(min==0)//derniere minute de blinde
        {
             
            
            document.getElementById("chrono").style.color="white";
            document.getElementById("chrono").style.textShadow = " 0 0 10px #fff, 0 0 20px #fff, 0 0 30px #fff, 0 0 40px #ff00de, 0 0 70px #ff00de, 0 0 80px #ff00de, 0 0 100px #ff00de, 0 0 150px #ff00de";
        }
    else
        {
           
            document.getElementById("chrono").style.textShadow = "0 0 10px white, 0 0 20px white, 0 0 30px white";
            document.getElementById("chrono").style.color = 'black';
        }
    

}
function ecrireblind()
{
    var blind = tableaupartie[compteurtemps][1];
    document.getElementById("field").innerHTML = blind+" / "+(blind*2);
    
    
     var ante = tableaupartie[compteurtemps][2];
   if(ante != 0 && !isNaN(ante))
        {        
         document.getElementById("ante").innerHTML = "Ante : "+ante;     
        }
        else
        {        
         document.getElementById("ante").innerHTML = "";     
        }
            
//   var div = document.getElementById("blindes");
//   var field = document.createElement("fieldset");
//   var legend = document.createElement("legend");
//   legend.appendChild(document.createTextNode("blind"));
//
//   field.appendChild(legend);
//   field.appendChild(document.createTextNode(blind+" / "+(blind*2)));
//   div.innerHTML = field.toString();
//   div.appendChild(field);

}


function sound1()
{
         var div = document.getElementById("son");
           var obj = document.createElement("object");
           obj.setAttribute("data","sons/fin.mp3");
           obj.setAttribute("type","audio/mpeg");
           obj.setAttribute("width","0px");

           var param = document.createElement("param");
           param.setAttribute("name","src");
           param.setAttribute("value","sons/fin.mp3");
           obj.appendChild(param);

           param = document.createElement("param");
           param.setAttribute("name","autoplay");
           param.setAttribute("value","true");
           obj.appendChild(param);

           param = document.createElement("param");
           param.setAttribute("name","autoStart");
           param.setAttribute("value","0");
           obj.appendChild(param);

           div.appendChild(obj);


}

function sound()
{
         var div = document.getElementById("son");
           div.innerHTML = '<EMBED SRC="sons/fin.mp3" HIDDEN="TRUE" AUTOSTART="TRUE" MASTERSOUND></EMBED>';


}



function ajouterblind()
{
    compteur++;    
   var tableau = document.getElementById("tableaublind");

    var tr=document.createElement("tr");
    var tdtemps = document.createElement("td");
    var tdpetite = document.createElement("td");
    var tdgrosse = document.createElement("td");
    var tdante = document.createElement("td");

    var Itemps = document.createElement("input");
    Itemps.setAttribute("id", "temps"+compteur);
    if(compteur!=1)Itemps.setAttribute("value", document.getElementById("temps"+(compteur-1)).value);

    var Iblind = document.createElement("input");
    Iblind.setAttribute("id", "petite"+compteur);
    Iblind.setAttribute("onkeyup", "calculergrosse("+compteur+")");
    if(compteur!=1)
        {
            var val = parseInt(document.getElementById("petite"+(compteur-1)).value);

            if(compteur==2)
                {
                    val = val*2;
                    Iblind.setAttribute("value", val);
                }
                else
                    {
                        val = Math.round(val*1.5);
                    Iblind.setAttribute("value", val);
                    }
        }

    var Sgrosse = document.createElement("span");
    Sgrosse.setAttribute("id", "grosse"+compteur);   
   
    
    
     var Iante = document.createElement("input");
    Iante.setAttribute("id", "ante"+compteur);
    Iante.setAttribute("class", "fondrose");
    Iante.setAttribute("value", 0);

    tdtemps.appendChild(Itemps);
    tdpetite.appendChild(Iblind);
    tdgrosse.appendChild(Sgrosse);
    tdante.appendChild(Iante );

    tr.appendChild(tdtemps);
    tr.appendChild(tdpetite);
    tr.appendChild(tdgrosse);
    tr.appendChild(tdante);

tableau.appendChild(tr);
calculergrosse(compteur);

}

function calculergrosse(indice)
{
    var petite = document.getElementById("petite"+indice).value;
    var grosse = petite*2;
    document.getElementById("grosse"+indice).innerHTML = grosse;

}

function retirerblind()
{

if(compteur!=0)
    {
    var tableau = document.getElementById("tableaublind");
    tableau.removeChild(tableau.lastChild);
    compteur--;
    }
}





function construirepartie()
{
  
    //verification des données du tableau
  var erreur = false;
   if(compteur<=0) erreur = true;
   
    for(var i=1;i<=compteur;i++)
        {
            var tmp = parseInt(document.getElementById("temps"+i).value);            
            var blind = parseInt(document.getElementById("petite"+i).value);
            var ante = parseInt(document.getElementById("ante"+i).value);
            if(isNaN(tmp) | isNaN(blind) | isNaN(ante))
                {                   
                 erreur = true;  
                }
        }
    
  if(erreur)
   {
       alert('Les données du tableau sont incorrectes');
   }   
    else
    {
//construction de la partie
    document.getElementById("creation").style.display = "none";
    document.getElementById("partie").style.display = "block";
    document.getElementById("button").style.display = "block";
    document.getElementById("son").style.display = "block";
    document.getElementById("slider").style.display = "block";
    //document.getElementById("chrono").style.display = "block";
    

    tableaupartie = new Array(compteur);    

    for( i=1;i<=compteur;i++)
        {
             tmp = parseInt(document.getElementById("temps"+i).value);
             blind = parseInt(document.getElementById("petite"+i).value);
             ante = parseInt(document.getElementById("ante"+i).value);
            tableaupartie[i]= Array(tmp, blind,ante);
        }
        compteurtemps=1;
        min=tableaupartie[compteurtemps][0];
        sec=0;


ecrirechrono();
ecrireblind();



$("img",document.getElementById("button")).animate({opacity:"+=.5"},2000);
    }
}


function montreLiens()
{
 
    $("div#liens").animate({left:-50},1000,"swing");
}