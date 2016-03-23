import {containerFactory as factory} from '../helper'
import Container from '../../src/domain/container'
import {expect} from 'chai'

describe('ContainerFactory', () => {

  describe('createFromDslObject', () => {

    it('creates a container from dsl object', () => {

      const container = factory.createFromDslObject({name: 'test', image: 'ubuntu', ports: ['9100:9100']})

      expect(container).to.be.instanceof(Container)

    })

    it('throws when the ports are invalid', () => {

      expect(() => {

        factory.createFromDslObject({name: 'test', ports: 9100})

      }).to.throw(Error)

    })

    it('returns ports wrapped by array when a string is given', () => {

      const container = factory.createFromDslObject({name: 'test', image: 'ubuntu', ports: '9100:9100'})

      expect(container.ports).to.eql(['9100:9100'])

    })

  })

})
