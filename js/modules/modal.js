const darkContainer = document.querySelector('.dark-container')
const btnOrderPhone = document.querySelector('.head .btn-phone')

btnOrderPhone.addEventListener('click', _=> {
  darkContainer.classList.add('show')
  document.body.style.overflow = 'hidden'
})

darkContainer.addEventListener('click',(e)=> {
  const checks = {
    darkContainer: e.target.classList.contains('dark-container'),
    close: e.target.classList.contains('close')
  }

  if (checks.darkContainer || checks.close) {
    darkContainer.classList.remove('show')
    document.body.style.overflow = 'initial'
  }
})
