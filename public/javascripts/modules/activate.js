const activator = document.querySelectorAll('.activate');

for(let activate of activator){ 
    activate.addEventListener('change', function() {
        activatePost(activate);
    });
};

function activatePost(element){
    console.log(element);
  if(element.checked){ 
      $.ajax({
        type: "POST",
        url: 'http://localhost:7777/post/activate/' + element.id,
        success: function (data) {
            console.log('post activated')
        }
      });
  }else{ 
    $.ajax({
        type: "POST",
        url: 'http://localhost:7777/post/deactivate/' + element.id,
        success: function (data) {
            console.log('post deactivated')
        }
      });
  }
}