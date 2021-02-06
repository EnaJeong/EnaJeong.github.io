const Archive = {
  lastFocusedBtn : document.querySelector(".category-button[data-category=all]"),

  changeState(category) {
    let btn = document.querySelector(`.category-button[data-category='${category}']`);

    if (Archive.lastFocusedBtn == btn){
      return;
    }

    Archive.lastFocusedBtn.className = "category-button";
    btn.className = "category-button focused";
    Archive.lastFocusedBtn = btn;

    switch (category) {
      case 'all': {
        Archive.viewAll();
        break;
      }
      default: {
        Archive.viewSome(category);
      }
    }
  },

  viewAll(){
    let doc = document;

    let posts = doc.querySelectorAll(".archive-post.not-included");
    for (let i=0, n=posts.length; i < n; i++){
      posts[i].className = "archive-post";
    }

    let groupNames = doc.querySelectorAll(".archive-group-name.not-included");
    for (let i=0, n=groupNames.length; i < n; i++){
      groupNames[i].className = "archive-group-name";
    }
  },

  viewSome(category){
    let doc = document;

    let posts = doc.querySelectorAll(".archive-post");
    for (let i=0, n=posts.length; i < n; i++){
      if (posts[i].getAttribute('data-category') != category){
        posts[i].className = "archive-post not-included";
      } else {
        posts[i].className = "archive-post";
      }
    }

    let groups = doc.querySelectorAll(".archive-group");
    for (let i=0, n=groups.length; i < n; i++){
      let groupId = "archive-" + groups[i].getAttribute('data-group');
      let groupName = doc.getElementById(groupId);

      let posts = groups[i].querySelectorAll(".archive-post:not(.not-included)");
      if (posts.length == 0) {
        groupName.className = "archive-group-name not-included";
      } else {
        groupName.className = "archive-group-name";
      }
    }
  }
};

(function(){
  let hash = window.location.hash.substr(1);
  if (hash != ""){
    let btn = document.querySelector(`.category-button[data-category='${hash}']`);
    if (btn) {
      Archive.changeState(hash);
    }
  }
})();
