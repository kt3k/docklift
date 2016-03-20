import {dockerode, Promise} from '../util'
import Container from './container'

export default class ContainerRepository {

  /**
   * Saves the container.
   * @param {Container} container The container
   * @return {Promise<Container>}
   */
  save(container) {

    if (container.hasId()) {

      // Does nothing and just updates the container
      return container.update()

    }

    return new Promise((resolve, reject) => dockerode.createContainer(this.containerToCreateOptions(container), (err, ctr) => {

      if (err) {

        return reject(err)

      }

      container.id = ctr.id

      return resolve(container.update())

    }))

  }

  /**
   * Creates the create options for a new container from the given container.
   * @private
   * @param {Container} container The container
   */
  containerToCreateOptions(container) {

    const options = {
      Image: container.image,
      Cmd: typeof container.cmd === 'string' ? container.cmd.split(/\s+/) : null,
      name: container.name
    }

    return options

  }

  /**
   * Gets the container by its id. Returns null promise if the container does not exist.
   * @param {string} id The id of the container
   * @return {Promise<Container>}
   */
  getById(id) {

    return new Promise((resolve, reject) => {

      dockerode.getContainer(id).inspect((err, data) => {

        if (!err) {

          return resolve(ContainerRepository.apiDataToContainer(data))

        }

        if (err.statusCode === 404) {

          return resolve(null)

        }

        return reject(err)

      })

    })

  }

  /**
   * Gets a container by the given name.
   * @param {string} name The name of the container
   * @return {Promise<Container>}
   */
  getByName(name) {

    return this.getById(name)

  }

  /**
   * Removes the container.
   * @param {Container} container The container
   * @return
   */
  remove(container) {

    return new Promise((resolve, reject) => {

      dockerode.getContainer(container.id).remove({force: true}, (err, data) => err ? reject(err) : resolve())

    }).then(() => container.setRemoved())

  }

  /**
   * Converts the api data to an container model.
   * @private
   * @param {object} data The object which is returned from Docker Remote API
   * @return {Container}
   */
  static apiDataToContainer(data) {

    return new Container({
      id: data.Id,
      name: data.Name,
      image: data.Image,
      cmd: data.Config.Cmd.join(' '),
      isRunning: data.State.Running
    })

  }

}
