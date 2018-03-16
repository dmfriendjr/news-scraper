$('.btn-link').on('click', event => {
   $(`#comments${$(event.target).data('index')}`).hide(); 
});

$('.comment-button').on('click', event => {
  $(`#comments${$(event.target).data('index')}`).slideToggle("fast");
});

$('.delete-comment-btn').on('click', event => {
  $.ajax({
    url: '/comments/' +  $(event.target).data('comment'),
    method: 'DELETE',
  }).catch(err => {
    console.log(err);
  });
  $(event.target).closest('.list-group-item').remove();
});