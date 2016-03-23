import {task, start, isEmpty} from '../src'
import ContainerRepository from '../src/domain/container-repository'
import ContainerFactory from '../src/domain/container-factory'
import Container from '../src/domain/container'
import './helper'

import {expect} from 'chai'

describe('isEmpty', () => {

  it('returns true if the tasks are empty', () => {

    expect(isEmpty()).to.be.true

  })

  it('returns false if the tasks are not empty', () => {

    task('test')

    expect(isEmpty()).to.be.false

  })

})

describe('task(taksName).create(params).do(action)', () => {

  it('creates the container with the given params and perform the action on it', (done) => {

    task('foo')
    .create({name: 'foo0', image: 'ubuntu', cmd: 'vi', ports: '9100:9100'})
    .do(container => container.start())

    start(['foo'], (err) => {

      if (err) {

        console.log(err)

        done(err)

        return

      }

      new ContainerRepository().getByName('foo0')

      .then(container => {

        expect(container).to.be.instanceof(Container)
        expect(container.name).to.equal('/foo0')
        expect(container.image).to.equal('ubuntu')
        expect(container.cmd).to.equal('vi')
        expect(container.ports).to.eql(['9100:9100'])
        expect(container.isRunning).to.be.true

        container.remove()

      })

      .then(() => done()).catch(done)

    })

  })

})

describe('task(taksName).get(name).do(action)', () => {

  it('gets the container of the name and performs the action on it', (done) => {

    task('remove')
    .get('foo1')
    .do(container => container.remove())

    const container = new ContainerFactory().createFromDslObject({
      name: 'foo1',
      image: 'ubuntu',
      cmd: 'vi'
    })

    new ContainerRepository().save(container)

    .then(() => container.start())

    .then(() => new Promise(resolve => start(['remove'], (err) => {

      if (err) {

        throw err

      }

      resolve(new ContainerRepository().getByName('foo1'))

    }))).then(container => {

      expect(container).to.be.null

    }).then(() => done(), done)

  })

  it('throws when the container not found', (done) => {

    task('not-found')
    .get('not-found')
    .do(container => container.anything())

    start(['not-found'], (err) => {

      try {

        expect(err).to.be.instanceof(Error)
        expect(err.message).to.equal('Cannot get container of the name: not-found')

        done()

      } catch (e) {

        reject(e)

      }

    })

  })

  it('does not throws if the quiet flag is true, and the action is skipped', (done) => {

    task('not-found')
    .get('not-found', {quiet: true})
    .do(container => container.anything())

    start(['not-found'], err => {

      try {

        expect(err).to.equal(null)

        done()

      } catch (e) {

        done(e)

      }

    })

  })

})
