function createScene(){

    var windows = [
        {ID:"chrome",ICON:["fab","chrome"],TOP:1,LEFT:1,Z:1,WIDTH:900},
        {ID:"pdf",ICON:["fas","file-pdf"],TOP:17,LEFT:5,Z:2,WIDTH:500},
        {ID:"excel",ICON:["fas","file-excel"],TOP:16,LEFT:20,Z:2,WIDTH:600},
        {ID:"word",ICON:["fas","file-word"],TOP:20,LEFT:50,Z:1,WIDTH:450},
        {ID:"slack",ICON:["fab","slack"],TOP:5,LEFT:40,Z:3,WIDTH:700},
    ];

    var originTop;
    var originLeft;
    var originZ;
    
    for(var i = 0; i < windows.length; i++){
        
        var window;
        window = d3.select("section")
                   .append("div")
                   .attr("id",windows[i].ID)
                   .attr("class","window")                   
                   .style("top", windows[i].TOP + "em")
                   .style("left", windows[i].LEFT + "em")
                   .style("z-index",windows[i].Z)
                   .style("width", windows[i].WIDTH + "px")
                   .style("height", windows[i].WIDTH * (9/16) + "px")
                   .attr("draggable", true)
                   .attr("ondragstart","drag(event");             
        var title = window.append("div").attr("class","title");
        window.append("div").attr("class","status");
        window.append("div").attr("class","content");

        var left = title.append("div")
                        .attr("class","left");
        var right = title.append("div")
                         .attr("class","right");
        left.append("div")
            .append("li")
            .attr("class", windows[i].ICON[0] + " fa-" + windows[i].ICON[1])
          
        right.append("a")
          .append("div")
          .append("li")
          .attr("class","fas fa-times");

        right.append("a")
          .append("div")
          .append("li")
          .attr("class","far fa-square");

        right.append("a")
          .append("div")
          .append("li")
          .attr("class","fas fa-window-minimize");           

        window.on("mouseover",mouseover);
        window.on("dragstart",dragStart);
        window.on("dragend",dragEnd);



    }

    function mouseover(e) {
        d3.select(this).style
    }

    function dragStart(e) {
        d3.select(this).style("opacity","0.4");
        d3.select(this).style("z-index",100);
    }

    function dragEnd(e) {
        d3.select(this).style("opacity","1");
    }

    /*
    d3.selectAll(".window").call(d3.drag.on("start", dragStarted));
    d3.selectAll(".window").call(d3.drag.on("drag", dragged));
    d3.selectAll(".window").call(d3.drag.on("end", dragEnded));

    function dragStarted(){
        originZ = d3.select(this).attr("z-index");
        originTop = d3.select(this).attr("top");
        originLeft = d3.select(this).attr("left");
        d3.select(this).style("z-index","1");
    }

    function dragged(){

    }

    function dragEnded(){
        d3.select(this).attr("z-index",originZ);
        d3.select(this).attr("top",originTop);
        d3.select(this).attr("left",originLeft);
    }
    */
}

function displayFooter(){

    var order = {
        LEFT:0,
        RIGHT:1,
    };

    var position = ["left","right"];

    var icons = [
        [order.LEFT,"fab","windows"],
        [order.LEFT,"fas","search"],
        [order.LEFT,"fas","layer-group"],
        [order.LEFT,"fas","folder"],
        [order.LEFT,"fab","chrome"],
        [order.LEFT,"fas","file-word"],
        [order.LEFT,"fas","file-pdf"],        
        [order.LEFT,"fas","file-excel"],
        [order.LEFT,"fab","telegram"],
        [order.LEFT,"fab","whatsapp"],
        [order.LEFT,"fas","file-code"],
        [order.LEFT,"fab","spotify"],
        [order.LEFT,"fab","slack"],
        [order.LEFT,"fab","github"],
        [order.RIGHT,"fas","comment-alt"],
        [order.RIGHT,"fas","calendar-alt"],
        [order.RIGHT,"fas","language"],
        [order.RIGHT,"fas","volume-up"],
        [order.RIGHT,"fas","wifi"],
        [order.RIGHT,"fab","dropbox"],
        [order.RIGHT,"fas","chevron-up"],
    ];

    for(var i = 0; i < position.length; i++){
        var area = d3.select("footer > ." + position[i]);
        for(var j = 0; j < icons.length; j++) {
            if(i === icons[j][0]){
                area.append("a")
                .append("div")
                .attr("class","container")
                .attr("id",icons[j][2])
                .append("li")
                .attr("class", icons[j][1] + " fa-" + icons[j][2] + " item");                
            };                 
        };
    };

}

//min,max both included
var getRandomInt = function(min,max){
    return Math.floor(Math.random() * ((max+1) - min) ) + min;
}