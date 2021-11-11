Vue.component ('table-row', {
    template: ''
})
var app = new Vue({
    el: '#app',
    data: {
      message: 'Ready for Operation!'
    },
    methods: {
      startCalc: function () {
        let routeData= document.getElementById("routeInput");
        main(routeData);
        this.message = "Operation complete, waiting for another Input!"
      },
      useExample: function(){
        fillInputWExample();
        let routeData= document.getElementById("routeInput");
        tableApp.dataset.push(main(routeData));
        console.log(tableApp.dataset)
        this.message = "Results of Example Data are presented. Waiting for new Input!"
        tableApp.seen=true;
      },
      clearAll: function(){
        clearInputField();
      }
      
    }
  })
  var tableApp=new Vue({
    el: "#tableApp",
    data: {
        seen:false,
        dataset: []
    } 
  })