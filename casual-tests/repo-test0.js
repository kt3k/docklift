import repo from './repo'

repo.getById('chrome-test-49729').then(container => {

  console.log(container)

}).catch(err => console.log(err))
