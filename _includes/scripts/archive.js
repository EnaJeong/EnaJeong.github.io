var focusedBtn = {
  lastFocusedBtn : document.querySelector(".category-button[data-category=all]"),
  update : function(btn){
    if (focusedBtn.lastFocusedBtn != btn){
      focusedBtn.lastFocusedBtn.className = "category-button";
    }

    btn.className = "category-button focused";
    focusedBtn.lastFocusedBtn = btn;
  }
};

var changeGroupState = function(){
  let groups = document.querySelectorAll(".archive-group");
  groups.forEach(function(group){
    let groupId = "archive-" + group.getAttribute('data-group');
    let groupName = document.getElementById(groupId);

    let posts = group.querySelectorAll(".archive-post:not(.not-included)");
    if (posts.length == 0) {
      groupName.className = "archive-group-name not-included";
    } else {
      groupName.className = "archive-group-name";
    }
  })
}

var showAllPosts = function(){
  focusedBtn.update(document.querySelector(".category-button[data-category=all]"));

  let posts = document.querySelectorAll(".archive-post");
  posts.forEach(function(post){
    post.className = "archive-post";
  })

  changeGroupState();
}

var changePostState = function(category) {
  focusedBtn.update(document.querySelector(".category-button[data-category=" + category + "]"));

  let posts = document.querySelectorAll(".archive-post");
  posts.forEach(function(post){
    if (post.getAttribute('data-category') != category){
      post.className = "archive-post not-included"
    } else {
      post.className = "archive-post";
    }
  })

  changeGroupState();
}