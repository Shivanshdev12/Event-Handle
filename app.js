//EVENT CONTROLLER
var eventController=(function()
{

var Event=function(id,description)
{
this.id=id;
this.description=description;
}
var data={

    allItems:{
        des:[]
    }
}
return{
    addItem:function(des)
    {
        var newItem,ID;
        if(data.allItems.des.length>0)
        {
            ID=data.allItems.des[data.allItems.des.length-1].id+1;
        }
        else{
            ID=0;
        }
        newItem=new Event(ID,des);
        data.allItems.des.push(newItem);
        return newItem;
    },
    deleteItem:function(id)
    {
        var ids=data.allItems.des.map(function(current)
        {
            return current.id;
        });
        index=ids.indexOf(id);
        if(index  !== -1)
        {
            data.allItems.des.splice(index,1);
        }
    },
    testing:function()
    {
        console.log(data);
    }
}
})();


//UICONTROLLER
var UIController=(function(){

    var DOMStrings=
    {
        inputDescription:'.add__description',
        inputbtn:'.add__btn',
        eventList:'.event__list',
        start:'.start'
    };

return {
    getInput:function()
    {
        return{
            description:document.querySelector(DOMStrings.inputDescription).value
        }
    },
    getDOMStrings:function()
    {
        return DOMStrings;
    },
    addListItems:function(Obj)
    {
        var html,newHtml;
        var element=DOMStrings.eventList;
        html=' <div class="item clearfix" id="event-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
        newHtml=html.replace('%id%',Obj.id);
        newHtml=newHtml.replace('%description%',Obj.description);

        document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
    },
    deleteListItems:function(selectorID)
    {
        var el=document.getElementById(selectorID);
        el.parentNode.removeChild(el);
    },
    clearField:function()
    {

        var field=document.querySelectorAll(DOMStrings.inputDescription);
        var fieldsarr=Array.prototype.slice.call(field);
        
        fieldsarr.forEach(function(current,index,array){
            current.value="";
            fieldsarr[0].focus();
        });
    }, 
};
})();



//GLOBAL CONTROLLER
var controller=(function(eventCtrl,UICtrl)
{

   var setupEventListeners=function()
   {
    var DOM=UICtrl.getDOMStrings();
    document.querySelector(DOM.inputbtn).addEventListener('click',ctrlAddItem);
    document.addEventListener('keypress', function (event) {
        if (event.keyCode === 13 || event.which === 13) {
            ctrlAddItem();
        }
    });
    document.querySelector(DOM.start).addEventListener('click',ctrlDeleteItem);
   }
var ctrlAddItem=function()
{
    var input,newItem;
     input=UICtrl.getInput();
     if(input.description!=="")
     {
     newItem = eventCtrl.addItem(input.description);
     UICtrl.addListItems(newItem);
     UICtrl.clearField();
     console.log(input);
     }
}
var ctrlDeleteItem=function()
{
    var itemID,splitID,ID;
    itemID=event.target.parentNode.parentNode.parentNode.parentNode.id;
    if(itemID)
    {
        splitID=itemID.split('-');
        ID=parseInt(splitID[1]);

        eventCtrl.deleteItem(ID);
        UICtrl.deleteListItems(itemID);///
    }
}
return {
    init: function () {
        console.log('app Has started');
        setupEventListeners();
    }
};
})(eventController,UIController);

controller.init();
