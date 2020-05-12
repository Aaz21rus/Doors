var openAsideMenu = function(targetLi,item) {
  item.addEventListener('click', function(e){
    e.currentTarget.parentElement.classList.toggle('active')
    document.querySelectorAll(targetLi + '> li')
      .forEach(function(li) {
          if (li === e.currentTarget.parentElement) return
          li.classList.remove('active')

        }
      )
      console.log(targetLi + '> li')
  })
};

var btnLevel1 = document.querySelectorAll('.doors-name')
btnLevel1.forEach(openAsideMenu.bind(this, '.doors'))

var btnLevel2 = document.querySelectorAll('.door-material')
btnLevel2.forEach(openAsideMenu.bind(this, '.door-mat-list'))

// var btnParameters = document.querySelectorAll('.doors-name')
// btnLevel1.forEach(openAsideMenu.bind(this, '.doors-sort'))

var darkContainer = document.querySelector('.dark-container')
var btnOrderPhone = document.querySelector('.btn')
var phoneBtn = document.querySelector('phone-btn')

function noScroll() {
  window.scrollTo(0, 0);
}

btnOrderPhone.addEventListener('click', function(){
  darkContainer.classList.add('show')
  // window.addEventListener('scroll', noScroll)
})
// window.addEventListener('mousewheel', function(e) {
//   e.preventDefault();
// })

darkContainer.addEventListener('click', function(e){
  if (e.target === e.currentTarget) {
    darkContainer.classList.remove('show')
  }
})

// phoneBtn.addEventListener('click', function(){
//   darkContainer.classList.remove('show')
// })

