import {containerRepository as repo, containerFactory as factory, dice} from '../helper'
import Container from '../../src/domain/container'
import {expect} from 'chai'

describe('ContainerRepository', () => {

  describe('remove', () => {

    it.skipOnCI('removes the container', () => {

      const name = `test${dice()}`
      const container = new Container({name: name, image: 'siomiz/chrome'})

      return repo.save(container)

      .then(() => expect(container.hasId()).to.be.true)

      .then(() => repo.remove(container))

      .then(() => {

        expect(container.hasId()).to.be.false
        expect(container.isRunning).to.be.false
        expect(container.isRemoved).to.be.true

      })

    })

  })

})
