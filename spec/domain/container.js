import {containerFactory, containerRepository, dice} from '../helper'

import {expect} from 'chai'

describe('Container', () => {

  describe('start', () => {

    it('starts the container', () => {

      const container = containerFactory.createFromObject({name: 'test-' + dice(65536), image: 'siomiz/chrome'})

      return containerRepository.save(container).then(container => {

        return container.start().then(() => expect(container.isRunning).to.be.true)

      })

    })

  })

})
