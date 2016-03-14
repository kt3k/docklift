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

      // does nothing because this container already has an id, which means it already exists in docker host.
      return Promise.resolve(container)

    }

    return new Promise(resolve => {

      dockerode.createContainer(this.containerToCreateOptions(container), (err, ctr) => {

        if (err) { reject(err) }

        resolve(ctr)

      })

    }).then(ctr => this.getById(ctr.id))

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
   *
   * @param {string} id The id of the container
   * @return {Promise<Container>}
   */
  getById(id) {

    return new Promise((resolve, reject) => {

      dockerode.getContainer(id).inspect((err, data) => {

        if (err) {

          if (err.statusCode === 404) {

            resolve(null)

          } else {

            reject(err)

          }

          return
        }

        resolve(ContainerRepository.apiDataToContainer(data))

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

    const container = new Container(data.Id, data.Name, data.Image, data.State.Running)

    return container

  }

}
