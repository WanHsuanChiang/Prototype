var unitWidth = "px";
var unitPos = "em";


function createScene(){

    var windows = [
        {ID:"chrome-duplicate",
            ICON:["fab","chrome"],
            POSITION:{TOP:5,LEFT:38,Z:1},
            WIDTH:700,
            SIDE:{POSITION:"right",OPTION:["type","content","time"]},
        },
        {ID:"chrome",
            ICON:["fab","chrome"],
            POSITION:{TOP:1,LEFT:1,Z:1},
            WIDTH:900,
            SIDE:{POSITION:"left",OPTION:["type","content","time"]},
        },
        {ID:"pdf",
            ICON:["fas","file-pdf"],
            POSITION:{TOP:25,LEFT:5,Z:2},
            WIDTH:500,
            SIDE:{POSITION:"left",OPTION:["type","content","time"]},
        },
        {ID:"excel",
            ICON:["fas","file-excel"],
            POSITION:{TOP:16,LEFT:20,Z:2},
            WIDTH:600,
            SIDE:{POSITION:"left",OPTION:["type","time"]},
        },
        {ID:"word",
            ICON:["fas","file-word"],
            POSITION:{TOP:28,LEFT:50,Z:1},
            WIDTH:450,
            SIDE:{POSITION:"right",OPTION:["type","content","time"]},
        },
        {ID:"slack",
            ICON:["fab","slack"],
            POSITION:{TOP:10,LEFT:35,Z:3},            
            WIDTH:700,
            SIDE:{POSITION:"right",OPTION:["type","time"]},
        },
    ];

    var option = {
        "keyword": ["fas","font"],
        "type": ["fas","file-alt"],
        "content": ["fas","paragraph"],
        "time": ["fas","clock"],
    }    

    for(var i = 0; i < windows.length; i++){        
        
        var container = d3.select("section").append("div").attr("class","window-container").attr("id",windows[i].ID)
                        .style("top", windows[i].POSITION.TOP + unitPos)
                        .style("left", windows[i].POSITION.LEFT + unitPos)
                        .style("z-index",windows[i].POSITION.Z)
                        .attr("position",windows[i].SIDE.POSITION);
        // inside window                               
        var window = container.append("div").attr("class","window")
                    .style("width", windows[i].WIDTH + unitWidth)
                    .style("height", windows[i].WIDTH * (9/16) + unitWidth)
                    .attr("draggable", true);                            
        var title = window.append("div").attr("class","title");
        window.append("div").attr("class","status");
        window.append("div").attr("class","content");

        var left = title.append("div").attr("class","left");        
        left.append("div").append("li").attr("class", windows[i].ICON[0] + " fa-" + windows[i].ICON[1] + " icon");

        var right = title.append("div").attr("class","right");
        right.append("a").append("div").append("li").attr("class","fas fa-times");
        right.append("a").append("div").append("li").attr("class","far fa-square");
        right.append("a").append("div").append("li").attr("class","fas fa-window-minimize");  
        
        //window side
        var side = container.append("div").attr("class","side").style("display","none");
        for(var j = 0; j < windows[i].SIDE.OPTION.length; j++) {
            let key = windows[i].SIDE.OPTION[j];
            side.append("a").append("div").attr("class","option").attr("title",key)
                .append("li")
                .attr("class",option[key][0] + " fa-" + option[key][1]);
        };
                     
        window.on("mouseover",mouseOver);
        window.on("mouseout",mouseOut);
        side.on("mouseover", mouseOver);

        window.on("dragstart",dragStart);
        window.on("dragend",dragEnd);
        window.on("drag",dragging);
    }

    displayTab("chrome",16);
    d3.select("#chrome-duplicate").style("display","none");

    var targetObj; //window or side, for hover
    var draggedObj; //d3.select(this) window
    var isDragging = false;
    var isHovering = false;
    var originTop;
    var originLeft;
    var originZ;
    
    function dragStart(e) {
        isDragging = true;
        draggedObj = d3.select(this);
        var thumbHeight = 60;
        var thumbWidth = thumbHeight*(16/9);
        originTop = d3.select(this.parentNode).style("top");
        originLeft = d3.select(this.parentNode).style("left");
        d3.select(this).style("opacity","0.4");
        //d3.select(this).style("height",  thumbHeight + unitWidth);
        //d3.select(this).style("width", +thumbWidth + unitWidth);
        d3.select(this.parentNode).select(".side").style("display","none");
    }

    /*
    Case 2: 
    1. After Case 1
    2. Drag excel
    3. move pdf
    4. drag to scanner
    */    
    function dragging(e) {
        if(isDragging){
            d3.select("#pdf").style("top", 20 + unitPos);
            d3.select("#pdf").style("left", 50 + unitPos);
            d3.select("#excel").style("top", 25 + unitPos);
            d3.select("#excel").style("left", 60 + unitPos);         
        }
    }

    function dragEnd(e) {
        isDragging = false;
        d3.select(this).style("opacity","1");
        d3.select("#pdf").style("top",2 + unitPos);
        d3.select("#pdf").style("left",5 + unitPos);
        d3.select("#excel").style("top", 15 + unitPos);
        d3.select("#excel").style("left", 40 + unitPos);

        let lists = [
            "keyword",
            "type",
            "time",
        ]
        displayScanner(lists);
    }

    function mouseOver(e) {

        if(isDragging === false){
            targetObj = d3.select(this).attr("class");
        
            if(targetObj == "window" && isHovering === false && d3.select(this.parentNode).select(".side").style("display")=="none" ){
                // if mouse over window
                isHovering = true;                
                sleep(500).then(()=>{
                    d3.select(this.parentNode).select(".side").style("display","flex");
                });                                                                       
            };
        }
    }

    function mouseOut(e) {
        if(isDragging === false){
            isHovering = false;
            sleep(1000).then(() => {
                if(targetObj == "window"){
                    d3.select(this.parentNode).select(".side").style("display","none");
                } else if (targetObj == "side"){
                    d3.select(this.parentNode).select(".side").on("mouseout",function(){
                        d3.select(this).style("display","none");
                    })
                }
            });
        }
    }

    function displayScanner(arr){
        d3.selectAll("section > ul").remove();
        d3.select("section").append("ul");
        for(var i =0; i<arr.length; i++){
            var optionArr = option[arr[i]];
            d3.select("section > ul").append("li").attr("title",arr[i]).append("a").attr("href","#").attr("class",arr[i])
            .append("i")
            .attr("class", optionArr[0] + " fa-" + optionArr[1] + " my-float");
        }

        d3.select(".time").append("div").attr("class" , "slidecontainer submenu")
            .on("click",secondaryFilter)       
            .append("input")
            .attr("type","range")
            .attr("min",1)
            .attr("max",100)
            .attr("value",50)
            .attr("top", 20 + unitPos)
            .attr("left", 40 + unitPos);            
        /*
        d3.select(".keyword").append("div").attr("class","placeholder submenu")
            .append("form")
            .append("input")
            .attr("placeholder","Keyword Search");
        */
    }
}

function displayTab(id,n){
    var tabGroup = d3.select("#" + id +" .left").append("div").attr("class","tab-group");
    for(var i = 0; i < n ; i++) {
        tabGroup.append("div").attr("class","tab");
    }    
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

function loadFunction(){

    filterType();
    d3.select("form").on("submit",submit);

}
/*
var dragHandler = d3.drag()
    .on("start", function(){
        d3.select(this).style("transform","scale(0.1)");
    })
*/



/*
case: filter by type
1. hover on pdf
2. click on type
3. pdf and excel will pop out
*/
//TODO detect which window should do what
function filterType() {
    d3.selectAll("[title='type']").on("click", function(){
        var pdf =  d3.select("#pdf");
        var excel = d3.select("#excel");
        pdf.style("z-index",100);
        pdf.style("top",2 + unitPos);
        pdf.style("left",5 + unitPos);
        excel.style("z-index",100);
        excel.style("top",15 + unitPos);
        excel.style("left",40 + unitPos);

        d3.selectAll(".side").style("display","none");
    });
}

/*
Case: Keyword Search
 */
function submit() {
    let width = 900*(2/3);
    let height = getHeight(width);
    d3.select("#chrome").style("z-index",101);
    d3.select("#pdf").style("z-index",101); 

    d3.select("#chrome .window")
        .style("width",width + unitWidth)
        .style("height",height + unitWidth);

    d3.select("#pdf").style("left", 40 + unitPos);

    d3.select("#chrome .tab-group").remove();
    displayTab("chrome",6);

    d3.select("#chrome-duplicate").style("display","flex");
    displayTab("chrome-duplicate",10);
}

//case: secondaryFilter
function secondaryFilter(){
    var slackW = 600;
    d3.select("#slack")
        .style("top",20 + unitPos)
        .style("left",2 + unitPos)
    d3.select("#slack .window")
        .style("width",slackW + unitWidth)
        .style("height",getHeight(slackW) + unitWidth)
        .style("z-index",100);
    d3.select("#excel")
        .style("top",5 + unitPos)
}

//min,max both included
var getRandomInt = function(min,max){
    return Math.floor(Math.random() * ((max+1) - min) ) + min;
}

//https://stackoverflow.com/questions/951021/what-is-the-javascript-version-of-sleep
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function getHeight(w) {
    return w*(9/16);
}