import {containerRepository as repo} from '../spec/helper'

const id = 'a008c3237913'

repo.getById(id).then(container => {

  console.log(container)

  return container.stop().then(() => {

    console.log(container)

  })

}).catch(err => console.log(err.stack))
