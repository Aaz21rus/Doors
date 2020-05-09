var openAsideMenu = function(targetLi,item) {
  item.addEventListener('click', function(e){
    e.currentTarget.parentElement.classList.toggle('active')
    document.querySelectorAll(targetLi + '> li')
      .forEach(function(li) {
          if (li === e.currentTarget.parentElement) return
          li.classList.remove('active')
        }
      )
  })
};

var btnLevel1 = document.querySelectorAll('.doors-name')
btnLevel1.forEach(openAsideMenu.bind(this, '.doors'))

var btnLevel2 = document.querySelectorAll('.door-material')
btnLevel2.forEach(openAsideMenu.bind(this, '.door-mat-list'))


