import {dockerode, Promise} from '../util'
import Container from './container'

export default class ContainerRepository {

  /**
   * Saves the container.
   *
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


    return {
      Image: container.image,
      Cmd: typeof container.cmd === 'string' ? container.cmd.split(/\s+/) : null,
      name: container.name
    }

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
   * Converts the api data to an container model.
   *
   * @private
   * @param {object} data The object which is returned from Docker Remote API
   * @return {Container}
   */
  static apiDataToContainer(data) {

    return new Container(data.Id, data.Name, data.Image, data.Config.Cmd.join(' '), data.State.Running)

  }

}
