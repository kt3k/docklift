import {containerRepository as repo, dice, skipOnCI} from '../helper'
import Container from '../../src/domain/container'
import {expect} from 'chai'

describe('ContainerRepository', () => {

  describe('remove', () => {

    skipOnCI(it)('removes the container', () => {

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

  describe('save', () => {

    it('saves the container with port forwarding options', () => {

      const name = `foo${dice()}`

      const container = new Container({name: name, image: 'ubuntu', cmd: 'vi', ports: ['9100:9100']})

      return repo.save(container)

      .then(() => repo.getById(name))

      .then(container => expect(container.ports).to.eql(['9100:9100']))

    })

  })

})
