import repo from './repo'

repo.getById('aadd6').then(container => {

  console.log(container)

}).catch(err => console.log(err))
