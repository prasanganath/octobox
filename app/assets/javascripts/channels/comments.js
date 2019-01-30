var subscribeToComments = function(){

  if (App.comments){
    App.comments.unsubscribe();
  }
  App.comments = App.cable.subscriptions.create({
    channel: "CommentsChannel",
    notification: $(location).attr('href').split('/').pop()},{
    received: function(data){
      if ($('#notification-thread').attr('data-id') == data.subject_id && !$("#comment-"+data.comment_id).length){
        $('.discussion-thread').append(data.comment_html);
      }
    }
  });
}

if ($("meta[name='push_notifications']").length >0) {

  $(document).on('click', '.thread-link', function(){ subscribeToComments() });
  
  $(document).on("turbolinks:load", function(){
    if($('#thread').is(':visible')){
      subscribeToComments();
    }
  });
}
