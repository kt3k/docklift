import {
  containerRepository as repo
} from '../spec/helper'
import Container from '../src/domain/container'

const id = 'a008c3237913'

const cntr = new Container({
  name: 'test-create',
  image: 'ubuntu',
  cmd: 'vi'
})

repo.save(cntr).then(container => {

  console.log(container)

  return container.start().then(() => {

    console.log(container)

  })

}).catch(err => console.log(err.stack))
