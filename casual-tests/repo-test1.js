import repo from './repo'
import factory from './factory'

const random = Math.floor(Math.random() * 65536)

const container = factory.createFromObject({
  name: 'chrome-test-' + random,
  image: 'siomiz/chrome'
})

repo.save(container).then(container => {

  console.log(container)

}).catch(err => console.log(err))
