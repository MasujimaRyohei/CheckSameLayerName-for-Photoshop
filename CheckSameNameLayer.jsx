/********************************************************/
/*                                                      */
/* Ref: http://yataya2000.com/article/isuniquelayer/    */
/* Author : MasujimaRyohei                              */
/*                                                      */
/********************************************************/

app.bringToFront();
if (app.documents.length ==0){
  // Don't work when opened document.
}else{
  // Reference of working document.
  var parent = activeDocument;

  // Get all layer names.
  var allLayerName = [];
  getAllLayerName(parent);

  // Find double layer name.
  var sameLayerName;
  sameLayerName = findDuplication();

  // Export result
  if(sameLayerName.length > 0){
    newLine = String.fromCharCode(13);
    var message = "";
    for (var i = 0 ; i < sameLayerName.length ; i++){
      message += "・" + sameLayerName[i]+newLine;
    }

    alert("Exist " + sameLayerName.length + " same name layer(s). The following name exists this PSD." + newLine + newLine + message);

  }else{
    alert("Do not exist same layer name.");
  }
}

function getAllLayerName(parent){
  var ChildLayers= parent.layers;
  for (var i = 0; i < ChildLayers.length; i++){
    if (ChildLayers[i].typename == "LayerSet"){
      // If layerset do recursion.
      allLayerName.push(ChildLayers[i].name);
      getAllLayerName(ChildLayers[i]);

    }else if(ChildLayers[i].typename == "ArtLayer"){
      // Get layer name.
      allLayerName.push(ChildLayers[i].name);
    }
  }
}

function findDuplication(){
  var s = [];
  allLayerName.sort();
  for(var i = 0 ; i < allLayerName.length ; i++){
    if(allLayerName[i] == allLayerName[i+1]){
      s.push(allLayerName[i]);
      while(allLayerName[i] == allLayerName[i+1]){
        i++;
      }
    }
  }
  return s;
}

/********************************************************/
/*                                                      */
/*                     END OF FILE                      */
/*                                                      */
/********************************************************/