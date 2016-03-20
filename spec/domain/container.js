import {containerFactory as factory, containerRepository as repo, dice} from '../helper'
import Container from '../../src/domain/container'

import {expect} from 'chai'

describe('Container', () => {

  describe('start', () => {

    it('starts the container', () => {

      const name = `foo${dice()}`

      const container = new Container({name: name, image: 'siomiz/chrome'})

      return repo.save(container).then(container => {

        return container.start().then(() => expect(container.isRunning).to.be.true)

      })

    })

  })

  describe('stop', () => {

    it('stops the container', () => {

      const name = `foo${dice()}`

      const container = new Container({name: name, image: 'siomiz/chrome'})

      return repo.save(container)

        .then(() => container.start())
        .then(() => expect(container.isRunning).to.be.true)
        .then(() => container.stop())
        .then(() => expect(container.isRunning).to.be.false)

    })

  })

})
